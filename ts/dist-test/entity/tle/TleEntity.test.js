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
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('tle hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.SatelliteTleDataSDK.test(offline).Tle().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.SatelliteTleDataSDK.test(offline).Tle()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.SatelliteTleDataSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Tle().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.SatelliteTleDataSDK.test().Tle().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.SatelliteTleDataSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Tle().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Tle().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.SatelliteTleDataSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Tle().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SATELLITE_TLE_DATA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'tle.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date": { "a": true, "fo": "date-time", "h": "Date", "n": "date", "r": true, "sh": "Date and time of the TLE data", "t": "`$STRING`", "key$": "date", "index$": 0 }, "id": { "a": true, "fo": "uri", "h": "Id", "n": "id", "r": false, "sh": "Unique identifier URI for the TLE resource", "t": "`$STRING`", "key$": "id", "index$": 1 }, "line1": { "a": true, "h": "Line1", "n": "line1", "r": true, "sh": "First line of the Two-Line Element set", "t": "`$STRING`", "key$": "line1", "index$": 2 }, "line2": { "a": true, "h": "Line2", "n": "line2", "r": true, "sh": "Second line of the Two-Line Element set", "t": "`$STRING`", "key$": "line2", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Name of the satellite", "t": "`$STRING`", "key$": "name", "index$": 4 }, "satelliteId": { "a": true, "h": "Satellite Id", "n": "satelliteId", "r": true, "sh": "NORAD catalog ID of the satellite", "t": "`$INTEGER`", "key$": "satelliteId", "index$": 5 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Resource type", "t": "`$STRING`", "key$": "type", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "tle", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /tle/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "page_size", "or": "page-size", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "*", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "popularity", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "desc", "k": "query", "n": "sort_dir", "or": "sort-dir", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/tle/", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "tle" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /tle/{satelliteId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 25544, "k": "param", "n": "id", "or": "satelliteId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/tle/{satelliteId}", "q": { "exist": ["id"] }, "r": { "param": { "satelliteId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "tle" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "tle", "name__orig": "tle", "Name": "Tle", "name_": "tle", "name-": "tle", "NAME": "TLE", "index$": 0 }, { "active": true, "entity": "tle", "key$": "BasicTleFlow", "kind": "basic", "name": "BasicTleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "tle_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "tle_ref01", "srcdatavar": "tle_ref01_data", "suffix": "_dt0" }, "m": { "id": "tle01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-tle_ref01" } }], "index$": 1 }] }, 'Tle', { "GET /tle/": { "protocol": "http", "parameters": [{ "name": "search", "in": "query", "description": "Search query to filter satellites by name or ID. Use '*' for all satellites.", "required": false, "schema": { "type": "string", "default": "*" }, "index$": 0 }, { "name": "sort", "in": "query", "description": "Field to sort results by", "required": false, "schema": { "type": "string", "enum": ["popularity", "name", "date", "satelliteId"], "default": "popularity" }, "index$": 1 }, { "name": "sort-dir", "in": "query", "description": "Sort direction", "required": false, "schema": { "type": "string", "enum": ["asc", "desc"], "default": "desc" }, "index$": 2 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 3 }, { "name": "page-size", "in": "query", "description": "Number of items per page", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 4 }] }, "GET /tle/{satelliteId}": { "protocol": "http", "parameters": [{ "name": "satelliteId", "in": "path", "description": "NORAD catalog ID of the satellite", "required": true, "schema": { "type": "integer", "example": 25544 }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
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
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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