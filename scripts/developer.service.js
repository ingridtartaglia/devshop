(function () {
    'use strict';

    angular
        .module('app')
        .factory('Developers', Developers);

        Developers.$inject = ['$firebaseArray'];

        function Developers($firebaseArray){
            var developersCart = new Firebase("https://devshop.firebaseio.com/developers");
            return $firebaseArray(developersCart);
        };

})();
