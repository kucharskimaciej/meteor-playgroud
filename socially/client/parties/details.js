(function() {
    angular.module('socially')
        .directive('partyDetails', DetailsComponent)
        .config(($stateProvider) => {
            $stateProvider
                .state('partyDetails',{
                    url: 'parties/:id',
                    templateProvider($stateParams) {
                        return `<party-details id="${$stateParams.id}"></party-details>`;
                    },
                    resolve: {
                        currentUser: ($auth) => {
                            return $auth.requireUser();
                        }
                    }
                });
        });


    function DetailsComponent() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                id: '@'
            },
            controller($scope, $reactive) {
                let vm = this;
                $reactive(vm).attach($scope);
                this.subscribe('parties');

                this.helpers({
                    party: () => {
                        return Parties.findOne({ _id: vm.id });
                    }
                });

                this.save = () => {
                    Parties.update({ _id: vm.party._id }, {
                        $set: {
                            name: vm.party.name,
                            description: vm.party.description,
                            'public': vm.party.public
                        }
                    });
                };
            },
            controllerAs: 'ctrl',
            templateUrl: 'client/parties/details.html'
        }
    }


}());