import React from './react/react'
import ReactDOM from './react-dom/react-dom'

class Ding2 extends React.Component {
  componentDidMount() {
    console.log('mounted 22')
  }
  render() {
    return (
      <div>{this.props.abc}</div>
    )
  }
}

class Ding extends React.Component {
  state = {
    ding: 666
  }
  handleClick = () => {
    // this.setState({
    //   yu: 0,
    //   ding: 1
    // })
    // this.setState({
    //   ding: 2
    // })

    // let liubi = document.querySelector('.liubi')
    // liubi.addEventListener('click', (e) => {
    //   console.log(2222)
    // })
  }
  componentDidMount() {
    console.log('mounted')
  }
  render() {
    return (
      <div class='liubi'>
        <h1 style={{color: 'purple'}} onClick={this.handleClick}>abc</h1>
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
