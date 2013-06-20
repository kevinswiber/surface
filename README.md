# Surface

Add an API over your data source with SQL-like querying and hypermedia navigation.

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


