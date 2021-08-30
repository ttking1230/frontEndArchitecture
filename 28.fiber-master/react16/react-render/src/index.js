import React from './react/react'
import ReactDOM from './react-dom/react-dom'

class Ding3 extends React.Component {
  render() {
    return (
      123456
    )
  }
}

class Ding2 extends React.Component {
  componentDidMount() {
    console.log('mounted 22')
  }
  render() {
    return (
      <div>
        <Ding3></Ding3>
      </div>
    )
  }
}

class Ding extends React.Component {
  state = {
    ding: 666
  }
  componentDidMount() {
    console.log('mounted')
  }
  render() {
    return (
      <div class='liubi'>
        <h1 style={{color: 'purple'}}>abc</h1>
        <h2>
          <Ding2 abc={66666}></Ding2>
          <p>{this.state.ding}</p>
        </h2>
        <h3>
          <span></span>
        </h3>
      </div>
    )
  }
}

ReactDOM.render(
  <Ding prop1={666}></Ding>,
  /*
    React.createElement(
      Ding,
      {prop1: 666},
      React.createElement('div', null),
      React.createElement('div', null)
    ),
  */
  /*
    {
      $$typeof: Symbol.for('react.element'),
      type, // type: 'div' | type: Ding
      key,
      props
    }
  */
  document.querySelector('#app')
)
