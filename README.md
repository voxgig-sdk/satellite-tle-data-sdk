# SatelliteTleData SDK

Fetch Two-Line Element (TLE) orbital data for thousands of satellites, including the ISS and Earth-observation missions

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Satellite TLE Data

The Satellite TLE Data API is a free, public service run by Ivan Stanojevic that exposes [Two-Line Element](https://en.wikipedia.org/wiki/Two-line_element_set) sets for nearly 25,000 satellites tracked in Earth orbit. TLEs are the standard encoding used to compute satellite position and velocity over time, suitable for orbital propagators such as SGP4.

What you get from the API:

- A paginated list of TLE records at `/api/tle/` with `satelliteId`, `name`, `date`, `line1`, and `line2`
- Individual satellite lookup at `/api/tle/{satelliteId}` (e.g. `25544` for the ISS)
- Search and sort via `search`, `sort`, `sort-dir`, `page`, and `page-size` query parameters
- Hydra/JSON-LD response envelope with `totalItems`, `member`, and pagination `view`

The service is open and does not require authentication. CORS is enabled, so the API can be called directly from browser code. No published rate limits or SLA are documented.

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

## 30-second quickstart

### TypeScript

```ts
import { SatelliteTleDataSDK } from 'satellite-tle-data'

const client = new SatelliteTleDataSDK({})

// List all tles
const tles = await client.Tle().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Tle** | A Two-Line Element record for a single tracked satellite, with `satelliteId`, `name`, `date`, `line1`, and `line2`; available as a collection at `/api/tle/` and individually at `/api/tle/{satelliteId}`. | `/tle/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from satellitetledata_sdk import SatelliteTleDataSDK

client = SatelliteTleDataSDK({})

# List all tles
tles, err = client.Tle(None).list(None, None)

# Load a specific tle
tle, err = client.Tle(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'satellitetledata_sdk.php';

$client = new SatelliteTleDataSDK([]);

// List all tles
[$tles, $err] = $client->Tle(null)->list(null, null);

// Load a specific tle
[$tle, $err] = $client->Tle(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/satellite-tle-data-sdk/go"

client := sdk.NewSatelliteTleDataSDK(map[string]any{})

// List all tles
tles, err := client.Tle(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "SatelliteTleData_sdk"

client = SatelliteTleDataSDK.new({})

# List all tles
tles, err = client.Tle(nil).list(nil, nil)

# Load a specific tle
tle, err = client.Tle(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("satellite-tle-data_sdk")

local client = sdk.new({})

-- List all tles
local tles, err = client:Tle(nil):list(nil, nil)

-- Load a specific tle
local tle, err = client:Tle(nil):load(
  { id = "example_id" }, nil
)
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
client = SatelliteTleDataSDK.test(None, None)
result, err = client.Tle(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = SatelliteTleDataSDK::test(null, null);
[$result, $err] = $client->Tle(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Tle(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = SatelliteTleDataSDK.test(nil, nil)
result, err = client.Tle(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Tle(nil):load(
  { id = "test01" }, nil
)
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

## Using the Satellite TLE Data

- Upstream: [https://tle.ivanstanojevic.me/](https://tle.ivanstanojevic.me/)

---

Generated from the Satellite TLE Data OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
