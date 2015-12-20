angular
    .module('app')
    .directive('cart', cart);

function cart() {
    var directive = {
        templateUrl: '/views/cart.html',
        restrict: 'E',
        controller: cartCtrl,
        controllerAs: 'cart',
        bindToController: {
            developers: '='
        }
    };
    return directive;
};

///

cartCtrl.$inject = ['$scope', 'Developers', 'Organization'];

function cartCtrl($scope, Developers, Organization){
    var vm = this;

    vm.developersCart = Developers;

    vm.clearAll = clearAll;
    vm.remove = remove;
    vm.submit = submit;
    vm.sumSubtotal = sumSubtotal;

    vm.developersCart.$watch(sumSubtotal);

    function clearAll(){
        vm.developersCart.forEach(function(cartDeveloper){
            vm.developersCart.$remove(cartDeveloper);
        });
        vm.developers.forEach(function(developer){
            developer.isAdded = false;
        });
    };

    function remove(cartDeveloper){
        var dev = _.find(vm.developers, 'login', cartDeveloper.login);
        if (dev){
            dev.isAdded = false;
        }
        vm.developersCart.$remove(cartDeveloper);
    };

    function submit(){
        vm.finishOrder = true;
    };

    function sumSubtotal(){
        vm.sum = 0;
        vm.developersCart.forEach(function(developer){
            if (developer.hour != null) {
                vm.sum = vm.sum + (developer.hour * developer.price);
            }
        });
    };

}
