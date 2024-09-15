(function () {
    'use strict';

    angular.module('MenuApp', ['ui.router', 'data'])
    .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'categories.template.html',
                controller: 'CategoriesController as ctrl',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: 'items.template.html',
                controller: 'ItemsController as ctrl',
                resolve: {
                    items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }
})();
