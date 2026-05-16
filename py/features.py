# SatelliteTleData SDK feature factory

from feature.base_feature import SatelliteTleDataBaseFeature
from feature.test_feature import SatelliteTleDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SatelliteTleDataBaseFeature(),
        "test": lambda: SatelliteTleDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
