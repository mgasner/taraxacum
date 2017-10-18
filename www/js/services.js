angular.module('treephone.services', [])

.factory('Auth', function($resource) {
  var _phoneNumber;
  var _sessionId;
  var _expiry;
  var _userId;

  return {
    setPhoneNumber: function (phoneNumber) {
      _phoneNumber = phoneNumber;
    },
    
    getPhoneNumber: function () {
      return _phoneNumber;
    },

    setSessionId: function (sessionId) {
      _sessionId = sessionId;
    },

    // FIXME this auth is broken because it doesn't account for expiry
    getSessionId: function () {
      return _sessionId;
    },

    setUserId: function(userId) {
      _userId = userId;
    },

    getUserId: function () {
      return _userId;
    },

    getHeaders: function () {
      var headers = {
        'X-Dandelion-User': this.getUserId(),
        'X-Dandelion-Session': this.getSessionId()
      };
      console.log(headers);
      return headers;
    }
  }
})

.factory('Friends', function($resource, $http, Auth, api_root, _) {
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

  function getNextId () {
    return _.max(_.map(friends, function (friend) {return _.toInteger(friend.id);})) + 1;
  };

  return {
    all: function() {
      return friends;
    },

    get: function(friendId) {
      var req = {
        method: 'GET',
        url: api_root + '/users/' + friendId,
        headers: Auth.getHeaders()
      };
      console.log(req);
      var friend = $http(req)
      .then(
        function (result) {console.log(result);},
        function (result) {console.log(result);});
      // Simple index lookup
      return friends[friendId];
    },

    children: function(parentId) {
      return _.filter(friends, ['parentId', parentId]);
    },

    add: function(friend) {
      friend.id = getNextId();
      friends.push(friend);
      console.log("Updating friends...")
      console.log(friends);
      return friend;
    }
  }
});
