angular.module('treephone.services', [])

.factory('Auth', function($resource) {
  var _phoneNumber;
  var _sessionId;
  var _expiry;
  var _userId;

  function getUserId() {
    return _userId;
  };

  function getSessionId() {
    return _sessionId;
  };

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
    'getSessionId': getSessionId,

    setUserId: function(userId) {
      _userId = userId;
    },

    'getUserId': getUserId,

    getHeaders: function () {
       
      var headers = {
        'X-Dandelion-User': getUserId(),
        'X-Dandelion-Session': getSessionId()
      };
      return headers;
    }
  }
})

.factory('Friends', function($resource, $http, Auth, api_root, _) {

  return {
    get: function(friendId) {
      var req = {
        method: 'GET',
        url: api_root + '/users/' + friendId,
        headers: Auth.getHeaders()
      };
      var promise = $http(req)
      .then(
        function (result) {
          friend = result.data;
          return friend;
        },
        function (result) {
          console.log(result)
          return {};});
      return promise;
    },
    children: function(parentId) {
      var req = {
        method: 'GET',
        url: api_root + '/users/' + parentId + '/children',
        headers: Auth.getHeaders()
      }
      var promise = $http(req)
      .then(
        function (result) {
          friends = result.data;
          return friends;
        },
        function (result) {
          console.log(result);
          return [];});
      return promise;
    },

    add: function(friend, parentId) {
      var req = {
        method: 'POST',
        url: api_root + '/users/' + parentId + '/children',
        headers: Auth.getHeaders(),
        data: friend
      }
      var promise = $http(req)
      .then(
        function (result) {
          return result.data;
        },
        function (result) {
          return {};
        }
      );
    }
  }
});
