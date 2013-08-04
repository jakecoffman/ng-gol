var app = angular.module("gol", []);

app.controller("GolCtl", function($scope){
	$scope.sizeOfBoard = 12;

	$scope.newRandomBoard = function(){
		var newBoard = [];
		for(var i=0; i<$scope.sizeOfBoard; i++){
			newBoard[i] = [];
			for(var j=0; j<$scope.sizeOfBoard; j++){
				newBoard[i][j] = Math.random() > 0.5;
			}
		}
		$scope.board = newBoard;
	};

	$scope.flip = function(x, y){
		$scope.board[x][y] = !$scope.board[x][y];
	};

	$scope.tick = function(){
		var newBoard = [];
		for(var i=0; i<$scope.sizeOfBoard; i++){
			newBoard[i] = [];
			for(var j=0; j<$scope.sizeOfBoard; j++){
				newBoard[i][j] = result($scope.board, i, j, $scope.sizeOfBoard);
			}
		}
		$scope.board = newBoard;
	}

	$scope.newRandomBoard();
});

var result = function(board, x, y, n){
	var sum = 0;
	// N S E W
	if(y - 1 >= 0)
		sum += board[x][y-1];
	if(x - 1 >= 0)
		sum += board[x-1][y];
	if(y + 1 < n)
		sum += board[x][y+1];
	if(x + 1 < n)
		sum += board[x+1][y];

	// Diagon Alley
	if(y - 1 >= 0 && x - 1 >= 0)
		sum += board[x-1][y-1];
	if(y - 1 >= 0 && x + 1 < n)
		sum += board[x+1][y-1];
	if(y + 1 < n && x - 1 >= 0)
		sum += board[x-1][y+1];
	if(y + 1 < n && x + 1 < n)
		sum += board[x+1][y+1];

	return (sum == 3 || (sum == 2 && board[x][y] == 1))? 1: 0
};