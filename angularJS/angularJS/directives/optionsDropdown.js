angular.module('sibbApp')
  .directive('optionsDropdown', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/optionsDropdown.html',
      scope: {
        actions: '=',
        itemId: '@'
      },
      controllerAs: 'ddCtrl',
      controller: function DropdownCtrl($scope) {
        var ddCtrl = this;

        ddCtrl.actions = $scope.actions;
        ddCtrl.itemId = $scope.itemId;

        ddCtrl.status = {
          isopen: false
        };

        ddCtrl.toggled = function (open) {
          console.log('Dropdown is now: ', open);
        };

        ddCtrl.toggleDropdown = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.status.isopen = !$scope.status.isopen;
        };
      }
    };
  })