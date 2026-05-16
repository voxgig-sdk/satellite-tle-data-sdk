# SatelliteTleData SDK utility: make_context
require_relative '../core/context'
module SatelliteTleDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    SatelliteTleDataContext.new(ctxmap, basectx)
  }
end
