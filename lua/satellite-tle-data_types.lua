-- Typed models for the SatelliteTleData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Tle
---@field date string
---@field id? string
---@field line1 string
---@field line2 string
---@field name string
---@field satellite_id number
---@field type? string

---@class TleLoadMatch
---@field id number

---@class TleListMatch

local M = {}

return M
