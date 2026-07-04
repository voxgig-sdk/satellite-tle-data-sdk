# Tle entity test

require "minitest/autorun"
require "json"
require_relative "../SatelliteTleData_sdk"
require_relative "runner"

class TleEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SatelliteTleDataSDK.test(nil, nil)
    ent = testsdk.Tle(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = tle_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "tle." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SATELLITETLEDATA_TEST_TLE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    tle_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.tle")))
    tle_ref01_data = nil
    if tle_ref01_data_raw.length > 0
      tle_ref01_data = Helpers.to_map(tle_ref01_data_raw[0][1])
    end

    # LIST
    tle_ref01_ent = client.Tle(nil)
    tle_ref01_match = {}

    tle_ref01_list_result = tle_ref01_ent.list(tle_ref01_match, nil)
    assert tle_ref01_list_result.is_a?(Array)

    # LOAD
    tle_ref01_match_dt0 = {
      "id" => tle_ref01_data["id"],
    }
    tle_ref01_data_dt0_loaded = tle_ref01_ent.load(tle_ref01_match_dt0, nil)
    tle_ref01_data_dt0_load_result = Helpers.to_map(tle_ref01_data_dt0_loaded)
    assert !tle_ref01_data_dt0_load_result.nil?
    assert_equal tle_ref01_data_dt0_load_result["id"], tle_ref01_data["id"]

  end
end

def tle_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "tle", "TleTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SatelliteTleDataSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["tle01", "tle02", "tle03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["SATELLITETLEDATA_TEST_TLE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SATELLITETLEDATA_TEST_TLE_ENTID" => idmap,
    "SATELLITETLEDATA_TEST_LIVE" => "FALSE",
    "SATELLITETLEDATA_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["SATELLITETLEDATA_TEST_TLE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["SATELLITETLEDATA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = SatelliteTleDataSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["SATELLITETLEDATA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["SATELLITETLEDATA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
