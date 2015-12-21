angular
    .module('app')
    .directive('devList', devList);

function devList() {
    var directive = {
        templateUrl: '/views/devList.html',
        restrict: 'E',
        controller: devListCtrl,
        controllerAs: 'devList',
        bindToController: {
            developers: '=',
            organizationNotFound: '=',
            searchDevelopers: '=',
            pages: '='
        }
    };
    return directive;
};

/////

devListCtrl.$inject = ['$scope', 'Developers', 'Organization'];

function devListCtrl($scope, Developers, Organization) {
    var vm = this;

    vm.developersCart = Developers;

    vm.addToCart = addToCart;

    function addToCart(developer){
        developer.hour = 1;
        developer.isAdded = true;
        vm.developersCart.$add(developer.plain());
    };

}
