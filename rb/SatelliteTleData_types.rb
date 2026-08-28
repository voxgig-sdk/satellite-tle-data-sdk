# frozen_string_literal: true

# Typed models for the SatelliteTleData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Tle entity data model.
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] line1
#   @return [String]
#
# @!attribute [rw] line2
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] satelliteId
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String, nil]
Tle = Struct.new(
  :date,
  :id,
  :line1,
  :line2,
  :name,
  :satelliteId,
  :type,
  keyword_init: true
)

# Request payload for Tle#load.
#
# @!attribute [rw] id
#   @return [Integer]
TleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Tle#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] sort_dir
#   @return [String, nil]
TleListMatch = Struct.new(
  :page,
  :page_size,
  :search,
  :sort,
  :sort_dir,
  keyword_init: true
)

