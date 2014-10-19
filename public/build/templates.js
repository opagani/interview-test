(function(module) {
try { module = angular.module("opentable-templates"); }
catch(err) { module = angular.module("opentable-templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/reservation-detail.html",
    "<h3>{{action}} reservation</h3>\n" +
    "<form name=\"reservationForm\" ng-submit=\"submit()\">\n" +
    "  <label>First Name:<br/>\n" +
    "    <input type=\"text\" name=\"first_name\" ng-model=\"reservation.first_name\" ng-required=\"true\"/>\n" +
    "  </label><br/>\n" +
    "  <label>Last Name:<br/>\n" +
    "    <input type=\"text\" name=\"last_name\" ng-model=\"reservation.last_name\" ng-required=\"true\"/>\n" +
    "  </label><br/>\n" +
    "  <label>Reservation Date:\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-6\" style=\"width: 202px\">\n" +
    "          <p class=\"input-group\">\n" +
    "            <input type=\"text\" name=\"date\" ng-model=\"reservation.date\" ng-required=\"true\" class=\"form-control\" datepicker-popup=\"yyyy-MM-dd\"  is-open=\"opened\" min=\"minDate\" max=\"maxDate\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "            <span class=\"input-group-btn\">\n" +
    "              <button class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "            </span>\n" +
    "          </p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </label><br/>\n" +
    "  <label>Reservation Time:<br/>\n" +
    "    <select name=\"time\" ng-model=\"reservation.time\" ng-options=\"t for t in times\"></select><br>\n" +
    "  </label><br/>\n" +
    "  <label>Party Size:<br/>\n" +
    "    <input type=\"number\" name=\"party_size\" ng-model=\"reservation.party_size\" ng-required=\"true\"  min=\"1\" max=\"20\"/>\n" +
    "  </label><br/>\n" +
    "  <label>Additional Comments:<br/>\n" +
    "    <input type=\"text\" name=\"comments\" maxlength=\"30\" ng-model=\"reservation.comments\"/>\n" +
    "  </label><br/>\n" +
    "  <input type=\"submit\" value=\"Submit\" class=\"btn btn-primary\"/> <button class=\"btn\" ng-click=\"cancel($event)\"/>Cancel</button>\n" +
    "</form>");
}]);
})();

(function(module) {
try { module = angular.module("opentable-templates"); }
catch(err) { module = angular.module("opentable-templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/reservation-list.html",
    "<div class=\"row\">\n" +
    "  <div class=\"col-xs-3\">\n" +
    "    <button class='btn btn-primary' ng-click=\"add()\" style=\"margin-right:50px\">Add</button>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-6\">\n" +
    "    Search: <input ng-model=\"searchText\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "<br/>\n" +
    "<table class=\"table table-hover\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>First Name</th>\n" +
    "      <th>Last Name</th>\n" +
    "      <th>Date</th>\n" +
    "      <th>Time</th>\n" +
    "      <th>Party</th>\n" +
    "      <th>Comments</th>\n" +
    "      <th></th>\n" +
    "      <th></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"reservation in reservations | filter:searchBy | filter:dateRange | orderBy:categorySelection | filter:searchText\">\n" +
    "      <td>{{reservation.first_name}}</td>\n" +
    "      <td>{{reservation.last_name}}</td>\n" +
    "      <td>{{reservation.date | date:\"EEE MM/dd\"}}</td>\n" +
    "      <td>{{reservation.time}}</td>\n" +
    "      <td>{{reservation.party_size}}</td>\n" +
    "      <td>{{reservation.comments}}</td>\n" +
    "      <td><button class='btn btn-primary' ng-click=\"edit(reservation)\">Edit</button></td>\n" +
    "      <td><button class='btn btn-danger' ng-click=\"showConfirmation = !showConfirmation\" ng-show=\"!showConfirmation\">Delete</button>\n" +
    "        <button class='btn btn-warning' ng-show=\"showConfirmation\" ng-click=\"destroy(reservation)\">Confirm delete</button></td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);
})();
