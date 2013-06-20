# Surface

Add an API over your data source with SQL-like querying and hypermedia navigation.

Surface can expose data items and collections over an API.

## Install

`npm install surface`

## Usage

```javascript
var argo = require('argo');
var surface = require('surface');

var couchdb = surface.drivers.couchdb({ db: 'http://localhost:5984/supertech' });

var config = {
  collections: ['companies', 'contacts', 'opportunities'],
  href: 'http://localhost:3000',
  driver: couchdb
};

argo()
  .use(surface.package(config))
  .listen(3000);
```

## Architecture

Surface is made up of 3 major components.

1. API Server - An Argo package is provided for hosting Surface. This produces responses in the [Siren](https://github.com/kevinswiber/siren) hypermedia format.
3. Drivers - Backend data sources are plugged into the framework using Surface drivers.
4. Query Language Parser - The parser provides a way for drivers to translate Surface's Query Language into driver-specific formats.

Using Surface, any queryable data source can be turned into an API.

## Clients

Surface serves responses in the Siren hypermedia format.

Any Siren client will be able to consume a Surface API.

Included is the Surface Browser, a Web UI for navigating your document graph. See: `./web`.

## API Server

An [Argo](https://github.com/argo/argo) package is provided to include Surface in a new or existing API server.

## Drivers

Drivers are made up of 3 components.

1. Client - A driver initializes a client when the Surface API loads.
2. Session - New sessions are created for each Surface API request.
3. Compiler - The compiler translates Surface queries into a format the data source understands.

See: [Salesforce Driver for Surface](https://github.com/kevinswiber/surface-salesforce/blob/master/salesforce.js)

## Query Language

Surface provides a common Query Language for accessing and filtering data sources.

A detailed syntax diagram can found at http://kevinswiber.github.io/surface/diagram.html

## Example Query

### Request

```bash
curl "http://localhost:3000/companies?query=select+name+where+state%3D'CA'"
```

### Response

```json
{
  "class": ["search-results"],
  "properties": {
    "collection": "companies",
    "query": "select name where state='CA'",
    "timestamp": 1371759067298,
    "count": 1
  },
  "entities": [
    {
      "class": ["company"],
      "rel": ["item"],
      "properties": {
        "name": "GitHub"
      },
      "links": [
        { "rel": ["self"], "href": "http://localhost:3000/companies/001i000000CjiAsAAJ" },
        { "rel": ["collection"], "href": "http://localhost:3000/companies" }
      ]
    }
  ],
  "links": [
    {
      "rel": ["self"],
      "href": "http://localhost:3000/companies?query=select+name+where+state%3D'CA'"
    },
    {
      "rel": ["collection"],
      "href": "http://localhost:3000/"
    }
  ]
}
```
