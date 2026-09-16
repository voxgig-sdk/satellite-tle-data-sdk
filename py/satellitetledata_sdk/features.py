# SatelliteTleData SDK feature factory

from satellitetledata_sdk.feature.base_feature import SatelliteTleDataBaseFeature
from satellitetledata_sdk.feature.ratelimit_feature import SatelliteTleDataRatelimitFeature
from satellitetledata_sdk.feature.retry_feature import SatelliteTleDataRetryFeature
from satellitetledata_sdk.feature.test_feature import SatelliteTleDataTestFeature
from satellitetledata_sdk.feature.timeout_feature import SatelliteTleDataTimeoutFeature


_FEATURES = {
    "base": lambda: SatelliteTleDataBaseFeature(),
    "ratelimit": lambda: SatelliteTleDataRatelimitFeature(),
    "retry": lambda: SatelliteTleDataRetryFeature(),
    "test": lambda: SatelliteTleDataTestFeature(),
    "timeout": lambda: SatelliteTleDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
