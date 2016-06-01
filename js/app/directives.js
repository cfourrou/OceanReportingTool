'use strict';

/* Directives */



angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }
    ])





    .directive('infoDirective', function () {
        return {
            restrict: 'E',
            scope: {
                modalTemplate: '@',
                modalImg: '@',
                message: '=',
                metadataUrl: '@',
                vardata:'@'
            },
            template: '<a href ng-click="show(modalTemplate)" ><div ng-include="" src="modalImg"></div></a>',
            controller: function ($scope, ModalService) {

                $scope.show = function (modalTemplate) {
                    //console.log("show " +$scope.metadataUrl);
                    ModalService.showModal({
                        templateUrl: modalTemplate,
                        controller: "ModalController",
                        inputs: {
                            metaurl: $scope.metadataUrl,
                            myvarData: $scope.vardata

                        }
                    }).then(function (modal) {
                        modal.close.then(function (result) {
                            $scope.message = "You said " + result;

                        });
                    });
                };

            }
        }
    })
    .directive('renewableEnergy', function () {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'partials/RenewableEnergyLeases.html',
            controller: function ($scope, AOI) {
                $scope.AOI = AOI;
            }
        }
    });

