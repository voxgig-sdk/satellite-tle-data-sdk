
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SatelliteTleData',
        slug: "satellite-tle-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://tle.ivanstanojevic.me/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      tle: {
      },

    }
  }


  entity = {
    "tle": {
      "fields": [
        {
          "name": "date",
          "req": true,
          "short": "Date and time of the TLE data",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier URI for the TLE resource",
          "type": "`$STRING`"
        },
        {
          "name": "line1",
          "req": true,
          "short": "First line of the Two-Line Element set",
          "type": "`$STRING`"
        },
        {
          "name": "line2",
          "req": true,
          "short": "Second line of the Two-Line Element set",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Name of the satellite",
          "type": "`$STRING`"
        },
        {
          "name": "satelliteId",
          "req": true,
          "short": "NORAD catalog ID of the satellite",
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
          "short": "Resource type",
          "type": "`$STRING`"
        }
      ],
      "name": "tle",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "*",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "popularity",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "sort_dir",
                    "orig": "sort_dir",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/tle/",
              "parts": [
                "tle"
              ],
              "select": {
                "exist": [
                  "page",
                  "page_size",
                  "search",
                  "sort",
                  "sort_dir"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 25544,
                    "kind": "param",
                    "name": "id",
                    "orig": "satellite_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/tle/{satelliteId}",
              "parts": [
                "tle",
                "{id}"
              ],
              "rename": {
                "param": {
                  "satelliteId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

