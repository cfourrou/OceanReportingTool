'use strict';

/* Filters */

angular.module('myApp.filters', [])
    .filter('unsafe', function($sce) { return $sce.trustAsHtml; })

