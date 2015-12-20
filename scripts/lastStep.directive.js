angular
    .module('app')
    .directive('lastStep', lastStep);

function lastStep() {
    var directive = {
        templateUrl: '/views/lastStep.html',
        restrict: 'E',
        controller: lastStepCtrl,
        controllerAs: 'lastStep',
        bindToController: {
            sum: '='
        }
    };
    return directive;
};

/////

lastStepCtrl.$inject = ['$scope', 'Developers', 'Organization'];

function lastStepCtrl($scope, Developers, Organization) {
    var vm = this;

    vm.developersCart = Developers;
    vm.errorOnValidate = false;
    vm.orderSuccess = false;

    vm.shopDevelopers = shopDevelopers;
    vm.sumSubtotal = sumSubtotal;
    vm.validate = validate;

    vm.developersCart.$watch(sumSubtotal);

    ////

    function shopDevelopers(){
        vm.orderSuccess = true;
    };

    function sumSubtotal(){
        vm.sum = 0;
        vm.developersCart.forEach(function(developer){
            if (developer.hour != null) {
                vm.sum = vm.sum + (developer.hour * developer.price);
            }
        });
    };

    function validate(){
        if (vm.discountCode === "SHIPTO") {
            vm.sum = vm.sum * 0.7;
            vm.errorOnValidate = false;
            vm.hideDiscountForm = true;
        }
        else {
            vm.errorOnValidate = true;
        }
    }

};
