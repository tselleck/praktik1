angular.module('sibbApp')
  .controller('PersonDetailCtrl', function ($routeParams, personService, models) {
    var perId = $routeParams.personId;
    var isCreate = perId === undefined;

    if (isCreate) {
      this.person = new models.Person({});
    } else {
      this.person = personService.get(parseInt(perId, 10));
    }
    this.save = function () {
      if (isCreate) {
        personService.create(this.person);

      } else {
        personService.update(parseInt(perId, 10), this.person);
      }
    };
  })