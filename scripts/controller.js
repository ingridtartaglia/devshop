(function () {
    'use strict';

    angular
        .module('app')
        .controller('DevShopCtrl', DevShopCtrl);

    DevShopCtrl.$inject = ['Developers', 'Organization'];

    function DevShopCtrl(Developers, Organization){
        var vm = this;

        vm.developersCart = Developers;

        vm.addToCart = addToCart;
        vm.clearAll = clearAll;
        vm.remove = remove;
        vm.search = search;
        vm.submit = submit;

        ////

    	function addToCart(developer){
    		vm.developersCart.$add(developer);
    	};

        function clearAll(){
    		vm.developersCart.forEach(function(developer){
    			vm.developersCart.$remove(developer);
    		});
    	};

    	function remove(developer){
    		vm.developersCart.$remove(developer);
    	};

        function search(){
            Organization.getOrganization(vm.organizationName)
            .then(function(organizationResult){
    			vm.organization = organizationResult.data;
    			Organization.getOrganizationDevelopers(vm.organizationName)
    			.then(function(developersResult){
    				vm.developers = developersResult.data;
    			})
    		});
    	};

    	function submit(){};

    };

})();
