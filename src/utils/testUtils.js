import checkPropTypes from 'check-prop-types'

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(component.propTypes, confirmingProps, 'props', component.name)
  expect(propError).toBeUndefined()
}