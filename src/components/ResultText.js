import React from 'react'
import PropTypes from 'prop-types'

const ResutlText = (props) => {
  const text = (props.display) ? props.text : ""
  return (
    <div data-test="component-result-text">
      <p 
        data-test="result-text"
        className={props.error ? "error-msg" : ""}
      >{ text }</p>
    </div>
  )
}

ResutlText.propTypes = {
  display: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}

export default ResutlText