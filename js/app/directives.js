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
                message: '='
            },
            template: '<a href ng-click="show(modalTemplate)"><div ng-include="" src="modalImg"></div></a>',
            controller: function ($scope, ModalService) {

                $scope.show = function (modalTemplate) {
                    ModalService.showModal({
                        templateUrl: modalTemplate,
                        controller: "ModalController"
                    }).then(function (modal) {
                        modal.close.then(function (result) {
                            $scope.message = "You said " + result;
                        });
                    });
                };

            }
        }
    })
;

