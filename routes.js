(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        // Set up the default route
        $urlRouterProvider.otherwise('/');

        // Set up the states
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'categories.template.html', // Updated this line
            controller: 'CategoriesController as ctrl',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'items.template.html', // Updated this line
            controller: 'ItemsController as ctrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }
})();
