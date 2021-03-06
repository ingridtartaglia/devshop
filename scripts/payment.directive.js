angular
    .module('app')
    .directive('payment', payment);

function payment() {
    var directive = {
        templateUrl: '/views/payment.html',
        restrict: 'E',
        controller: paymentCtrl,
        controllerAs: 'payment',
        bindToController: {
            sum: '=',
            finishOrder: '='
        }
    };
    return directive;
};

/////

paymentCtrl.$inject = ['$scope', 'Developers', 'Organization', '$window'];

function paymentCtrl($scope, Developers, Organization, $window) {
    var vm = this;

    vm.developersCart = Developers;
    vm.errorOnValidate = false;
    vm.orderSuccess = false;

    vm.back = back;
    vm.shopAgain = shopAgain;
    vm.shopDevelopers = shopDevelopers;
    vm.sumSubtotal = sumSubtotal;
    vm.validate = validate;

    vm.developersCart.$watch(sumSubtotal);

    ////

    function back(){
        vm.finishOrder = false;
    }

    function shopAgain(){
        $window.location.reload();
        vm.developersCart.forEach(function(cartDeveloper){
            vm.developersCart.$remove(cartDeveloper);
        });
    }

    function shopDevelopers(){
        vm.orderSuccess = true;
    }

    function sumSubtotal(){
        vm.sum = 0;
        vm.developersCart.forEach(function(developer){
            if (developer.hour != null) {
                vm.sum = vm.sum + (developer.hour * developer.price);
            }
        });
    }

    function validate(){
        if (vm.discountCode === "SHIPIT") {
            vm.discount = vm.sum * 0.3;
            vm.errorOnValidate = false;
            vm.hideDiscountForm = true;
        }
        else {
            vm.errorOnValidate = true;
        }
    }

};
