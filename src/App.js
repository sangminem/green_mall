import React, { Component } from 'react'
import './App.css';
export default class App extends Component {
  state = {
    id : "",
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  submitId = ()=>{
    const post ={
      plzid : this.state.id,
    };
   
    fetch("http://localhost:3001/idplz", {
      method : "post", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(post),
    });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} name ="id"/>
        <button onClick = {this.submitId}>Submit</button>
        <h1>{this.state.id}</h1>
      </div>
    )
  }
}