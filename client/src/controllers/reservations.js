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