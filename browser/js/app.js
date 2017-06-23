'use strict';
window.app = angular.module('KaplanAssignment', ['ui.router', 'ui.bootstrap', 'productServices', 'orderServices']);

app.config(function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});
