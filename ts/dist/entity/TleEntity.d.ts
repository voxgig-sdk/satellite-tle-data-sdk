import { SatelliteTleDataEntityBase } from '../SatelliteTleDataEntityBase';
import type { SatelliteTleDataSDK } from '../SatelliteTleDataSDK';
import type { Control } from '../types';
import type { Tle, TleLoadMatch, TleListMatch } from '../SatelliteTleDataTypes';
declare class TleEntity extends SatelliteTleDataEntityBase<Tle> {
    constructor(client: SatelliteTleDataSDK, entopts: any);
    make(this: TleEntity): TleEntity;
    load(this: any, reqmatch?: TleLoadMatch, ctrl?: Control): Promise<TleEntity>;
    list(this: any, reqmatch?: TleListMatch, ctrl?: Control): Promise<TleEntity[]>;
}
export { TleEntity };
