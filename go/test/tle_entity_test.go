package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/satellite-tle-data-sdk/go"
	"github.com/voxgig-sdk/satellite-tle-data-sdk/go/core"

	vs "github.com/voxgig-sdk/satellite-tle-data-sdk/go/utility/struct"
)

func TestTleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Tle(nil)
		if ent == nil {
			t.Fatal("expected non-nil TleEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := tleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "tle." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set SATELLITETLEDATA_TEST_TLE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		tleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.tle", setup.data)))
		var tleRef01Data map[string]any
		if len(tleRef01DataRaw) > 0 {
			tleRef01Data = core.ToMapAny(tleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = tleRef01Data

		// LIST
		tleRef01Ent := client.Tle(nil)
		tleRef01Match := map[string]any{}

		tleRef01ListResult, err := tleRef01Ent.List(tleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, tleRef01ListOk := tleRef01ListResult.([]any)
		if !tleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", tleRef01ListResult)
		}

		// LOAD
		tleRef01MatchDt0 := map[string]any{
			"id": tleRef01Data["id"],
		}
		tleRef01DataDt0Loaded, err := tleRef01Ent.Load(tleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		tleRef01DataDt0LoadResult := core.ToMapAny(tleRef01DataDt0Loaded)
		if tleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if tleRef01DataDt0LoadResult["id"] != tleRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func tleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "tle", "TleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read tle test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse tle test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"tle01", "tle02", "tle03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("SATELLITETLEDATA_TEST_TLE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SATELLITETLEDATA_TEST_TLE_ENTID": idmap,
		"SATELLITETLEDATA_TEST_LIVE":      "FALSE",
		"SATELLITETLEDATA_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SATELLITETLEDATA_TEST_TLE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SATELLITETLEDATA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewSatelliteTleDataSDK(core.ToMapAny(mergedOpts))
	}

	live := env["SATELLITETLEDATA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["SATELLITETLEDATA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
