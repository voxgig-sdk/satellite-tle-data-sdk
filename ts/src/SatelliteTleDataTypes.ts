// Typed models for the SatelliteTleData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Tle {
  date: string
  id?: string
  line1: string
  line2: string
  name: string
  satellite_id: number
  type?: string
}

export interface TleLoadMatch {
  id: number
}

export interface TleListMatch {
  date?: string
  id?: string
  line1?: string
  line2?: string
  name?: string
  satellite_id?: number
  type?: string
}

