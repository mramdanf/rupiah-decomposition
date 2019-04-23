import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../utils/testUtils'
import InputBox from './InputBox'

const defaultProps = { submitRupiah: () => {} }

const setup = (initialProps={}) => {
  const setupProps = { ...defaultProps, ...initialProps }
  return shallow(<InputBox {...setupProps} />)
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-input-box')
    expect(component.length).toBe(1)
  })
  test('renders input instructions with non-empty text', () => {
    const instructions = findByTestAttr(wrapper, 'input-instructions')
    expect(instructions.text().length).not.toBe(0)
  })
  test('renders input rupiah', () => {
    const inputRupiah = findByTestAttr(wrapper, 'input-rupiah')
    expect(inputRupiah.length).toBe(1)
  })
  test('renders submit button', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.length).toBe(1)
  })
})
describe('submit button click', () => {
  let submitRupiahMock
  let inputRupiah = 1000
  beforeEach(() => {
    submitRupiahMock = jest.fn()
    const props = {
      submitRupiah: submitRupiahMock
    }
    const wrapper = setup(props)

    wrapper.instance().inputRupiah.current = { value: inputRupiah }

    const submitButton = findByTestAttr(wrapper, 'submit-button')
    submitButton.simulate('click', { preventDefault() {} })
  })
  test('calls `submitRupiahProps`', () => {
    expect(submitRupiahMock.mock.calls.length).toBe(1)
  })
  test('calls `submitRupiahProps` with input rupiah value as arguments', () => {
    const submitRupiahPropArgs = submitRupiahMock.mock.calls[0][0]
    expect(submitRupiahPropArgs).toBe(inputRupiah)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(InputBox, defaultProps)
})
