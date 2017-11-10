angular.module('treephone.controllers', [])

.controller(
  'LoginCtrl',
  function($scope, $location, $http, Rpc, Auth, api_root) {
    $scope.rpc = Rpc;
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
  function($scope, $location, $http, Rpc, Auth, Friends, api_root) {
    $scope.rpc = Rpc;
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

.controller('AddCtrl', function($scope, $location, Friends, Auth, $anchorScroll) {
  var next, back;
  if ($location.url() == '/tab/add/1') {
    next = '/tab/add/2';
    back = '/tab/friends';
  } else if ($location.url() == '/tab/add/2') {
    next = '/tab/add/3';
    back = '/tab/add/1';
  } else {
    next = '/tab/friends';
    back = '/tab/add/2'
  }

  console.log(Friends.editing);


  $scope.addContact = function (contact) {
    console.log(next);
    Friends.add(contact, Auth.getUserId()).then(
      function (contact) {
        Friends.editing = contact.uid;
        console.log(next);
        $location.path(next); },
      // TODO should pop a modal
      function () { return; }
    )
  };

  $scope.editContact = function (contact) {
    console.log('editing...');
    contact.uid = Friends.editing;
    console.log(contact)
    Friends.edit(contact).then(
      function () { $location.path(next); },
      // TODO should pop a modal
      function () { return; }
    )
  };
})

.controller('DashCtrl', function($scope, $location, Rpc, Auth, Friends) {
  $scope.go = function ( path ) {
    console.log(path);
    $location.path( path );
  };
  
  $scope.rpc = Rpc;

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
  $scope.invite = function () {
    Friends.invite($stateParams.friendId);
    // TODO: pop up a modal
  }
  Friends.get($stateParams.friendId).then(
    function (friend) {
      console.log(friend);
      $scope.friend = friend;
      console.log(friend.phone_number);
      formattedPhone = (
        '(' + friend.phone_number.substring(2, 5) + ') ' +
        friend.phone_number.substring(5, 8) + '-' +
        friend.phone_number.substring(8)
      );
      telephoneLink = (
        'tel:' + friend.phone_number.substring(1, 2) +
        '-' + friend.phone_number.substring(2, 5) + 
        '-' + friend.phone_number.substring(5, 8) +
        '-' + friend.phone_number.substring(8));
      console.log(telephoneLink);
      console.log(formattedPhone);
      $scope.telephoneLink = telephoneLink;
      $scope.formattedPhone = formattedPhone;
    },
    function () {
      $scope.friend = {};
      $scope.telephoneLink = '';
      $scope.formattedPhone = ''
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
