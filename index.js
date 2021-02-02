const screen = document.getElementById('screen');

let arr = [['blue', 'yellow', 'blue', 'blue', 'blue', 'red'], ['yellow', 'yellow', 'red', 'blue', 'blue', 'yellow'], ['blue', 'red', 'red', 'red', 'red', 'blue'], ['yellow', 'yellow', 'red', 'red', 'yellow', 'blue'], ['blue', 'yellow', 'blue', 'red', 'blue', 'yellow']];

//Generate the table
const generateTable = (arr) => {
  for(let i=0; i<arr.length ; i++) {
    let row = document.createElement("tr");
    row.id = `${i}`;
    for(let j=0; j<arr[i].length; j++){
      let col = document.createElement("td");
      col.id = `${i}${j}`;
      col.style.backgroundColor = arr[i][j];
      row.appendChild(col);
    }
    screen.appendChild(row);
  }
}

//click on a cell handledr
screen.addEventListener('click',(e) =>{
  let x= parseInt(e.target.id[0]);
  let y = parseInt(e.target.id[1]);
  changeColor(arr,x,y,'green');
})

// Change the color function
function changeColor(arr, x, y, color) {
  let prevColor = arr[x][y];
  let stack = [[x, y]];

  for (let i = 0; i < stack.length; i++) {
    x = stack[i][0];
    y = stack[i][1];

    stack = stack.concat(getNeighnors(arr, x, y, prevColor));

    //Update DOM Color to this Cell
    let cel = document.getElementById(`${x}${y}`);
    cel.style.backgroundColor = color;
    arr[stack[i][0]][stack[i][1]] = color;
    stack.splice(i, 1);
    i--;
  }

  return arr;
}


// Get all neighbors with the same color
const getNeighnors = (arr, x, y, prevColor)=> {
  let stack = [];
  if (x >= 1) {
    if (arr[x - 1][y] === prevColor && arr[x - 1][y] !== true) {
      stack.push([x - 1, y]);
      arr[x - 1][y] = true;
    }
  }
  if (x < arr.length - 1) {
    if (arr[x + 1][y] === prevColor && arr[x + 1][y] !== true) {
      stack.push([x + 1, y]);
      arr[x + 1][y] = true;
    }
  }
  if (y >= 1) {
    if (arr[x][y - 1] === prevColor && arr[x][y - 1] !== true) {
      stack.push([x, y - 1]);
      arr[x][y - 1] = true;
    }
  }
  if (y < arr[x].length - 1) {
    if (arr[x][y + 1] === prevColor && arr[x][y + 1] !== true) {
      stack.push([x, y + 1]);
      arr[x][y + 1] = true;
    }
  }
  if (x >= 1 && y >= 1) {
    if (arr[x - 1][y - 1] === prevColor && arr[x - 1][y - 1] !== true) {
      stack.push([x - 1, y - 1]);
      arr[x - 1][y - 1] = true;
    }
  }
  if (x >= 1 && y < arr[x].length - 1) {
    if (arr[x - 1][y + 1] === prevColor && arr[x - 1][y + 1] !== true) {
      stack.push([x - 1, y + 1]);
      arr[x - 1][y + 1] = true;
    }
  }
  if (x < arr.length - 1 && y < arr[x].length - 1) {
    if (arr[x + 1][y + 1] === prevColor && arr[x + 1][y + 1] !== true) {
      stack.push([x + 1, y + 1]);
      arr[x + 1][y + 1] = true;
    }
  }
  if (x < arr.length - 1 && y >= 1) {
    if (arr[x + 1][y - 1] === prevColor && arr[x + 1][y - 1] !== true) {
      stack.push([x + 1, y - 1]);
      arr[x + 1][y - 1] = true;
    }
  }
  return stack;
}

generateTable(arr);