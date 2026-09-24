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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date": { "a": true, "fo": "date-time", "h": "Date", "n": "date", "r": true, "sh": "Date and time of the TLE data", "t": "`$STRING`", "key$": "date", "index$": 0 }, "id": { "a": true, "fo": "uri", "h": "Id", "n": "id", "r": false, "sh": "Unique identifier URI for the TLE resource", "t": "`$STRING`", "key$": "id", "index$": 1 }, "line1": { "a": true, "h": "Line1", "n": "line1", "r": true, "sh": "First line of the Two-Line Element set", "t": "`$STRING`", "key$": "line1", "index$": 2 }, "line2": { "a": true, "h": "Line2", "n": "line2", "r": true, "sh": "Second line of the Two-Line Element set", "t": "`$STRING`", "key$": "line2", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Name of the satellite", "t": "`$STRING`", "key$": "name", "index$": 4 }, "satelliteId": { "a": true, "h": "Satellite Id", "n": "satelliteId", "r": true, "sh": "NORAD catalog ID of the satellite", "t": "`$INTEGER`", "key$": "satelliteId", "index$": 5 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Resource type", "t": "`$STRING`", "key$": "type", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "tle", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /tle/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "*", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "popularity", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "desc", "k": "query", "n": "sort_dir", "or": "sort_dir", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/tle/", "q": { "exist": ["page", "page_size", "search", "sort", "sort_dir"] }, "r": {}, "s": [{ "lit": "tle" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /tle/{satelliteId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 25544, "k": "param", "n": "id", "or": "satellite_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/tle/{satelliteId}", "q": { "exist": ["id"] }, "r": { "param": { "satelliteId": "id" } }, "s": [{ "lit": "tle" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "tle", "name__orig": "tle", "Name": "Tle", "name_": "tle", "name-": "tle", "NAME": "TLE", "index$": 0 }, { "active": true, "entity": "tle", "key$": "BasicTleFlow", "kind": "basic", "name": "BasicTleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "tle_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "tle_ref01", "srcdatavar": "tle_ref01_data", "suffix": "_dt0" }, "m": { "id": "tle01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-tle_ref01" } }], "index$": 1 }] }, 'Tle', { "GET /tle/": { "protocol": "http", "operationId": "getTLEList", "responses": { "200": { "description": "Successful response with TLE data", "content": { "application/json": { "schema": { "type": "object", "properties": { "@context": { "description": "JSON-LD context", "example": "https://www.w3.org/ns/hydra/context.jsonld", "format": "uri", "key$": "@context", "type": "string" }, "@id": { "description": "Identifier for the collection", "example": "https://tle.ivanstanojevic.me/api/tle/", "format": "uri", "key$": "@id", "type": "string" }, "@type": { "description": "Collection type", "example": "Tle[]", "key$": "@type", "type": "string" }, "totalItems": { "description": "Total number of TLE entries available", "example": 23381, "key$": "totalItems", "type": "integer" }, "member": { "description": "Array of TLE objects", "items": { "properties": { "@id": { "description": "Unique identifier URI for the TLE resource", "example": "https://tle.ivanstanojevic.me/api/tle/25544", "format": "uri", "type": "string", "key$": "@id" }, "@type": { "description": "Resource type", "example": "Tle", "type": "string", "key$": "@type" }, "date": { "description": "Date and time of the TLE data", "example": "2026-02-15T13:40:14+00:00", "format": "date-time", "type": "string", "key$": "date" }, "line1": { "description": "First line of the Two-Line Element set", "example": "1 25544U 98067A 26046.56961129 .00012237 00000+0 23255-3 0 9991", "type": "string", "key$": "line1" }, "line2": { "description": "Second line of the Two-Line Element set", "example": "2 25544 51.6318 181.6982 0010992 101.7612 258.4610 15.48625638552905", "type": "string", "key$": "line2" }, "name": { "description": "Name of the satellite", "example": "ISS (ZARYA)", "type": "string", "key$": "name" }, "satelliteId": { "description": "NORAD catalog ID of the satellite", "example": 25544, "type": "integer", "key$": "satelliteId" } }, "required": ["satelliteId", "name", "date", "line1", "line2"], "type": "object", "x-ref": "#/components/schemas/TLE", "index$": 0 }, "key$": "member", "type": "array" }, "parameters": { "description": "Query parameters used for this request", "key$": "parameters", "properties": { "page": { "example": 1, "type": "integer" }, "page-size": { "example": 20, "type": "integer" }, "search": { "example": "*", "type": "string" }, "sort": { "example": "popularity", "type": "string" }, "sort-dir": { "example": "desc", "type": "string" } }, "type": "object" }, "view": { "description": "Pagination view information", "key$": "view", "properties": { "@id": { "description": "Current page URI", "example": "https://tle.ivanstanojevic.me/api/tle/?page=1", "format": "uri", "type": "string" }, "@type": { "example": "PartialCollectionView", "type": "string" }, "first": { "description": "URI of the first page", "example": "https://tle.ivanstanojevic.me/api/tle/?page=1", "format": "uri", "type": "string" }, "last": { "description": "URI of the last page", "example": "https://tle.ivanstanojevic.me/api/tle/?page=1170", "format": "uri", "type": "string" }, "next": { "description": "URI of the next page", "example": "https://tle.ivanstanojevic.me/api/tle/?page=2", "format": "uri", "type": "string" }, "previous": { "description": "URI of the previous page (if applicable)", "format": "uri", "type": "string" } }, "type": "object" } }, "required": ["totalItems", "member"], "x-ref": "#/components/schemas/TLECollection" } } } }, "400": { "description": "Bad request - invalid parameters" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "search", "in": "query", "description": "Search query to filter satellites by name or ID. Use '*' for all satellites.", "required": false, "schema": { "type": "string", "default": "*" }, "index$": 0 }, { "name": "sort", "in": "query", "description": "Field to sort results by", "required": false, "schema": { "type": "string", "enum": ["popularity", "name", "date", "satelliteId"], "default": "popularity" }, "index$": 1 }, { "name": "sort-dir", "in": "query", "description": "Sort direction", "required": false, "schema": { "type": "string", "enum": ["asc", "desc"], "default": "desc" }, "index$": 2 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 3 }, { "name": "page-size", "in": "query", "description": "Number of items per page", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 4 }], "securitySource": "unspecified" }, "GET /tle/{satelliteId}": { "protocol": "http", "operationId": "getTLEBySatelliteId", "responses": { "200": { "description": "Successful response with TLE data for the specified satellite", "content": { "application/json": { "schema": { "type": "object", "properties": { "@id": { "description": "Unique identifier URI for the TLE resource", "example": "https://tle.ivanstanojevic.me/api/tle/25544", "format": "uri", "type": "string", "key$": "@id" }, "@type": { "description": "Resource type", "example": "Tle", "type": "string", "key$": "@type" }, "satelliteId": { "description": "NORAD catalog ID of the satellite", "example": 25544, "type": "integer", "key$": "satelliteId" }, "name": { "description": "Name of the satellite", "example": "ISS (ZARYA)", "type": "string", "key$": "name" }, "date": { "description": "Date and time of the TLE data", "example": "2026-02-15T13:40:14+00:00", "format": "date-time", "type": "string", "key$": "date" }, "line1": { "description": "First line of the Two-Line Element set", "example": "1 25544U 98067A 26046.56961129 .00012237 00000+0 23255-3 0 9991", "type": "string", "key$": "line1" }, "line2": { "description": "Second line of the Two-Line Element set", "example": "2 25544 51.6318 181.6982 0010992 101.7612 258.4610 15.48625638552905", "type": "string", "key$": "line2" } }, "required": ["satelliteId", "name", "date", "line1", "line2"], "x-ref": "#/components/schemas/TLE", "index$": 0 } } } }, "404": { "description": "Satellite not found" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "satelliteId", "in": "path", "description": "NORAD catalog ID of the satellite", "required": true, "schema": { "type": "integer", "example": 25544 }, "index$": 0 }], "securitySource": "unspecified" } });
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