'use strict';

var app = angular.module("myApp",[]);

app.controller("AddCtrl", function($scope, $http) {
   // Defining the required variables
   // Using Moment to set the time to midnight, and then generate the current start date for the calendar’s initial month
   $scope.day = moment();
   // Getting all the tenants and storing them into temp
   $http.get("http://localhost:3000/tenant")
       .then(function (response) {
          $scope.temp = response.data;
       });

   // defining the reserve function.
   // This function is triggered when the user clicks the Confirm Stay button. This function pushes the newly added elements into the temp array.
   // It first checks that multiple reservations under the same name and time doesn't exists. After these checks, it pushes the input data into the temp array
   $scope.reserve = function () {
      var exist = false;
      for (var i = 0;i < $scope.temp.length; i++){
         if ($scope.temp[i].tennantName == $scope.tenantname && $scope.temp[i].time == $scope.day.unix()){
            exist = true;
            break;
         }
      };
      if(!exist && $scope.tenantname.length >= 0){
         $scope.temp.push({
            "tennantName": $scope.tenantname,
            "time": $scope.day.unix(),
            "reserved": true
         });
      }

      // Here it makes the value reserved equal to true and posts the input data to the backend.
      $http.post(
          "http://localhost:3000/reserve",
          {
             "tennantName": $scope.tenantname,
             "time": $scope.day.unix(),
             "reserved": true
          }).success(Success).error(Fail);
   };

   // This function is used to cancel the reservations
   // It takes name and time as the parameters where name = name of the tenant and time = the time at which the reservation was made
   // It first finds the reservation made under the name and time and then splices it out of the temp array
   // Finally it posts it to the backend changing the value of reserved to false
   $scope.cancel = function (name,time) {
      var tempo = false;
      for (var i = 0;i < $scope.temp.length; i++){
         if ($scope.temp[i].tennantName == name && $scope.temp[i].time == time){
            tempo=i;
            break;
         }
      }
      if (tempo !== false){
         $scope.temp.splice(tempo,1);
         $http.post(
             "http://localhost:3000/reserve",
             {
                "tennantName": name,
                "time": time,
                "reserved": false
             }).success(Success).error(Fail);
      }
   };
   // functions to handle indicate whether the backend calls were a success or a failure
   var Success = function (){
      console.log("successful");
   };
   var Fail = function (){
      console.log("successful");
   };
});


// Directive for the calendar
app.directive("calendar", function() {
   return {

      restrict: "E",
      templateUrl: "template/calendar.html",
      scope: {
         selected: "="
      },

      link: function(scope) {
         scope.selected = _removeTime(scope.selected || moment());
         scope.month = scope.selected.clone();

         var start = scope.selected.clone();
         start.date(1);
         _removeTime(start.day(0));

         _buildMonth(scope, start, scope.month);

         // selecting a day
         scope.select = function(day) {
            scope.selected = day.date;
         };
         
         //previous and next methods increments and decrements month and rebuilds the current month 
         scope.next = function() {
            var next = scope.month.clone();
            _removeTime(next.month(next.month()+1).date(1));
            scope.month.month(scope.month.month()+1);
            _buildMonth(scope, next, scope.month);
         };

         scope.previous = function() {
            var previous = scope.month.clone();
            _removeTime(previous.month(previous.month()-1).date(1));
            scope.month.month(scope.month.month()-1);
            _buildMonth(scope, previous, scope.month);
         };
      }
   };

   // 
   function _removeTime(date) {
      return date.day(0).hour(0).minute(0).second(0).millisecond(0);
   }

   // This function creates month by setting a list of weeks on the given scope
   function _buildMonth(scope, start, month) {
      scope.weeks = [];
      var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
      while (!done) {
         scope.weeks.push({ days: _buildWeek(date.clone(), month) });
         date.add(1, "w");
         done = count++ > 2 && monthIndex !== date.month();
         monthIndex = date.month();
      }
   }

   // This function creates weeks by setting a list of days
   function _buildWeek(date, month) {
      var days = [];
      for (var i = 0; i < 7; i++) {
         days.push({
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date
         });
         date = date.clone();
         date.add(1, "d");
      }
      return days;
   }
});

