angular.module('sibbApp')
  .service('models', function () {
    this.Person = function Person(properties) {
      this.id = properties.id;
      this.firstName = properties.firstName;
      this.lastName = properties.lastName;
      this.age = properties.age;
      this.city = properties.city;
      this.email = properties.email;
      this.phoneNumber = properties.phoneNumber;
    };
  })