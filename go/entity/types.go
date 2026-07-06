// Typed models for the SatelliteTleData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Tle is the typed data model for the tle entity.
type Tle struct {
	Date string `json:"date"`
	Id *string `json:"id,omitempty"`
	Line1 string `json:"line1"`
	Line2 string `json:"line2"`
	Name string `json:"name"`
	SatelliteId int `json:"satellite_id"`
	Type *string `json:"type,omitempty"`
}

// TleLoadMatch is the typed request payload for Tle.LoadTyped.
type TleLoadMatch struct {
	Id int `json:"id"`
}

// TleListMatch is the typed request payload for Tle.ListTyped.
type TleListMatch struct {
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Line1 *string `json:"line1,omitempty"`
	Line2 *string `json:"line2,omitempty"`
	Name *string `json:"name,omitempty"`
	SatelliteId *int `json:"satellite_id,omitempty"`
	Type *string `json:"type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
