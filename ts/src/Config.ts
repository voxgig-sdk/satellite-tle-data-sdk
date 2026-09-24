
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Date",
          "type": "`$STRING`",
          "req": true,
          "short": "Date and time of the TLE data",
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier URI for the TLE resource",
          "format": "uri"
        },
        {
          "name": "line1",
          "title": "Line1",
          "type": "`$STRING`",
          "req": true,
          "short": "First line of the Two-Line Element set"
        },
        {
          "name": "line2",
          "title": "Line2",
          "type": "`$STRING`",
          "req": true,
          "short": "Second line of the Two-Line Element set"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Name of the satellite"
        },
        {
          "name": "satelliteId",
          "title": "Satellite Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "NORAD catalog ID of the satellite"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Resource type"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "tle",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/tle/",
              "segments": [
                {
                  "lit": "tle"
                }
              ],
              "parts": [
                "tle"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "*"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "popularity"
                  },
                  {
                    "name": "sort_dir",
                    "orig": "sort_dir",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "desc"
                  }
                ]
              },
              "select": {
                "exist": [
                  "page",
                  "page_size",
                  "search",
                  "sort",
                  "sort_dir"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/tle/{satelliteId}",
              "segments": [
                {
                  "lit": "tle"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "tle",
                "{id}"
              ],
              "rename": {
                "param": {
                  "satelliteId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "satellite_id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 25544
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
  config,
  FEATURE_PLUGINS,
}

