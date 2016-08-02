'use strict';

/* Directives */


function printDirective() {
    var printSection = document.getElementById("printSection");

    function printElement(elem) {
        // clones the element you want to print
        var domClone = elem.cloneNode(true);
        if (!printSection) {
            printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        } else {
            printSection.innerHTML = "";
        }
        printSection.appendChild(domClone);
    }

    function link(scope, element, attrs) {
        element.on("click", function () {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
                printElement(elemToPrint);
                window.print();
            }
        });
    }

    return {
        link: link,
        restrict: "A"
    };
}


angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }
    ])

    .directive("ngPrint", [printDirective])


    .directive('infoDirective', function () {
        return {
            restrict: 'E',
            scope: {
                modalTemplate: '@',
                modalImg: '@',
                message: '=',
                metadataUrl: '@',
                vardata: '@'
            },
            template: '<a href ng-click="show(modalTemplate)" class="helpbutton" alt="{{vardata}}">{{vardata}}<div ng-if="!vardata" ng-include="" src="modalImg"></div></a>',
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
            templateUrl: 'partials/EM_RenewableEnergyLeases.html',
            controller: function ($scope, AOI) {
                $scope.AOI = AOI;
            }
        }
    })


