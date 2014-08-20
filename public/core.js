// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

//define mainController
function mainController($scope, $http) {
	//scope model data empty
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	//make a get request to api via http service
	$http.get('/api/todos')
		.success(function(data) {
			//on success save data to scope and display it
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	//createTodo fcn makes post request with formData
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			//on success, reset the form, update scope data then display on log
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		//make delete request with id
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				//update scope data
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}

