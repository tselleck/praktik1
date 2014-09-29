angular.module('sibbApp')
  .service('personService', function (models) {
    var personService = this;

    // Local variables
    var idCounter = 0;
    var getId = function () {
      return idCounter++;
    };

    // "database"
    var data = [
        new models.Person({ id: getId(), firstName: 'Sebastian', lastName: 'Sandberg', age: 29, city: 'Malmö', email: 'debbie@bronx.se', phoneNumber: 0702758674 }),
        new models.Person({ id: getId(), firstName: 'Oliwer', lastName: 'Helsen', age: 28, city: 'Trelleborg', email: 'bear@bronx.se', phoneNumber: 0702998877 }),
        new models.Person({ id: getId(), firstName: 'Erik', lastName: 'Kronberg', age: 27, city: 'Lund', email: 'erich@bronx.se', phoneNumber: 0702665544 }),
        new models.Person({ id: getId(), firstName: 'Björn', lastName: 'Roberg', age: 26, city: 'Malmö', email: 'ollie@bronx.se', phoneNumber: 0702332211 })
    ];

    // EXPOSED functionality
    personService.getAll = function () {
      return data.slice(0);
    };

    personService.get = function (id) {
      // .. get person with id === id
      var foundPerson;

      var filteredData = data.filter(function (person) {
        return person.id === id;
      });
      if (filteredData.length === 1) {
        foundPerson = filteredData[0];
      }
      return new models.Person(foundPerson);

    };

    personService.create = function (person) {
      person.id = getId();
      data.push(person);
      return person.id;
    };

    var merge = function (dest, src) {
      for (var propName in dest) {
        if (dest[propName] !== src[propName]) {
          dest[propName] = src[propName];
        }
      }
    };

    personService.update = function (id, personData) {
      var exPerson = data.filter(function (person) {
        return person.id === id;
      })[0];
      merge(exPerson, personData);
    };

    personService.remove = function (id) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1);
          return true;
        }
      }
      return false;
    };
  });