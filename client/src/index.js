var openTableApp = angular.module('openTableApp', ['ngRoute', 'ui.bootstrap', 'ui.utils', 
        'openTableApp.controllers','opentable-templates'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/reservations', {
      templateUrl: 'partials/reservation-list.html',
      controller: 'ReservationsCtrl'
    }).
    when('/reservations/new', {
      templateUrl: 'partials/reservation-detail.html',
      controller: 'ReservationDetailCtrl'
    }).
    when('/reservations/:reservationId', {
      templateUrl: 'partials/reservation-detail.html',
      controller: 'ReservationDetailCtrl'
    }).
    otherwise({
      redirectTo: '/reservations'
    });
}]);