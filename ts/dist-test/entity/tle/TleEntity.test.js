"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SATELLITE_TLE_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SATELLITE_TLE_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SatelliteTleDataSDK.test();
        const ent = testsdk.Tle();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SATELLITE_TLE_DATA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'tle.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "date", "req": true, "short": "Date and time of the TLE data", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "uri", "name": "id", "req": false, "short": "Unique identifier URI for the TLE resource", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "line1", "req": true, "short": "First line of the Two-Line Element set", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "line2", "req": true, "short": "Second line of the Two-Line Element set", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "name", "req": true, "short": "Name of the satellite", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "satelliteId", "req": true, "short": "NORAD catalog ID of the satellite", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "type", "req": false, "short": "Resource type", "type": "`$STRING`", "index$": 6 }], "id": { "field": "id", "name": "id" }, "name": "tle", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 20, "kind": "query", "name": "page_size", "orig": "page_size", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "*", "kind": "query", "name": "search", "orig": "search", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "popularity", "kind": "query", "name": "sort", "orig": "sort", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": "desc", "kind": "query", "name": "sort_dir", "orig": "sort_dir", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /tle/", "json": "{\"operationId\":\"getTLEList\",\"parameters\":[{\"description\":\"Search query to filter satellites by name or ID. Use '*' for all satellites.\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"default\":\"*\",\"type\":\"string\"}},{\"description\":\"Field to sort results by\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"default\":\"popularity\",\"enum\":[\"popularity\",\"name\",\"date\",\"satelliteId\"],\"type\":\"string\"}},{\"description\":\"Sort direction\",\"in\":\"query\",\"name\":\"sort-dir\",\"required\":false,\"schema\":{\"default\":\"desc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"page-size\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"@context\":{\"description\":\"JSON-LD context\",\"example\":\"https://www.w3.org/ns/hydra/context.jsonld\",\"format\":\"uri\",\"type\":\"string\"},\"@id\":{\"description\":\"Identifier for the collection\",\"example\":\"https://tle.ivanstanojevic.me/api/tle/\",\"format\":\"uri\",\"type\":\"string\"},\"@type\":{\"description\":\"Collection type\",\"example\":\"Tle[]\",\"type\":\"string\"},\"member\":{\"description\":\"Array of TLE objects\",\"items\":{\"properties\":{\"@id\":{\"description\":\"Unique identifier URI for the TLE resource\",\"example\":\"https://tle.ivanstanojevic.me/api/tle/25544\",\"format\":\"uri\",\"type\":\"string\"},\"@type\":{\"description\":\"Resource type\",\"example\":\"Tle\",\"type\":\"string\"},\"date\":{\"description\":\"Date and time of the TLE data\",\"example\":\"2026-02-15T13:40:14+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"line1\":{\"description\":\"First line of the Two-Line Element set\",\"example\":\"1 25544U 98067A 26046.56961129 .00012237 00000+0 23255-3 0 9991\",\"type\":\"string\"},\"line2\":{\"description\":\"Second line of the Two-Line Element set\",\"example\":\"2 25544 51.6318 181.6982 0010992 101.7612 258.4610 15.48625638552905\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the satellite\",\"example\":\"ISS (ZARYA)\",\"type\":\"string\"},\"satelliteId\":{\"description\":\"NORAD catalog ID of the satellite\",\"example\":25544,\"type\":\"integer\"}},\"required\":[\"satelliteId\",\"name\",\"date\",\"line1\",\"line2\"],\"type\":\"object\"},\"type\":\"array\"},\"parameters\":{\"description\":\"Query parameters used for this request\",\"properties\":{\"page\":{\"example\":1,\"type\":\"integer\"},\"page-size\":{\"example\":20,\"type\":\"integer\"},\"search\":{\"example\":\"*\",\"type\":\"string\"},\"sort\":{\"example\":\"popularity\",\"type\":\"string\"},\"sort-dir\":{\"example\":\"desc\",\"type\":\"string\"}},\"type\":\"object\"},\"totalItems\":{\"description\":\"Total number of TLE entries available\",\"example\":23381,\"type\":\"integer\"},\"view\":{\"description\":\"Pagination view information\",\"properties\":{\"@id\":{\"description\":\"Current page URI\",\"example\":\"https://tle.ivanstanojevic.me/api/tle/?page=1\",\"format\":\"uri\",\"type\":\"string\"},\"@type\":{\"example\":\"PartialCollectionView\",\"type\":\"string\"},\"first\":{\"description\":\"URI of the first page\",\"example\":\"https://tle.ivanstanojevic.me/api/tle/?page=1\",\"format\":\"uri\",\"type\":\"string\"},\"last\":{\"description\":\"URI of the last page\",\"example\":\"https://tle.ivanstanojevic.me/api/tle/?page=1170\",\"format\":\"uri\",\"type\":\"string\"},\"next\":{\"description\":\"URI of the next page\",\"example\":\"https://tle.ivanstanojevic.me/api/tle/?page=2\",\"format\":\"uri\",\"type\":\"string\"},\"previous\":{\"description\":\"URI of the previous page (if applicable)\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"totalItems\",\"member\"],\"type\":\"object\"}}},\"description\":\"Successful response with TLE data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/tle/", "segments": [{ "lit": "tle" }], "select": { "exist": ["page", "page_size", "search", "sort", "sort_dir"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 25544, "kind": "param", "name": "id", "orig": "satellite_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /tle/{satelliteId}", "json": "{\"operationId\":\"getTLEBySatelliteId\",\"parameters\":[{\"description\":\"NORAD catalog ID of the satellite\",\"in\":\"path\",\"name\":\"satelliteId\",\"required\":true,\"schema\":{\"example\":25544,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"@id\":{\"description\":\"Unique identifier URI for the TLE resource\",\"example\":\"https://tle.ivanstanojevic.me/api/tle/25544\",\"format\":\"uri\",\"type\":\"string\"},\"@type\":{\"description\":\"Resource type\",\"example\":\"Tle\",\"type\":\"string\"},\"date\":{\"description\":\"Date and time of the TLE data\",\"example\":\"2026-02-15T13:40:14+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"line1\":{\"description\":\"First line of the Two-Line Element set\",\"example\":\"1 25544U 98067A 26046.56961129 .00012237 00000+0 23255-3 0 9991\",\"type\":\"string\"},\"line2\":{\"description\":\"Second line of the Two-Line Element set\",\"example\":\"2 25544 51.6318 181.6982 0010992 101.7612 258.4610 15.48625638552905\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the satellite\",\"example\":\"ISS (ZARYA)\",\"type\":\"string\"},\"satelliteId\":{\"description\":\"NORAD catalog ID of the satellite\",\"example\":25544,\"type\":\"integer\"}},\"required\":[\"satelliteId\",\"name\",\"date\",\"line1\",\"line2\"],\"type\":\"object\"}}},\"description\":\"Successful response with TLE data for the specified satellite\"},\"404\":{\"description\":\"Satellite not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/tle/{satelliteId}", "rename": { "param": { "satelliteId": "id" } }, "segments": [{ "lit": "tle" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "tle", "name__orig": "tle", "Name": "Tle", "name_": "tle", "name-": "tle", "NAME": "TLE", "index$": 0 }, { "active": true, "entity": "tle", "key$": "BasicTleFlow", "kind": "basic", "name": "BasicTleFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "tle_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "tle_ref01", "srcdatavar": "tle_ref01_data", "suffix": "_dt0" }, "match": { "id": "tle01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-tle_ref01" } }], "index$": 1 }] }, 'Tle');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let tle_ref01_data = Object.values(setup.data.existing.tle)[0];
        // LIST
        const tle_ref01_ent = client.Tle();
        const tle_ref01_match = {};
        const tle_ref01_list = (await tle_ref01_ent.list(tle_ref01_match)).map((e) => e.data());
        // LOAD
        const tle_ref01_match_dt0 = {};
        tle_ref01_match_dt0.id = tle_ref01_data.id;
        const tle_ref01_data_dt0 = (await tle_ref01_ent.load(tle_ref01_match_dt0)).data();
        (0, node_assert_1.default)(tle_ref01_data_dt0.id === tle_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/tle/TleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SatelliteTleDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['tle01', 'tle02', 'tle03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SATELLITE_TLE_DATA_TEST_TLE_ENTID': idmap,
        'SATELLITE_TLE_DATA_TEST_LIVE': 'FALSE',
        'SATELLITE_TLE_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SATELLITE_TLE_DATA_TEST_TLE_ENTID'];
    const live = 'TRUE' === env.SATELLITE_TLE_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SATELLITE_TLE_DATA_TEST_TLE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SatelliteTleDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=TleEntity.test.js.map