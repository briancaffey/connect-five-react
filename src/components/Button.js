import React from 'react';

export class Button extends React.Component{
  render(){
    return(
      <button className="btn btn-success" style={{ textAlign:'center'}} onClick={this.props.onClick} >Reset</button>
    )
  }
}
