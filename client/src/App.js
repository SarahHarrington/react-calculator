import React, { Component } from 'react';
import './App.css';
import {Button} from './components/Button';
import {Input} from './components/Input';
import {ClearButton} from './components/ClearButton';
import {History} from './components/History';
// import * as math from 'mathjs';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');


socket.on('newClientConnected', () => {
  console.log('a new client connected');
})

socket.on('completeCalc', (string) => {
  console.log(string);
})

socket.on('result', result => {
  console.log(result)
})

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      result: "",
      history: []
    }
  }

  addToInput = val => {
    this.setState({input: this.state.input + val});
  }

  handleEqual = () => {
    socket.emit('doTheMath', this.state.input);
    // this.setState({input: math.eval(this.state.input)});
    // this.setState({history: [...this.state.history, this.state.input]});
  }

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input}> </Input>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({input: ""})}>Clear</ClearButton>
          </div>
        </div>
        <History />
      </div>
    );
  }
}

export default App;
