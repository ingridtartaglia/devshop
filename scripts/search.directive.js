angular
    .module('app')
    .directive('search', search);

function search() {
    var directive = {
        templateUrl: '/views/search.html',
        restrict: 'E',
        controller: searchCtrl,
        controllerAs: 'search',
        bindToController: true
    };
    return directive;
};

/////

searchCtrl.$inject = ['$scope', 'Developers', 'Organization'];

function searchCtrl($scope, Developers, Organization) {
    var vm = this;
    vm.searchOrganization = searchOrganization;
    vm.searchDevelopers = searchDevelopers;

    function searchOrganization(){
        var organization = Organization.get(vm.organizationName);

        organization.then(getOrganizationSuccess, getOrganizationError);

        function getOrganizationSuccess(organizationResult){
            vm.organization = organizationResult.data;
            vm.organizationNotFound = false;
            searchDevelopers(1);
        }

        function getOrganizationError(){
            vm.organizationNotFound = true;
        }
    }

    function searchDevelopers(page){
        vm.organization.getList('members', {per_page:10, page:page})
        .then(function(developersResult){
            vm.developers = developersResult.data;
            vm.pages = parse_link_header(developersResult.headers('link'));
            vm.developers.forEach(function(developer){
                developer.price = 10;
                if (_.find(vm.developersCart, 'login', developer.login)){
                    developer.isAdded = true;
                }
            });
        })
    }

    // from: https://gist.github.com/niallo/3109252
    // vm.pages: {
    //    first
    //    next
    //    prev
    //    last
    // }
    function parse_link_header(header) {
        if (header.length == 0) {
            throw new Error("input must not be of zero length");
        }

        // Split parts by comma
        var parts = header.split(',');
        var links = {};
        // Parse each part into a named link
        _.each(parts, function(p) {
            var section = p.split(';');
            if (section.length != 2) {
                throw new Error("section could not be split on ';'");
            }
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            var page = unescape(url.replace(new RegExp("^(?:.*[&\\?]" + escape('page')
            .replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            links[name] = page;
        });

        return links;
    }
}
