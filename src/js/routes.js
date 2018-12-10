angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('authentification', {
    url: '/page1',
    templateUrl: 'templates/authentification.html',
    controller: 'authentificationCtrl'
  })

  .state('nFCConnect', {
    url: '/page2',
    templateUrl: 'templates/nFCConnect.html',
    controller: 'nFCConnectCtrl'
  })

  .state('nFC', {
    url: '/page3',
    templateUrl: 'templates/nFC.html',
    controller: 'nFCCtrl'
  })

  .state('infos', {
    url: '/page5',
    templateUrl: 'templates/infos.html',
    controller: 'infosCtrl'
  })

$urlRouterProvider.otherwise('/page1')


});