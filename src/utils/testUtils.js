import checkPropTypes from 'check-prop-types'

/**
 * Return node(s) with given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - value of data-test attribute for search.
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

/**
 * Checking empty error with expected props
 * @param {react_componet} component - React Component to that have a props
 * @param {object} confirmingProps - Props to check
 */
export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(component.propTypes, confirmingProps, 'props', component.name)
  expect(propError).toBeUndefined()
}