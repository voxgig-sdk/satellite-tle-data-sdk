package = "voxgig-sdk-satellite-tle-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/satellite-tle-data-sdk.git"
}
description = {
  summary = "SatelliteTleData SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["satellite-tle-data_sdk"] = "satellite-tle-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
