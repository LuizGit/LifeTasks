angular.module('LifeTask').config([
	'$stateProvider','$urlRouterProvider',
	($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider
			.otherwise(() => '/login');

		$stateProvider
			.state({
				url:  '/login',
				template: '<lifetask-login></lifetask-login>'
			});
	}
]);