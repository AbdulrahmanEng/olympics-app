import angular from 'angular'
import 'angular-ui-router';

angular.module('olympics', ['ui.router'])
.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/sports')

	$stateProvider
	.state('sports', {
		url: '/sports',
		templateUrl: 'sports/sports-nav.html',
		resolve: {
			sportsService: function($http){
				return $http.get('/sports');
			}
		},
		controller: function (sportsService) {
			this.sports = sportsService.data;
		},
		controllerAs: 'sportsCtrl'
	})
	.state('sports.medals', {
		url: '/:sportName',
		templateUrl: 'sports/sports-medals.html',
		resolve: {
			sportService: function($q){
				return $q((resolve, reject) => {
					let sport = {
						"name": "Equestrian",
						"goldMedals": [
						{
							"division": "Individual jumping",
							"country": "Switzerland",
							"year": 2020
						},
						{
							"division": "Individual eventing",
							"country": "Japan",
							"year": 2020
						}]
					};
					resolve({data: sport});
				})
			}
		},
		controller: function(sportService){
			this.sport = sportService.data;
		},
		controllerAs: 'sportCtrl'
	})
})
