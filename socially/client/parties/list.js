(function() {
    angular.module('socially')
        .controller('PartiesListController', PartiesListController)
        .directive('partiesList', function() {
            return {
                restrict: 'E',
                controller: 'PartiesListController',
                controllerAs: 'ctrl',
                templateUrl: 'client/parties/list.html',
                scope: {}
            };
        })
        .config(function($stateProvider) {
            $stateProvider
                .state('parties', {
                    url: '/parties',
                    template: '<parties-list></parties-list>'
                });
        });



    function PartiesListController($scope, $reactive) {
        var vm = this;
        $reactive(this).attach($scope);
        this.subscribe('parties');

        vm.newParty = {};

        this.helpers({
            parties: function() {
                return Parties.find({});
            }
        });

        this.addParty = function() {
            this.newParty.owner = Meteor.userId();
            Parties.insert(vm.newParty);
            vm.newParty = {};
        };

        this.removeParty = function(party) {
            Parties.remove({ _id: party._id });
        }
    }
}());