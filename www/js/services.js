angular.module('treephone.services', [])

.factory('Rpc', function () {

  return {
    pending: false,
    error: false,
    setPending: function (status) {
      this.pending = status;
    },
    setError: function (status) {
      this.error = status;
    }    
  }
})

.factory('Auth', function($resource, localStorageService) {
  var _phoneNumber;
  var _sessionId;
  var _expiry;
  var _userId;

  function getUserId() {
    return _userId || localStorageService.get('_userId');
  };

  function getSessionId() {
    return _sessionId || localStorageService.get('_sessionId');
  };

  return {
    editing: undefined,

    setPhoneNumber: function (phoneNumber) {
      _phoneNumber = phoneNumber;
      localStorageService.set('_phoneNumber', phoneNumber);
    },
    
    getPhoneNumber: function () {
      return _phoneNumber || localStorageService.get('_phoneNumber');
    },

    setSessionId: function (sessionId) {
      _sessionId = sessionId;
      localStorageService.set('_sessionId', sessionId);
    },

    // FIXME this auth is broken because it doesn't account for expiry
    // Ha, except now we don't have expiry
    'getSessionId': getSessionId,

    setUserId: function(userId) {
      _userId = userId;
      localStorageService.set('_userId', userId);
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

.factory('Friends', function($resource, $http, Rpc, Auth, api_root, _) {

  return {
    get: function(friendId) {
      var req = {
        method: 'GET',
        url: api_root + '/users/' + friendId,
        headers: Auth.getHeaders()
      };
      Rpc.setPending(true);
      console.log(Rpc);
      var promise = $http(req)
      .then(
        function (result) {
          friend = result.data;
          Rpc.setPending(false);
          return friend;
        },
        function (result) {
          console.log(result)
          Rpc.setPending(false);
          Rpc.setError(true);
          return {};});
      return promise;
    },
    children: function(parentId) {
      var req = {
        method: 'GET',
        url: api_root + '/users/' + parentId + '/children',
        headers: Auth.getHeaders()
      }
      Rpc.setPending(true);
      var promise = $http(req)
      .then(
        function (result) {
          friends = result.data;
          Rpc.setPending(false);
          return friends;
        },
        function (result) {
          console.log(result);
          Rpc.setPending(false);
          Rpc.setError(true);
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
      Rpc.setPending(true);
      var promise = $http(req)
      .then(
        function (result) {
          Rpc.setPending(false);
          return result.data;
        },
        function (result) {
          Rpc.setPending(false);
          Rpc.setError(true);
          return {};
        }
      );
      return promise;
    },
    
    edit: function(friend) {
      var req = {
        method: 'POST',
        url: api_root + '/users/' + friend.uid,
        headers: Auth.getHeaders(),
        data: friend
      }
      Rpc.setPending(true);
      var promise = $http(req)
      .then(
        function (result) {
          Rpc.setPending(false);
          return result.data;
        },
        function (result) {
          Rpc.setPending(false);
          Rpc.setError(true);
          return {};
        }
      );
      return promise;
    },

    csv: function(friendId) {
      var req = {
        method: 'GET',
        url: api_root + '/users/' + friendId + '/csv',
        headers: Auth.getHeaders()
      };
      Rpc.setPending(true);
      var promise  = $http(req)
      .then(
        function () { Rpc.setPending(false);},
        function () { 
          Rpc.setPending(false);
          Rpc.setError(true);
        }
      );
      return promise;
    },

    invite: function(friendId) {
      var req = {
        method: 'GET',
        url: api_root + '/users/' + friendId + '/invite',
        headers: Auth.getHeaders()
      };
      Rpc.setPending(true);
      var promise  = $http(req)
      .then(
        function () { Rpc.setPending(false);},
        function () { 
          Rpc.setPending(false);
          Rpc.setError(true);
        }
      );
      return promise;
    },

  }
});
