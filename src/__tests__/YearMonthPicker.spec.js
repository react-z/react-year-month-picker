/* setup enzyme */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

/* setup jsdom */
var jsdom = require('jsdom')
const { JSDOM } = jsdom
const window = new JSDOM('').window
global.window = window
global.document = window.document

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import YearMonthPicker from '../YearMonthPicker'

test('YearMonthPicker renders correctly and matches snapshot', () => {
  const handleChange = jest.fn()
  const handleClick = jest.fn()
  const component = renderer.create(
    <YearMonthPicker
      closeOnSelect
      onChange={handleChange}
      onClick={handleClick}
    />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('YearMonthPicker renders the correct elements', () => {
  const handleChange = jest.fn()
  const handleClick = jest.fn()
  const wrapper = shallow(
    <YearMonthPicker
      closeOnSelect
      onChange={handleChange}
      onClick={handleClick}
    />
  )
  expect(wrapper.find('.input').length).toEqual(1)
  wrapper
    .find('.input')
    .props()
    .onClick()
  /* console.log(wrapper.debug()) */
  expect(wrapper.find('.year-month').length).toEqual(1)
  expect(wrapper.find('.year-month .column').length).toEqual(12)
  expect(
    wrapper
      .find('.year-month .column')
      .first()
      .text()
  ).toContain('Jan')
  expect(wrapper.find('.year-month-wrapper').length).toEqual(1)
})
