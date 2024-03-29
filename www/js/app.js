// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module(
  'treephone',
  ['ionic',
   'ngResource',
   'treephone.controllers',
   'treephone.services',
   'LocalStorageModule',
   'angularPromiseButtons',
   'angularSpinner'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('_', window._)

.factory('httpServiceUnavailableInterceptor', function($q, $injector) {
  return {
    'responseError': function (response) {
      if (response.status === 503) {
        return $timeout(function () {
          var $http = $injector.get('$http');
          return $http(response.config);
        }, 750)
      }
      return $q.reject(response);
    }
  }
})
// config parameters

.constant(
  'api_root',
  'https://dandelion-phonetree.herokuapp.com')

.config(function($httpProvider) {
  $httpProvider.interceptors.push('httpServiceUnavailableInterceptor');
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })

    .state('tfa', {
      url: "/tfa",
      templateUrl: "templates/tfa.html",
      controller: 'TfaCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.add', {
      url: '/add/1',
      views: {
        'tab-add': {
          templateUrl: 'templates/tab-add-1.html',
          controller: 'AddCtrl'
        }
      }
    })

    .state('tab.add-2', {
      url: '/add/2',
      views: {
        'tab-add': {
          templateUrl: 'templates/tab-add-2.html',
          controller: 'AddCtrl'
        }
      }
    })

    .state('tab.add-3', {
      url: '/add/3',
      views: {
        'tab-add': {
          templateUrl: 'templates/tab-add-3.html',
          controller: 'AddCtrl'
        }
      }
    })

    .state('tab.add-4', {
      url: '/add/4',
      views: {
        'tab-add': {
          templateUrl: 'templates/tab-add-4.html',
          controller: 'AddCtrl'
        }
      }
    })

    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })

    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('tab.detail', {
      url: '/detail',
      views: {
        'tab-account': {
          templateUrl: 'templates/account-detail.html',
          controller: 'AccountDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    
    .state('tab.delete', {
      url: '/delete',
      views: {
        'tab-account': {
          templateUrl: 'templates/delete-confirm.html',
          controller: 'DeleteCtrl'
        }
      }
    })

    .state('tab.csv', {
      url: '/csv',
      views: {
        'tab-account': {
          templateUrl: 'templates/send-csv.html',
          controller: 'CsvCtrl'
        }
      }
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

