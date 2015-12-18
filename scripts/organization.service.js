(function () {
    'use strict';

    angular
        .module('app')
        .factory('Organization', Organization);

        Organization.$inject = ['$http'];

        function Organization($http){
            var service = {
                getOrganization: getOrganization,
                getOrganizationMembers: getOrganizationMembers
            };
            return service;

            function getOrganization(name){
                var url = "https://api.github.com/orgs/" + name;
                return $http.get(url);
            };

            function getOrganizationMembers(name){
                var url = "https://api.github.com/orgs/" + name + "/members";
                return $http.get(url);
            };
        };

})();


//return {
//             getOrganization: function(name){
//                 var url = "https://api.github.com/orgs/" + name;
//                 return $http.get(url);
//             },
//             getOrganizationMembers: function(name){
//                 var url = "https://api.github.com/orgs/" + name + "/members";
//                 return $http.get(url);
//             }
//         }
