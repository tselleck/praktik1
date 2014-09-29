angular.module('sibbApp')
  .filter('translate', function () {
    var map = {
      firstName: 'First name',
      lastName: 'Last name',
      age: 'Age',
      city: 'City',
      email: 'Email',
      phoneNumber: 'Phonenumber',
      openPerson: 'Open',
      removePerson: 'Remove'
    };

    return function (item) {
      return map[item] || item;
    };
  })