angular.module('ticketController', [])

	// inject the ticket service factory into our controller
	.controller('mainController', ['$scope','$http','Tickets', function($scope, $http, Tickets) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all tickets and show them
		// use the service to get all the tickets
		Tickets.get()
			.success(function(data) {
				$scope.tickets = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTickets = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Tickets.create($scope.formData)

					// if successful creation, call our get function to get all the new tickets
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.tickets = data; // assign our new list of tickets
					});
			}
		};

		// DELETE ==================================================================
		// delete a ticket after checking it
		$scope.deleteTicket = function(id) {
			$scope.loading = true;

			Tickets.delete(id)
				// if successful creation, call our get function to get all the new tickets
				.success(function(data) {
					$scope.loading = false;
					$scope.tickets = data; // assign our new list of tickets
				});
		};
	}]);
