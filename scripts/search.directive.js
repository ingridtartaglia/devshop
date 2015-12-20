angular
    .module('app')
    .directive('search', search);

function search() {
    var directive = {
        templateUrl: '/views/search.html',
        restrict: 'E',
        controller: searchCtrl,
        controllerAs: 'search',
        bindToController: true
    };
    return directive;
};

/////

searchCtrl.$inject = ['$scope', 'Developers', 'Organization'];

function searchCtrl($scope, Developers, Organization) {
    var vm = this;
    vm.search = search;

    function search(){
        Organization.getOrganization(vm.organizationName)
        .then(getOrganizationSuccess, getOrganizationError);

        function getOrganizationSuccess(organizationResult){
            vm.organization = organizationResult.data;
            Organization.getOrganizationDevelopers(vm.organizationName)
            .then(function(developersResult){
                vm.organizationNotFound = false;
                vm.developers = developersResult.data;
                vm.developers.forEach(function(developer){
                    developer.price = 10;
                    if (_.find(vm.developersCart, 'login', developer.login)){
                        developer.isAdded = true;
                    }
                });
            })
        }

        function getOrganizationError(){
            vm.organizationNotFound = true;
        }
    }
}
