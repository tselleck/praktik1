angular.module('sibbApp')
  .controller('PersonListCtrl', function ($scope, $location, personService) {
    var listCtrl = this;

    function Column(properties) {
      this.name = properties.name;
      this.sort = properties.sort || function defaultSort(a, b) {
        return a < b;
      }
    }

    listCtrl.actions = {
      open: {
        name: 'openPerson',
        exec: function (id) {
          var loc = 'detail/' + id;
          $location.path(loc);
        }
      },
      remove: {
        name: 'removePerson',
        exec: function (id) {
          personService.remove(parseInt(id, 10));
          listCtrl.persons = personService.getAll();
        }
      }
    };

    listCtrl.columns = [
        new Column({ name: 'firstName' }),
        new Column({ name: 'lastName' }),
        new Column({ name: 'age' }),
        new Column({ name: 'city' }),
        new Column({ name: 'email' }),
        new Column({ name: 'phoneNumber' })
    ];

    listCtrl.persons = personService.getAll();
  })