
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


  main = {
    name: 'SatelliteTleData',
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
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "line1",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "line2",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "satelliteId",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
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

