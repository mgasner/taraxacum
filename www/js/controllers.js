angular.module('treephone.controllers', [])

.controller(
  'LoginCtrl',
  function($scope, $location, $http, Auth, api_root) {
    $scope.submitLogin = function(login) {
      Auth.setPhoneNumber(login.tel);
      $http.post(
        api_root + '/tfa',
        {'phone_number': login.tel})
      .then(
        function (response) {
          $location.path('/tfa')
        },
        function (response) {
          $location.path('/tfa')
        });
    // console.log(login.tel);
  };
})

.controller(
  'TfaCtrl',
  function($scope, $location, $http, Auth, Friends, api_root) {
    $scope.submitTfa = function (tfa) {
      $http.post(
        api_root + '/sessions',
        {'tfa': tfa.code})
      .then(
        function (response) {
          // console.log(response);
          Auth.setSessionId(
            response.data.session_uid);
          Auth.setUserId(
            response.data.user_uid);
          $location.path('/tab/dash');
        },
        function (response) {
          $location.path('/login');
        });
    };
    $scope.resendTfa = function () {
      $location.path('/login');
    };
})

.controller('AddCtrl', function($scope, $location, Friends) {
  $scope.addContact = function (contact) {
    contact.parentId = '0'; // FIXME
    Friends.add(contact);
    $location.path('/tab/friends')
  };
})

.controller('DashCtrl', function($scope, $location, Auth, Friends) {
  $scope.go = function ( path ) {
    $location.path( path );
  };
  Friends.get(Auth.getUserId()).then(
    function (user) {
      console.log(user);
      $scope.user = user;},
    function () {
      $scope.user = {};
    });

})

.controller('FriendsCtrl', function($scope, Auth, Friends) {
  Friends.children(Auth.getUserId()).then(
    function (friends){ $scope.friends = friends; },
    function () { $scope.friends = []; });
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  Friends.get($stateParams.friendId).then(
    function (friend) {
      console.log(friend);
      $scope.friend = friend;},
    function () {
      $scope.friend = {};
    });
})

.controller('AccountCtrl', function($scope) {
});
