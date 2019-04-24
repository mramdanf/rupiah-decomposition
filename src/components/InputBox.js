import React from 'react'
import PropTypes from 'prop-types'

import { calcuateDecomposeRupiah } from '../utils/appUtils'

class InputBox extends React.Component {
  constructor(props) {
    super(props)
    this.inputRupiah = React.createRef()
    this.state = {
      decomposeResult: {
        availableRupiah: [],
        left: ''
      },
      inputRupiahValue: '',
      inputRupiahError: false,
      inputRupiahErrorMsg: ''
    }
  }

  handleSubmitRupiah = (e) => {
    e.preventDefault()

    let inputRupiahErrorMsg = '',
        inputRupiahError = false

    if (this.inputRupiah.current.value.toString().length <= 0) {
      inputRupiahErrorMsg = 'Input rupiah could not be empty'
      inputRupiahError = true
      this.setState({
        inputRupiahError,
        inputRupiahErrorMsg,
      })
      this.props.submitRupiah(inputRupiahErrorMsg, inputRupiahError)
      return
    }

    let inputRupiahValue = this.inputRupiah.current.value.toString()    
      
    // Input rupiah validation
    let allowedPattern = /(?=.*\d)^(Rp|Rp )?(([1-9]\d{0,2}((\.\d{3})*|\d+))|(0+[1-9]+(\d+|(\.\d{3})*)))(,\d{1,2})?$/

    if (!allowedPattern.test(inputRupiahValue)) {
      inputRupiahErrorMsg = 'Invalid input rupiah'
      inputRupiahError = true
      this.setState({
        inputRupiahErrorMsg,
        inputRupiahError
      })
    }

    if (inputRupiahError) {
      this.props.submitRupiah(`${inputRupiahErrorMsg}`, inputRupiahError)
      return
    }

    // Input rupiah parsing  
    // Remove ending ,00
    inputRupiahValue = inputRupiahValue.replace(/(,00)$/g, '')  

    // Remove non-number char
    inputRupiahValue = inputRupiahValue.replace(/[^0-9]/g, '')

    inputRupiahValue = parseInt(inputRupiahValue)

    const decomposeResult = calcuateDecomposeRupiah(inputRupiahValue)
    
    this.setState({
      decomposeResult,
      inputRupiahValue
    })

    // Crafting Result text
    let resultText = ''
    decomposeResult.availableRupiah.forEach(item => {
      if (item.count > 0)
        resultText += `${item.count} x Rp${item.nominal}, `
    })

    // Remove ,<space> in the end
    resultText = resultText.replace(/,.$/, '')

    // Check left value
    if (decomposeResult.left !== '' && resultText.length > 0) { // Not-only left value
      resultText += `, left ${decomposeResult.left}`
    }
    else { // Only left value
      resultText += `${decomposeResult.left}`
    }

    this.props.submitRupiah(resultText, inputRupiahError)
  }

  render() {
    return (
      <div
        data-test="component-input-box"
        id="input-box-section"
      >
        <div>
          <h3 data-test="input-instructions">Please input value in rupiah</h3>
        </div>
        <form>
          <div className="form-field">
            <input 
              data-test="input-rupiah"
              className="form-control"
              ref={this.inputRupiah}
              type="text"
            />
            <small className="input-help">example valid input: 10000; 18.215; Rp17500; Rp17.500,00; Rp 120.325; 005.000; 001000</small>
          </div>
          <div className="form-field">
            <button
              data-test="submit-button"
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmitRupiah}
            >
              Count
            </button>
          </div>
          
        </form>
        
      </div>
    )
  }
}

InputBox.propTypes = {
  submitRupiah: PropTypes.func.isRequired
}

export default InputBox
