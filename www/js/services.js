angular.module('treephone.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function($resource, _) {
  // Might use a resource here that returns a JSON array
  //return $resource('https://jsonplaceholder.typicode.com/users/:userId');

  // Some fake testing data
  var friends = [
    { id: '0',
      firstName: 'Sonja',
      lastName: 'Trauss',
      address1: '603 Natoma St',
      address2: '#305',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      tel: '215-900-1457',
      parentId: null },
    { id: '1',
      firstName: 'Max',
      lastName: 'Gasner',
      address1: '1618 12th St',
      address2: null,
      city: 'Oakland',
      state: 'CA',
      zipCode: '94607',
      tel: '510-495-4557',
      parentId: '0' },
    { id: '2',
      firstName: 'Ethan',
      lastName: 'Ashley',
      address1: '603 Natoma St',
      address2: '#305',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      tel: '510-725-2822',
      parentId: '0'},
    { id: '3',
      firstName: 'Trevor',
      lastName: 'Hardee',
      address1: '1618 12th St',
      address2: null,
      city: 'Oakland',
      state: 'CA',
      zipCode: '94607',
      tel: '707-320-7932',
      parentId: '1' }
  ];

  return {
    all: function() {
      return friends;
    },

    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    },

    children: function(parentId) {
      return _.filter(friends, ['parentId', parentId]);
    }
  }
});
