# SatelliteTleData SDK utility: feature_add
module SatelliteTleDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
