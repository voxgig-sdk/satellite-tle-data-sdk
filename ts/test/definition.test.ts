import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "tle",
    "accessor": "Tle",
    "op": "list",
    "method": "GET",
    "path": "/tle/",
    "args": [],
    "select": {
      "page": 1,
      "page_size": 20,
      "search": "*",
      "sort": "popularity",
      "sort_dir": "desc"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "search",
      "sort",
      "sort-dir",
      "page",
      "page-size"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "page-size"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "sort_dir",
        "wire": "sort-dir"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "@context": "https://www.w3.org/ns/hydra/context.jsonld",
      "@id": "https://tle.ivanstanojevic.me/api/tle/",
      "@type": "Tle[]",
      "totalItems": 23381,
      "member": [
        {
          "@id": "https://tle.ivanstanojevic.me/api/tle/25544",
          "@type": "Tle",
          "satelliteId": 25544,
          "name": "ISS (ZARYA)",
          "date": "2026-02-15T13:40:14+00:00",
          "line1": "1 25544U 98067A 26046.56961129 .00012237 00000+0 23255-3 0 9991",
          "line2": "2 25544 51.6318 181.6982 0010992 101.7612 258.4610 15.48625638552905"
        }
      ],
      "parameters": {
        "search": "*",
        "sort": "popularity",
        "sort-dir": "desc",
        "page": 1,
        "page-size": 20
      },
      "view": {
        "@id": "https://tle.ivanstanojevic.me/api/tle/?page=1",
        "@type": "PartialCollectionView",
        "first": "https://tle.ivanstanojevic.me/api/tle/?page=1",
        "next": "https://tle.ivanstanojevic.me/api/tle/?page=2",
        "last": "https://tle.ivanstanojevic.me/api/tle/?page=1170",
        "previous": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "tle",
    "accessor": "Tle",
    "op": "load",
    "method": "GET",
    "path": "/tle/{satelliteId}",
    "args": [
      {
        "name": "id",
        "wire": "satelliteId",
        "value": 25544
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "@id": "https://tle.ivanstanojevic.me/api/tle/25544",
      "@type": "Tle",
      "satelliteId": 25544,
      "name": "ISS (ZARYA)",
      "date": "2026-02-15T13:40:14+00:00",
      "line1": "1 25544U 98067A 26046.56961129 .00012237 00000+0 23255-3 0 9991",
      "line2": "2 25544 51.6318 181.6982 0010992 101.7612 258.4610 15.48625638552905"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
