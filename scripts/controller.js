(function () {
    'use strict';

    angular
        .module('app')
        .controller('DevShopCtrl', DevShopCtrl);

    DevShopCtrl.$inject = ['Developers', 'Organization'];

    function devShopCtrl(Developers, Organization){
        var vm = this;

        vm.addToCart = addToCart;
        vm.clearAll = clearAll;
        vm.remove = remove;
        vm.search = search;
        vm.submit = submit;

        ////

    	function addToCart(developer){
    		Developers.$add(developer);
    	};

        function clearAll(){
    		Developers.forEach(function(developer){
    			Developers.$remove(developer);
    		});
    	};

    	function remove(developer){
    		Developers.$remove(developer);
    	};

        function search(){
            Organization.getOrganization(vm.organizationName)
            .then(function(organizationResult){
    			vm.organization = organizationResult.data;
    			Organization.getOrganizationMembers(vm.organizationName)
    			.then(function(membersResult){
    				vm.members = membersResult.data;
    			})
    		});
    	};

    	function submit(){};

    };

})();
