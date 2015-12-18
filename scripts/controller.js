(function () {
    'use strict';

    angular
        .module('app')
        .controller('DevShopCtrl', DevShopCtrl);

    DevShopCtrl.$inject = ['Developers', 'Organization'];

    function DevShopCtrl(Developers, Organization){
        var vm = this;

        vm.developersCart = Developers;
        vm.errorValidate = false;
        vm.finishOrder = false;
        vm.orderSuccess = false;

        vm.addToCart = addToCart;
        vm.clearAll = clearAll;
        vm.remove = remove;
        vm.search = search;
        vm.shopDevelopers = shopDevelopers;
        vm.submit = submit;
        vm.sumSubtotal = sumSubtotal;
        vm.validate = validate;

        vm.developersCart.$watch(sumSubtotal);

        ////

    	function addToCart(developer){
            developer.hour = 1;
            developer.isAdded = true;
    		vm.developersCart.$add(developer);
    	};

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

        function search(){
            Organization.getOrganization(vm.organizationName)
            .then(function(organizationResult){
    			vm.organization = organizationResult.data;
    			Organization.getOrganizationDevelopers(vm.organizationName)
    			.then(function(developersResult){
    				vm.developers = developersResult.data;
                    vm.developers.forEach(function(developer){
                        developer.price = 10;
                        if (_.find(vm.developersCart, 'login', developer.login)){
                            developer.isAdded = true;
                        }

                    });
    			})
    		});
    	};

        function shopDevelopers(){
            vm.orderSuccess = true;
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

        function validate(){
            if (vm.discountCode === "SHIPTO") {
                vm.sum = vm.sum * 0.7;
                vm.errorValidate = false;
                vm.hideForm = true;
            }
            else {
                vm.errorValidate = true;
            }
        }

    };

})();
