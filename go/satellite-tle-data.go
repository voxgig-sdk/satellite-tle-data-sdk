package voxgigsatellitetledatasdk

import (
	"github.com/voxgig-sdk/satellite-tle-data-sdk/core"
	"github.com/voxgig-sdk/satellite-tle-data-sdk/entity"
	"github.com/voxgig-sdk/satellite-tle-data-sdk/feature"
	_ "github.com/voxgig-sdk/satellite-tle-data-sdk/utility"
)

// Type aliases preserve external API.
type SatelliteTleDataSDK = core.SatelliteTleDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SatelliteTleDataEntity = core.SatelliteTleDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SatelliteTleDataError = core.SatelliteTleDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTleEntityFunc = func(client *core.SatelliteTleDataSDK, entopts map[string]any) core.SatelliteTleDataEntity {
		return entity.NewTleEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSatelliteTleDataSDK = core.NewSatelliteTleDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
