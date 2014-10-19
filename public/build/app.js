angular.module('openTableApp.controllers', []);
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
// -------------------------------------
// Controller for the Create/Update View
// --------------------------------------
angular.module('openTableApp.controllers')
    .controller('ReservationDetailCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams){

      // ------------------------
      // Date properties
      // ------------------------
      // Reservation date is limited to today through 4 weeks from today.
      $scope.minDate = new Date(); // today
      $scope.maxDate = new Date(Date.now() + 1000*60*60*24*7*4); // 4 weeks from today
     
      $scope.today = function() {
        $scope.reservation.date = new Date();
      };

      $scope.clear = function () {
        $scope.date = null;
      };

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
      };

      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 0,
        'show-button-bar': 'false',
        'show-weeks': false
      };


      // ------------------------
      // Time properties
      // ------------------------

      // Assuming this restaurant takes reservations from 6 PM - 10 PM
      var possibleTimes = ['00','15','30','45'];
      var times = [];
      for (var hour = 6; hour < 10; hour++) {
        for (var min = 0; min < possibleTimes.length; min++) {
          times.push("" + hour + ':' + possibleTimes[min] + ' PM');
        }
      }
      times.push("10:00 PM");

      $scope.times = times;

      // ------------------------
      // Submission
      // ------------------------

      $scope.cancel = function ($event){
        $event.preventDefault();
        window.history.back();
      };

      $scope.submit = function (){

        // -----------------------------------
        // Converting date to standard format
        // -----------------------------------
        $scope.reservation.date.setUTCHours(12);
        var dateStr = $scope.reservation.date.getUTCFullYear() + "-";
        var month = ($scope.reservation.date.getUTCMonth() + 1);
        if (month < 10){
          dateStr += "0" + month + "-";
        } else {
          dateStr += month + "-";
        }

        var day = $scope.reservation.date.getUTCDate();
        if (day < 10){
          dateStr += "0" + day;
        } else {
          dateStr += day;
        }
        // ----------------------------------

        $scope.reservation.date = dateStr;
        if ($routeParams.reservationId){
          $http.put('/reservations/' + $routeParams.reservationId, $scope.reservation)
            .success(function () {
              $location.url('/reservations');
            })
            .error(function (){
              console.error("an error occurred trying to update reservation");
            });
        } else {
          $http.post('/reservations', $scope.reservation)
            .success(function() {
              $location.url('/');
            });
        }
      };

      // ------------------------
      // Initialize reservation
      // ------------------------
      if ($routeParams.reservationId){
        $http.get('/reservations/' + $routeParams.reservationId)
          .success(function(data) {
            $scope.action = "Edit";
            data.date = new Date(data.date);
            data.date.setUTCHours(12);
            $scope.reservation = data;
          })
          .error(function(data, status, headers, config) {
            $scope.action = "Create a";
            $scope.reservation = {};
            $scope.today();
            $scope.reservation.time = times[4];
          });
      } else {
        $scope.action = "Create a";
        $scope.reservation = {};
        $scope.today();
        $scope.reservation.time = times[4];
      }
}]);

// -------------------------------------
// Controller for the Table/List View
// --------------------------------------
angular.module('openTableApp.controllers')
    .controller('ReservationsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){

      $scope.categorySelection = ['date','time'];

      $scope.add = function (){
        $location.url('/reservations/new');
      };

      $scope.edit = function (reservation){
        $location.url('/reservations/' + reservation._id);
      };

      $scope.destroy = function (reservation){
        $http.delete('/reservations/' + reservation._id)
          .success(function (){
            console.log("reservation deleted");
            $location.url('/reservations/');
          });

      };

      $http.get('/reservations').success(function(data) {
        $scope.reservations = data;
      });
}]);