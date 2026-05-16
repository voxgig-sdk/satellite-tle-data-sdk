# ProjectName SDK exists test

import pytest
from satellitetledata_sdk import SatelliteTleDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SatelliteTleDataSDK.test(None, None)
        assert testsdk is not None
