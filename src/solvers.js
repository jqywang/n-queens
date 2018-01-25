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
  // keep a storage of what columns rooks are in  
  
  var recursiveRookCount = function (currentRow, board, noRooks) {
    noRooks = noRooks || [];
    for (var i = 0; i < n; i++) {
      if (! _.contains(noRooks, i)) {
        board.togglePiece(currentRow, i);
        currentRow++;
        noRooks.push(i);
        if (currentRow === n) {
          solutionCount++;
        } else {
          recursiveRookCount(currentRow, board, noRooks);
        }
        currentRow --;
        noRooks.pop();
        board.togglePiece(currentRow, i);
      }
    }
  };
  recursiveRookCount(0, solutionBoard);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});
  var solutionMatrix;
  
  var recursiveQueenSolution = function (currentRow, board, noQueens) {
    if (solutionMatrix !== undefined) { return; }
    noQueens = noQueens || [];
    for (var i = 0; i < n; i++) {
      if (! _.contains(noQueens, i)) {
        board.togglePiece(currentRow, i);
        currentRow++;
        noQueens.push(i);
        if (!solution.hasAnyMajorDiagonalConflicts() && !solution.hasAnyMinorDiagonalConflicts()) {
          if (currentRow === n) {
            solutionMatrix = board.rows();
            return;
          } else {
            recursiveQueenSolution(currentRow, board, noQueens);
          }
        }
        if (solutionMatrix !== undefined) { return; }
        currentRow --;
        noQueens.pop();
        board.togglePiece(currentRow, i);
      }
    }
  };
  recursiveQueenSolution(0, solution);
  if (solutionMatrix === undefined) {
    var dummySolution = new Board({'n': n });
    return dummySolution.rows();
  }
  return solutionMatrix;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({'n': n});
  
  var recursiveQueenSolution = function (currentRow, board, occupiedColumns) {
    occupiedColumns = occupiedColumns || [];
    for (var i = 0; i < n; i++) {
      board.togglePiece(currentRow, i);
      if (! _.contains(occupiedColumns, i) && board.hasAnyDiagonalConflicts(currentRow, i)) {
        currentRow++;
        occupiedColumns.push(i);
        if (currentRow === n) {
          solutionCount ++;
          // return;
        } else {
          recursiveQueenSolution(currentRow, board, occupiedColumns);
        }
        currentRow --;
        occupiedColumns.pop();
      }
      board.togglePiece(currentRow, i);
    }
  };
  
  
  
  
  
  
  
  
  
  recursiveQueenSolution(0, solution);
  if (n === 0) {
    solutionCount = 1;
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
































