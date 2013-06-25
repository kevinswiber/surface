/*
   // Class Definitions

   entity : link$self
   entity.home : entity$item.collection+, action!search
   entity.collection : entity$item*
   entity.search-results : link$index
   entity.user-list: entity$item.user*
   entity.post-list: entity$item.post*
   entity.follows-list: entity$item.follows*
   entity.user, entity.post, entity.follows : link$collection, link$index

   action!search : ~query

 */

module.exports = {
  '.*': ['%self'],
  '.home': ['$item.collection+', '!search'],
  '.collection': ['$item*'],
  '.search-results': ['%index'],
  '.user-list': ['$item.user*'],
  '.post-list': ['$item.post*'],
  '.user-list': ['$item.user*'],
  '.follows-list': ['$item.follows*'],
  '.user': ['%collection', '%index'],
  '.post': ['%collection', '%index'],
  '.follows': ['%collection', '%index'],
  '!search': ['~query']
};

var parsed = {
  classes: {
    'STAR': { links: [{ rel: ['self'], occurrence: 'one' }] },
    'home': { entities: [{ rel: ['item'], classes: ['collection'], occurrence: 'oneOrMore' }], actions: ['search'] },
    'collection': { entities: [{ rel: ['item'], occurrence: 'zeroOrMore' }] },
    'search-results': { links: [{ rel: ['index'], occurrence: 'one' }] },
    'user-list': { entities: [{ rel: ['item'], classes: ['user'], occurrence: 'one' }] },
    'post-list': { entities: [{ rel: ['item'], classes: ['post'], occurrence: 'one' }] },
    'follows-list': { entities: [{ rel: ['item'], classes: ['follows'], occurrence: 'one' }] },
    'user': { links: [{ rel: ['collection'], occurrence: 'one' }, { rel: ['index'], occurrence: 'one' }] },
    'post': { links: [{ rel: ['collection'], occurrence: 'one' }, { rel: ['index'], occurrence: 'one' }] },
    'follows': { links: [{ rel: ['collection'], occurrence: 'one' }, { rel: ['index'], occurrence: 'one' }] }
  },
  actions: {
    'search': { fields: ['query'] }
  }
};
