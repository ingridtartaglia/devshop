angular
    .module('app')
    .directive('firstStep', firstStep);

function firstStep() {
    var directive = {
        templateUrl: '/views/firstStep.html',
        restrict: 'E',
        controller: firstStepCtrl,
        controllerAs: 'firstStep',
        bindToController: {
            developers: '='
        }
    };
    return directive;
};

/////

firstStepCtrl.$inject = ['$scope', 'Developers', 'Organization'];

function firstStepCtrl($scope, Developers, Organization) {
    var vm = this;

    vm.developersCart = Developers;
    vm.searchResults = false;

    vm.addToCart = addToCart;

    function addToCart(developer){
        developer.hour = 1;
        developer.isAdded = true;
        vm.developersCart.$add(developer);
    };

}
