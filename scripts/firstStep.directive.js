angular
    .module('app')
    .directive('firstStep', firstStep);

function firstStep() {
    var directive = {
        templateUrl: '/views/firstStep.html',
        restrict: 'E',
        controller: firstStepCtrl,
        controllerAs: 'vm',
        bindToController: true
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
    vm.search = search;

    function addToCart(developer){
        developer.hour = 1;
        developer.isAdded = true;
        vm.developersCart.$add(developer);
    };

    function search(){
        Organization.getOrganization(vm.organizationName)
        .then(function(organizationResult){
            vm.organization = organizationResult.data;
            Organization.getOrganizationDevelopers(vm.organizationName)
            .then(function(developersResult){
                vm.developers = developersResult.data;
                vm.searchResults = true;
                vm.developers.forEach(function(developer){
                    developer.price = 10;
                    if (_.find(vm.developersCart, 'login', developer.login)){
                        developer.isAdded = true;
                    }

                });
            })
        });
    };

}
