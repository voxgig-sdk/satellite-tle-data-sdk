package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTleEntityFunc func(client *SatelliteTleDataSDK, entopts map[string]any) SatelliteTleDataEntity

