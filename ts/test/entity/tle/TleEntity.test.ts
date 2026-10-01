

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SatelliteTleDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SATELLITE_TLE_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('SATELLITE_TLE_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SatelliteTleDataSDK.test()
    const ent = testsdk.Tle()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SATELLITE_TLE_DATA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tle.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date-time","h":"Date","n":"date","r":true,"sh":"Date and time of the TLE data","t":"`$STRING`","key$":"date","index$":0},"id":{"a":true,"fo":"uri","h":"Id","n":"id","r":false,"sh":"Unique identifier URI for the TLE resource","t":"`$STRING`","key$":"id","index$":1},"line1":{"a":true,"h":"Line1","n":"line1","r":true,"sh":"First line of the Two-Line Element set","t":"`$STRING`","key$":"line1","index$":2},"line2":{"a":true,"h":"Line2","n":"line2","r":true,"sh":"Second line of the Two-Line Element set","t":"`$STRING`","key$":"line2","index$":3},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Name of the satellite","t":"`$STRING`","key$":"name","index$":4},"satelliteId":{"a":true,"h":"Satellite Id","n":"satelliteId","r":true,"sh":"NORAD catalog ID of the satellite","t":"`$INTEGER`","key$":"satelliteId","index$":5},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Resource type","t":"`$STRING`","key$":"type","index$":6}},"id":{"field":"id","name":"id"},"name":"tle","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /tle/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":20,"k":"query","n":"page_size","or":"page-size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"*","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"popularity","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"desc","k":"query","n":"sort_dir","or":"sort-dir","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/tle/","q":{"exist":["page","page_size","search","sort","sort_dir"]},"r":{},"s":[{"lit":"tle"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /tle/{satelliteId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":25544,"k":"param","n":"id","or":"satelliteId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/tle/{satelliteId}","q":{"exist":["id"]},"r":{"param":{"satelliteId":"id"}},"s":[{"lit":"tle"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"tle","name__orig":"tle","Name":"Tle","name_":"tle","name-":"tle","NAME":"TLE","index$":0}, {"active":true,"entity":"tle","key$":"BasicTleFlow","kind":"basic","name":"BasicTleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tle_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"tle_ref01","srcdatavar":"tle_ref01_data","suffix":"_dt0"},"m":{"id":"tle01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tle_ref01"}}],"index$":1}]}, 'Tle', {"GET /tle/":{"protocol":"http","parameters":[{"name":"search","in":"query","description":"Search query to filter satellites by name or ID. Use '*' for all satellites.","required":false,"schema":{"type":"string","default":"*"},"index$":0},{"name":"sort","in":"query","description":"Field to sort results by","required":false,"schema":{"type":"string","enum":["popularity","name","date","satelliteId"],"default":"popularity"},"index$":1},{"name":"sort-dir","in":"query","description":"Sort direction","required":false,"schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":2},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":3},{"name":"page-size","in":"query","description":"Number of items per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":4}]},"GET /tle/{satelliteId}":{"protocol":"http","parameters":[{"name":"satelliteId","in":"path","description":"NORAD catalog ID of the satellite","required":true,"schema":{"type":"integer","example":25544},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tle_ref01_data = Object.values(setup.data.existing.tle)[0] as any

    // LIST
    const tle_ref01_ent = client.Tle()
    const tle_ref01_match: any = {}

    const tle_ref01_list = (await tle_ref01_ent.list(tle_ref01_match)).map((e: any) => e.data())


    // LOAD
    const tle_ref01_match_dt0: any = {}
    tle_ref01_match_dt0.id = tle_ref01_data.id
    const tle_ref01_data_dt0 = (await tle_ref01_ent.load(tle_ref01_match_dt0)).data()
    assert(tle_ref01_data_dt0.id === tle_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/tle/TleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SatelliteTleDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['tle01','tle02','tle03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SATELLITE_TLE_DATA_TEST_TLE_ENTID': idmap,
    'SATELLITE_TLE_DATA_TEST_LIVE': 'FALSE',
    'SATELLITE_TLE_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SATELLITE_TLE_DATA_TEST_TLE_ENTID']

  const live = 'TRUE' === env.SATELLITE_TLE_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SATELLITE_TLE_DATA_TEST_TLE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SatelliteTleDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SATELLITE_TLE_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
