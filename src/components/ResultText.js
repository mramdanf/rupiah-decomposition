import React from 'react'

const ResutlText = (props) => {
  const text = (props.display) ? props.text : ""
  return (
    <div data-test="component-result-text">
      <p data-test="result-text">{ text }</p>
    </div>
  )
}

export default ResutlText