//import React and Square component
import React from 'react';
import { Square } from './Square';
import { Button } from './Button';

//main board component with game logic
export class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //white goes first
      'isWhite':true,
      //this sets up an empty board
      //"+"" represenets an empty square, "b" is a black stone and "w" is a white stone
      'grid':Array(19).fill().map(x => Array(19).fill("+")),
    };
    //bind this word to helper functions
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  //generate a new empty grid and set it to the grid state with setState
  handleReset(){
    let newGrid = Array(19).fill().map(x => Array(19).fill("+"));
    this.setState({'grid':newGrid});
  }

  handleClick(x, y){
    //only add a peice and check for wins if the clicked square is empty
    if (this.state.grid[x][y] === '+'){
      //we don't want to mutate state directly, so we store the reference to 'grid' in a const
      const g = this.state.grid;
      //set the grid square cooresponding to the clicked square to the color of the current player
      g[x][y] = this.state.isWhite === true ? 'w':'b';
      //set the state with the new grid data
      this.setState({'grid':g, 'isWhite':!this.state.isWhite})

      //helper function for
      function checkDir(x_, y_, color){
        //track how many squares of a given color there are in a given dirention (specified by x_ and y_)
        //for example checkDir(0,1, 'w') checks how many white stones there are in a row to the right )
        let tracked = 0;
        let _x = x;
        let _y = y;
        //stop tracking stones when the color is not equal to the specified stone or we have gone past the edge of the board
        while (g[_x] !== undefined && g[_x][_y] === color){
          //increment the number of tracked stones
          tracked += 1;
          //increment/decrement to check the next square in the specified direction
          _y += y_;
          _x += x_;
        }
        return tracked;
      }
      //sum the directions (left+right, up+down, 2 diagonals)
      const w_horizontal = checkDir(0, 1, 'w') + checkDir(0, -1, 'w') -1;
      const b_horizontal = checkDir(0, 1, 'b') + checkDir(0, -1, 'b') -1;

      const w_vertical = checkDir(1, 0, 'w') + checkDir(-1, 0, 'w') -1;
      const b_vertical = checkDir(1, 0, 'b') + checkDir(-1, 0, 'b') -1;

      const w_diag1 = checkDir(1, 1, 'w') + checkDir(-1, -1, 'w') -1;
      const b_diag1 = checkDir(1, 1, 'b') + checkDir(-1, -1, 'b') -1;

      const w_diag2 = checkDir(1, 1, 'w') + checkDir(-1, -1, 'w') -1;
      const b_diag2 = checkDir(-1, 1, 'b') + checkDir(1, -1, 'b') -1;

      //check to see if there are any sums greater than or equal to 5 and alert the players of a win
      //setTimeout is called so that the alert() function does not hold up the rendering of the board.
      if (w_horizontal >=  5 || w_vertical >=  5 || w_diag1 >=  5 || w_diag2 >=  5){
        setTimeout(()=>{alert('white wins')}, 1);
      }

      if (b_horizontal >= 5 || b_vertical >= 5 || b_diag1 >= 5 || b_diag2 >= 5){
        setTimeout(()=>{alert('black wins')}, 1);
      }
    }
  }
  render(){
    //define styles for the <table> element in the return() function below
    const style={
             textAlign: "center",
             margin:"auto",
             height: "auto",
             width:"500px",
             border:"1px solid black",
             tableLayout:'fixed',
           };
    const g = this.state.grid;
    //loop through the squares in each row and generate a new Square component,
    //passing in props to the Square component in the nested map() function
    const board = g.map((row, i) => { return (
      <tr key={"row_"+i}>
        {row.map((col, j) => {
          //set the color of the square based on state.grid
          const color_ = g[i][j] === '+' ? '#e4e4a1': g[i][j] === 'w' ? 'white':'black';
          //return Square component, passing in the following as props:
          //square color defined above in color_,
          //a value for the key which React needs (I think) and
          //a function to handle clicks with grid coordinates passed in as arguments
          return (
            <Square handleClick={()=>this.handleClick(i,j)} color={color_} key={i+"_"+j} />
              )
            }
          )
        }
      </tr>)
    });

    //returns the board with the Square Components in {board},
    //as well as a simple Button component that takes the handleReset function as a prop
    //this could be further refactored to separate the layout and styling, but it isn't that complicated so I will leave it like this
    return (
      <div style={{ textAlign:'center'}}>
      <h2><a href="https://en.wikipedia.org/wiki/Gomoku" style={{textDecoration:"none"}}>五子棋</a></h2>
      <div style={{margin: 'auto', width:"40%"}}>
      <table cellSpacing="0" style={style}>
        <tbody>
          {board}
        </tbody>
      </table>
      </div>
      <br />
      <Button onClick={this.handleReset} />
      </div>
    )
  }
}
