# SatelliteTleData SDK

Satellite TLE Data client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install satellite-tle-data
```

**Python**
```bash
pip install satellite-tle-data-sdk
```

**PHP**
```bash
composer require voxgig/satellite-tle-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/satellite-tle-data-sdk/go
```

**Ruby**
```bash
gem install satellite-tle-data-sdk
```

**Lua**
```bash
luarocks install satellite-tle-data-sdk
```

## Quickstart

### TypeScript

```ts
import { SatelliteTleDataSDK } from 'satellite-tle-data'

const client = new SatelliteTleDataSDK({
  apikey: process.env.SATELLITE-TLE-DATA_APIKEY,
})

// List all tles
const tles = await client.Tle().list()
console.log(tles.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o satellite-tle-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "satellite-tle-data": {
      "command": "/abs/path/to/satellite-tle-data-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Tle** |  | `/tle/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from satellitetledata_sdk import SatelliteTleDataSDK

client = SatelliteTleDataSDK({
    "apikey": os.environ.get("SATELLITE-TLE-DATA_APIKEY"),
})

# List all tles
tles, err = client.Tle().list()
print(tles)

# Load a specific tle
tle, err = client.Tle().load({"id": "example_id"})
print(tle)
```

### PHP

```php
<?php
require_once 'satellitetledata_sdk.php';

$client = new SatelliteTleDataSDK([
    "apikey" => getenv("SATELLITE-TLE-DATA_APIKEY"),
]);

// List all tles
[$tles, $err] = $client->Tle()->list();
print_r($tles);

// Load a specific tle
[$tle, $err] = $client->Tle()->load(["id" => "example_id"]);
print_r($tle);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/satellite-tle-data-sdk/go"

client := sdk.NewSatelliteTleDataSDK(map[string]any{
    "apikey": os.Getenv("SATELLITE-TLE-DATA_APIKEY"),
})

// List all tles
tles, err := client.Tle(nil).List(nil, nil)
fmt.Println(tles)
```

### Ruby

```ruby
require_relative "SatelliteTleData_sdk"

client = SatelliteTleDataSDK.new({
  "apikey" => ENV["SATELLITE-TLE-DATA_APIKEY"],
})

# List all tles
tles, err = client.Tle().list
puts tles

# Load a specific tle
tle, err = client.Tle().load({ "id" => "example_id" })
puts tle
```

### Lua

```lua
local sdk = require("satellite-tle-data_sdk")

local client = sdk.new({
  apikey = os.getenv("SATELLITE-TLE-DATA_APIKEY"),
})

-- List all tles
local tles, err = client:Tle():list()
print(tles)

-- Load a specific tle
local tle, err = client:Tle():load({ id = "example_id" })
print(tle)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = SatelliteTleDataSDK.test()
const result = await client.Tle().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = SatelliteTleDataSDK.test()
result, err = client.Tle().load({"id": "test01"})
```

### PHP

```php
$client = SatelliteTleDataSDK::test();
[$result, $err] = $client->Tle()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Tle(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = SatelliteTleDataSDK.test
result, err = client.Tle().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Tle():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Satellite TLE Data OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
