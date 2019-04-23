import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../utils/testUtils'
import ResultText from './ResultText'

const defaultProps = { display: false, text: "" }

const setup = (initialProps={}) => {
  const setupProps = { ...defaultProps, ...initialProps }
  return shallow(<ResultText {...setupProps} />)
}

describe('renders', () => {
  test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-result-text')
    expect(component.length).toBe(1)
  })
  test('renders non-empty text when `display` props is true', () => {
    const wrapper = setup({ display: true, text: "test" })
    const resultText = findByTestAttr(wrapper, 'result-text')
    expect(resultText.text().length).not.toBe(0)
  })
  test('renders empty text when `display` props is false', () => {
    const wrapper = setup({ display: false })
    const resultText = findByTestAttr(wrapper, 'result-text')
    expect(resultText.text().length).toBe(0)
  })
})
test('dosen throw warning with expected props', () => {
  checkProps(ResultText, defaultProps)
})