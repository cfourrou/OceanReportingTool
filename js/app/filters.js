'use strict';

/* Filters */

angular.module('ortApp.filters', [])
    .filter('unsafe', function ($sce) {
        return $sce.trustAsHtml;
    })

