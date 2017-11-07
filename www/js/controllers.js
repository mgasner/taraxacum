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
    };
    $scope.resendTfa = function () {
      $location.path('/login');
    };
})

.controller('AddCtrl', function($scope, $location, Friends, Auth) {
  $scope.addContact = function (contact) {
    Friends.add(contact, Auth.getUserId()).then(
      function () { $location.path('/tab/friends'); },
      function () { $location.path('/tab/friends'); }
    )
  };
})

.controller('DashCtrl', function($scope, $location, Auth, Friends) {
  $scope.go = function ( path ) {
    console.log(path);
    $location.path( path );
  };
  console.log('getting user...');
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

.controller('AccountCtrl', function($scope, $location) {
  $scope.go = function ( path ) {
    console.log(path);
    $location.path( path );
  };
})

.controller('AccountDetailCtrl', function ($scope, $location, Auth, Friends) {
  $scope.editContact = function (contact) {
    Friends.edit(contact).then(
      function () { $location.path('/tab/account'); },
      function () { $location.path('/tab/account'); }
    )
  };
  console.log('getting user...');
  Friends.get(Auth.getUserId()).then(
    function (user) {
      console.log(user);
      $scope.contact = user;},
    function () {
      console.log("Couldn't fetch user");
      $scope.contact = {};
    });
})

.controller('DeleteCtrl', function ($scope, $location, Auth, Friends) {
  $scope.delete = function () {
    Friends.delete(Auth.getUserId()).then(
      function () { $location.path('/login'); },
      function () { $location.path('/login'); }
    )
  };

  $scope.cancel = function () { $location.path('/tab/account'); }
})

.controller('CsvCtrl', function ($scope, $location, Auth, Friends) {
  $scope.requestCsv = function (contact) {
    Friends.edit(contact).then(
      function () { Friends.csv(contact.uid).then(
        function () { $location.path('/tab/account'); },
        function () { $location.path('/tab/account'); }
      )},
      function () { $location.path('/tab/account'); })
  };
  
  $scope.cancel = function () { $location.path('/tab/account'); }
  console.log('getting user...');
  Friends.get(Auth.getUserId()).then(
    function (user) {
      console.log(user);
      $scope.contact = user;},
    function () {
      console.log("Couldn't fetch user");
      $scope.contact = {};
    });

  });
