(function () {
    'use strict';

    angular
        .module('app')
        .factory('Organization', Organization);

        Organization.$inject = ['Restangular'];

        function Organization(Restangular){
            return Restangular.withConfig(function(RestangularConfigurer) {
                RestangularConfigurer
                .setBaseUrl('https://api.github.com')
                .setRestangularFields({
                    id: "name"
                })
                .setFullResponse(true);
            }).all('orgs');
        };

})();
