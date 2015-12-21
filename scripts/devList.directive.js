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
        developer.get().then(function(res){
            developer = angular.extend(developer, res.data);
            var dev = developer.plain();

            var price = (5*developer.followers+2*developer.public_repos+developer.public_gists)/30;
            if(price < 5){
                price = 5;
            }
            dev.price = price;
            developer.price = price;

            dev.hour = 1;
            dev.isAdded = true;
            developer.isAdded = true;

            vm.developersCart.$add(dev);
        })
    };

}
