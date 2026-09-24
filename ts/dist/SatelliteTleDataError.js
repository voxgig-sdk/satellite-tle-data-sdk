"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatelliteTleDataError = void 0;
class SatelliteTleDataError extends Error {
    isSatelliteTleDataError = true;
    sdk = 'SatelliteTleData';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.SatelliteTleDataError = SatelliteTleDataError;
//# sourceMappingURL=SatelliteTleDataError.js.map