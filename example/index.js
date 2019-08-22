import YearMonthPicker from '../src/YearMonthPicker'
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
          // currentYearMonth
          defaultYear = {2018}
          defaultMonth = {3}
          minYear = {2015}
          maxYear = {2030}
          closeOnSelect
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

ReactDOM.render(<TestComponent />, document.getElementById('root'))
