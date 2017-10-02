import React from 'react';

export class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      'isWhite':true,
      'grid':Array(19).fill(0).map(x => Array(19).fill("+")),
      'active':true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dims = [parseFloat(500/this.state.grid.length), parseFloat(500/this.state.grid[0].length)]
  }

  handleReset(){
    console.log('reseting');
    let newGrid = Array(19).fill(0).map(x => Array(19).fill("+"));
    this.setState({'grid':newGrid});
  }

  handleClick(x, y){
    if (this.state.grid[x][y] === '+'){
    const g = this.state.grid
    g[x][y] = this.state.isWhite === true ? 'w':'b';
    this.setState({'grid':g, 'isWhite':!this.state.isWhite})
    }

    const g = this.state.grid
    function checkDir(x_, y_, color){
      let tracked = 0;
      let _x = x;
      let _y = y;
      while (g[_x] !== undefined && g[_x][_y] === color){
        _y += y_;
        _x += x_;
        tracked += 1;
      }
      return tracked;
    }

    const w_horizontal = checkDir(0, 1, 'w') + checkDir(0, -1, 'w') -1;
    const b_horizontal = checkDir(0, 1, 'b') + checkDir(0, -1, 'b') -1;

    const w_vertical = checkDir(1, 0, 'w') + checkDir(-1, 0, 'w') -1;
    const b_vertical = checkDir(1, 0, 'b') + checkDir(-1, 0, 'b') -1;

    const w_diag1 = checkDir(1, 1, 'w') + checkDir(-1, -1, 'w') -1;
    const b_diag1 = checkDir(1, 1, 'b') + checkDir(-1, -1, 'b') -1;

    const w_diag2 = checkDir(1, 1, 'w') + checkDir(-1, -1, 'w') -1;
    const b_diag2 = checkDir(-1, 1, 'b') + checkDir(1, -1, 'b') -1;

    if (w_horizontal >=  5 || w_vertical >=  5 || w_diag1 >=  5 || w_diag2 >=  5){
      alert('white wins');
    }

    if (b_horizontal >= 5 || b_vertical >= 5 || b_diag1 >= 5 || b_diag2 >= 5){
      alert('black wins');
    }

  }
  render(){
    const dims = this.dims
    const style={
             textAlign: "center",
             margin:"auto",
             height: "auto",
             width:"auto",
             border:"1px solid black",
             tableLayout:'fixed',

           };
    const g = this.state.grid
    const emptyGrid = g.map((row, i) => {return (
      <tr key={"row_"+i}>
        {row.map((col, j) => {
          const color_ = g[i][j] === '+' ? '#e4e4a1': g[i][j] === 'w' ? 'white':'black';

                             //this.state.isWhite === true ? 'white' : 'black';
          return (
          <td style={{

                  overflow:'hidden',
                  width:100,
                  height:20,
                  backgroundColor:'#e4e4a1',
                  color:'red',
                  boarderColor: 'black',
                  border:".5px solid black"

                }}
              key={"row_"+i+"_col_"+j}
              onClick={()=>{this.handleClick(i,j)}}
              ><div style={{color:color_, border:"1px solid", backgroundColor: color_, borderRadius: "50%", borderColor: color_}}>&nbsp;</div></td>
          )
      }
    )
  }

      </tr>)});


    return (
      <div style={{ textAlign:'center'}}>
      <h2>五子棋</h2>
      <div style={{margin: 'auto', width:"40%"}}>
      <table cellSpacing="0" style={style}>
        <tbody>
          {emptyGrid}
        </tbody>
      </table>
      </div>
      <br />
      <button className="btn btn-success" style={{ textAlign:'center'}} onClick={this.handleReset}>Reset</button>
      </div>
    )
  }
}
