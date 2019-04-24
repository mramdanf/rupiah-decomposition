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
    test('calls `submitRupiahProps` with two arguments', () => {
      const submitRupiahPropArgs = submitRupiahMock.mock.calls[0]
      expect(submitRupiahPropArgs.length).toBe(2)
    })
  })
  describe('calcuate decomposition', () => {
    let wrapper,
        submitRupiahMock
    beforeEach(() => {
      submitRupiahMock = jest.fn()
      const props = {
        submitRupiah: submitRupiahMock
      }
      wrapper = setup(props)
    })
    test('decompose 15000 rupiah', () => {
      let inputRupiah = 15000

      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const expectedDocompose = '1 x Rp10000, 1 x Rp5000'
      const resultDecompose = submitRupiahMock.mock.calls[0][0]

      expect(resultDecompose).toBe(expectedDocompose)
    })
    test('decompose 18.215 rupiah', () => {
      let inputRupiah = '18.215'
      
      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const expectedDocompose = '1 x Rp10000, 1 x Rp5000, 1 x Rp2000, 1 x Rp1000, 2 x Rp100, left Rp15'
      const resultDecompose = submitRupiahMock.mock.calls[0][0]

      expect(resultDecompose).toBe(expectedDocompose)
    })
    test('decompose Rp17500 rupiah', () => {
      let inputRupiah = 'Rp17500'
      
      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const expectedDocompose = '1 x Rp10000, 1 x Rp5000, 1 x Rp2000, 1 x Rp500'
      const resultDecompose = submitRupiahMock.mock.calls[0][0]

      expect(resultDecompose).toBe(expectedDocompose)
    })
    test('decompose Rp 120.325 rupiah', () => {
      let inputRupiah = 'Rp 120.325'
      
      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const expectedDocompose = '1 x Rp100000, 1 x Rp20000, 3 x Rp100, left Rp25'
      const resultDecompose = submitRupiahMock.mock.calls[0][0]

      expect(resultDecompose).toBe(expectedDocompose)
    })
    test('decompose 005.000 rupiah', () => {
      let inputRupiah = '005.000'
      
      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const expectedDocompose = '1 x Rp5000'
      const resultDecompose = submitRupiahMock.mock.calls[0][0]

      expect(resultDecompose).toBe(expectedDocompose)
    })
    test('decompose 001000 rupiah', () => {
      let inputRupiah = '001000'
      
      wrapper.instance().inputRupiah.current = { value: inputRupiah }

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      const expectedDocompose = '1 x Rp1000'
      const resultDecompose = submitRupiahMock.mock.calls[0][0]

      expect(resultDecompose).toBe(expectedDocompose)
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

})
test('does not throw warning with expected props', () => {
  checkProps(InputBox, defaultProps)
})
