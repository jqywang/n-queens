/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //solution is a matrix where the rook positions are the number 1
  var solutionBoard = new Board({'n': n});
  for (var k = 0; k < n; k++) {
    solutionBoard.rows()[k][k] = 1;
  }
  return solutionBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutionBoard = new Board({'n': n});
  //new recursive function (takes in rookCount and one array row)
  // for loop going thru 1 row
  //  place rook in row at i
  //  if this doesnt pass test, increase by one (go past it, run for loop again)
  //  if it does pass test, call recursive function on next row
  // keep doing it until rooks = n
  // optimizations list: go from has rook conflict to col conflict> full test 112 s
  //
  
  
  
  
  // optimizations
  var recursiveRookCount = function (rookCount, board) {
    for (var i = 0; i < n; i++) {
      board.rows()[rookCount][i] = 1;
      rookCount++;
      if (!board.hasAnyColConflicts()) {
        if (rookCount === n) {
          solutionCount ++;
        } else {
          recursiveRookCount(rookCount, board);
        }
      }
      rookCount --;
      board.rows()[rookCount][i] = 0;
    }
  };
  recursiveRookCount(0, solutionBoard);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
