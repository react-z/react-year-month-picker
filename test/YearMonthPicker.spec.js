import test from 'tape'
import React from 'react'
import YearMonthPicker from '../src/YearMonthPicker'

import { shallow, mount } from 'enzyme'

test('YearMonthPicker component', (t) => {
  const handleChange = date => {
    console.log(date)
  }

  const wrapper = mount(<YearMonthPicker closeOnSelect onChange={handleChange} />)

  t.equal(
    wrapper.props().onChange, handleChange, 'the YearMonthPicker component has an onChange prop'
  )

  t.equal(
    wrapper.props().closeOnSelect, true, 'the YearMonthPicker component closeOnSelect prop can be set'
  )

  t.end()
});
