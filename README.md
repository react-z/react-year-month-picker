# react-year-month-picker

A react year month date picker

[![npm version](https://badge.fury.io/js/react-year-month-picker.svg)](https://badge.fury.io/js/react-year-month-picker)

![](https://raw.githubusercontent.com/StevenIseki/react-year-month-picker/master/example/screenshot.gif)

## Install

`npm install react-year-month-picker --save`

## Usage


```jsx
import YearMonthPicker from 'react-year-month-picker'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'

class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { scheduled: null }
  }

  handleChange (m) {
    this.setState({scheduled: m}, () => console.log(this.state.scheduled))
  }

  render () {
    return (
      <div>
        <YearMonthPicker
          closeOnSelect
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

ReactDOM.render(<TestComponent />, document.getElementById('root'))
```

## Props

- `onChange()`

A function called when the date has changed. This is where you typically set or store your date in the parent component.

- `closeOnSelect`

If the year month picker should close on date selection.

## Development
    yarn
    yarn dev

## Test
    yarn test

## Build
    yarn
    yarn build

## Publish
    npm login
    npm version patch
    git add -A
    git push origin master
    npm publish

## License

[MIT](http://isekivacenz.mit-license.org/)
