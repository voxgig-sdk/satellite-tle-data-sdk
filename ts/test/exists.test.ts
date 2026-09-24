
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SatelliteTleDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SatelliteTleDataSDK.test()
    equal(testsdk instanceof SatelliteTleDataSDK, true,
      'SatelliteTleDataSDK.test() must return a client synchronously')
  })

})
