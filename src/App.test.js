import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from './utils/testUtils'
import App from './App'

const setup = () => {
  return shallow(<App />)
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1)
  })
  test('renders input box', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')
    expect(inputBox.length).toBe(1)
  })
  test('renders result text', () => {
    const resultText = findByTestAttr(wrapper, 'result-text')
    expect(resultText.length).toBe(1)
  })
})