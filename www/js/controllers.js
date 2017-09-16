angular.module('treephone.controllers', [])

.controller('LoginCtrl', function($scope, $location) {
  $scope.submitLogin = function(login) {
    console.log(login.tel);
    $location.path('/tfa');
  };
})

.controller('TfaCtrl', function($scope, $location) {
  $scope.submitTfa = function (tfa) {
    console.log(tfa.code);
    $location.path('/tab/dash')
  };
  $scope.resendTfa = function () {
    console.log('Resending Tfa...');
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
