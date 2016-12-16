angular.module('ticketService', [])

	// super simple service
	// each function returns a promise object
	.factory('Tickets', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/tickets');
			},
			create : function(ticketData) {
				return $http.post('/api/tickets', ticketData);
			},
			delete : function(id) {
				return $http.delete('/api/tickets/' + id);
			}
		}
	}]);
