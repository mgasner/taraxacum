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
    console.log(login.tel);
  };
})

.controller(
  'TfaCtrl',
  function($scope, $location, $http, Auth, api_root) {
    $scope.submitTfa = function (tfa) {
      $http.post(
        api_root + '/sessions',
        {'tfa': tfa.code})
      .then(
        function (response) {
          console.log(response);
          Auth.setSessionId(
            response.data.session_uid);
          Auth.setUserId(
            response.data.user_uid);
          $location.path('/tab/dash');
        },
        function (response) {
          $location.path('/login');
        });
      console.log(tfa.code);
    };
    $scope.resendTfa = function () {
      $location.path('/login');
    };
})

.controller('AddCtrl', function($scope, $location, Friends) {
  $scope.addContact = function (contact) {
    contact.parentId = '0'; // FIXME
    Friends.add(contact);
    console.log(contact);
    $location.path('/tab/friends')
  };
})

.controller('DashCtrl', function($scope, $location) {
  $scope.go = function ( path ) {
    $location.path( path );
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.children('0'); // FIXME
  console.log($scope.friends);
  console.log(Friends.all());
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
  $scope.children = Friends.children($stateParams.friendId);
  $scope.nChildren = _.size($scope.children);
  console.log($stateParams.friendId);
  console.log(_.filter(Friends.all(), {'parentId': 1}));
  console.log(_.filter(Friends.all(), ['parentId', 1]));
  console.log(typeof($stateParams.friendId));
  console.log(_.filter(Friends.all(), ['parentId', $stateParams.friendId]));
  console.log(Friends.children($stateParams.friendId));
})

.controller('AccountCtrl', function($scope) {
});
