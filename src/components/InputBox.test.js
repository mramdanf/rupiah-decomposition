import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../utils/testUtils'
import { calcuateDecomposeRupiah } from '../utils/appUtils'
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
  describe('mocking submitRupiahCall', () => {
    let submitRupiahMock
    beforeEach(() => {
      submitRupiahMock = jest.fn()
      const props = {
        submitRupiah: submitRupiahMock
      }
      const wrapper = setup(props)

      wrapper.instance().inputRupiah.current = { value: 1000 }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })
    })
    test('calls `submitRupiahProps`', () => {
      expect(submitRupiahMock.mock.calls.length).toBe(1)
    })
    test('calls `submitRupiahProps` with non-empty arguments', () => {
      const submitRupiahPropArgs = submitRupiahMock.mock.calls[0]
      expect(submitRupiahPropArgs.length).toBe(2)
    })
  })
  describe('calcuate decomposition', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup()
    })
    test('decompose 15000 rupiah', () => {
      let inputRupiah = 15000

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const decomposeResult = calcuateDecomposeRupiah(inputRupiah)
      expect(wrapper.instance().state.decomposeResult).toEqual(decomposeResult)
    })
    test('decompose 12510 rupiah', () => {
      let inputRupiah = 12510
      
      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const decomposeResult = calcuateDecomposeRupiah(inputRupiah)
      expect(wrapper.instance().state.decomposeResult).toEqual(decomposeResult)
    })
  })
  describe('inputRupiah validation error', () => {
    let wrapper,
        expectedErrorMsg
    beforeEach(() => {
      wrapper = setup()
      expectedErrorMsg = 'Invalid input rupiah'
    })
    test('generate `Invalid input rupiah` error message with input value `17,500`', () => {
      let inputRupiah = '17,500'

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })
      
      expect(wrapper.instance().state.inputRupiahErrorMsg).toBe(expectedErrorMsg)
    })
    test('generate `Invalid input rupiah` error message with input value `2 500`', () => {
      let inputRupiah = '2 500'

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(wrapper.instance().state.inputRupiahErrorMsg).toBe(expectedErrorMsg)
    })
    test('generate `Invalid input rupiah` error message with input value `3000 Rp`', () => {
      let inputRupiah = '3000 Rp'

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(wrapper.instance().state.inputRupiahErrorMsg).toBe(expectedErrorMsg)
    })
    test('generate `Invalid input rupiah` error message when there is no number inside input value', () => {
      let inputRupiah = 'Rp'

      wrapper.instance().inputRupiah.current = { value: inputRupiah }
      
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(wrapper.instance().state.inputRupiahErrorMsg).toBe(expectedErrorMsg)
    })
  })
  describe('inputRupiah validation success and inputRupiah parsing', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup()
    })
    test('get `18215` with input `18.215`', () => {
      let inputRupiah = '18.215'
      const expectedParsedInput = 18215

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(wrapper.instance().state.inputRupiahValue).toBe(expectedParsedInput)
    })
    test('get `17500` with input `Rp17500`', () => {
      let inputRupiah = 'Rp17500'
      const expectedParsedInput = 17500

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(wrapper.instance().state.inputRupiahValue).toBe(expectedParsedInput)
    })
    test('get `17500` with input `Rp17.500,00`', () => {
      let inputRupiah = 'Rp17.500,00'
      const expectedParsedInput = 17500

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(wrapper.instance().state.inputRupiahValue).toBe(expectedParsedInput)
    })
    test('get `120325` with input `Rp 120.325`', () => {
      let inputRupiah = 'Rp 120.325'
      const expectedParsedInput = 120325

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })
      
      expect(wrapper.instance().state.inputRupiahValue).toBe(expectedParsedInput)
    })
    test('get `5000` with input `005.000`', () => {
      let inputRupiah = '005.000'
      const expectedParsedInput = 5000

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })
      
      expect(wrapper.instance().state.inputRupiahValue).toBe(expectedParsedInput)
    })
    test('get `1000` with input `001000`', () => {
      let inputRupiah = '001000'
      const expectedParsedInput = 1000

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(wrapper.instance().state.inputRupiahValue).toBe(expectedParsedInput)
    })
  })

})
test('does not throw warning with expected props', () => {
  checkProps(InputBox, defaultProps)
})
