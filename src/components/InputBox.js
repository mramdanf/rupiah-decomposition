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
    if (this.inputRupiah.current.value.toString().length > 0) {
      
      let inputRupiahValue = this.inputRupiah.current.value.toString(),
          inputRupiahErrorMsg = '',
          inputRupiahError = false
      
      // Input rupiah validation      
      const inValidCheck = [
        { pattern: /^([^0-9]*)$/, errMsg: 'missing value' },
        { pattern: /,\d{3}/, errMsg: 'invalid separator' },
        { pattern: /\d+ \d{3}/, errMsg: 'invalid separator' },
        { pattern: /\d*.Rp/, errMsg: 'valid character in wrong position' },
      ]

      inValidCheck.forEach(item => {
        if (item.pattern.test(inputRupiahValue)) {
          inputRupiahErrorMsg = item.errMsg
          inputRupiahError = true
          this.setState({
            inputRupiahErrorMsg,
            inputRupiahError
          })
        }
      })

      if (this.state.inputRupiahError) {
        this.props.submitRupiah(inputRupiahErrorMsg)
        return
      }

      // Input rupiah parsing
      // Remove ,00 if exist
      inputRupiahValue = inputRupiahValue.replace(/(,00)$/g, '')
      // Remove non-number char
      inputRupiahValue = inputRupiahValue.replace(/[^0-9]/g, '')

      inputRupiahValue = parseInt(inputRupiahValue)

      const decomposeResult = calcuateDecomposeRupiah(inputRupiahValue)
      
      this.setState({
        decomposeResult,
        inputRupiahValue: inputRupiahValue
      })

      // Crafting Result text
      let resultText = ''
      decomposeResult.availableRupiah.forEach(item => {
        if (item.count > 0)
          resultText += `${item.count} x Rp${item.nominal}, `
      })

      // Remove ,<space> in the end
      resultText = resultText.replace(/,.$/, '')

      if (decomposeResult.left !== '') {
        resultText += `, left ${decomposeResult.left}`
      }

      this.props.submitRupiah(resultText)
    }
  }

  render() {
    return (
      <dir data-test="component-input-box">
        <h4 data-test="input-instructions">Masukkan nominal dalam rupiah. contoh: 10.000</h4>
        <form>
          <div className="form-field">
            <input 
              data-test="input-rupiah"
              ref={this.inputRupiah}
              type="text"
            />
          </div>
          <div className="form-field">
            <button
              data-test="submit-button"
              type="submit"
              onClick={this.handleSubmitRupiah}
            >
              Hitung
            </button>
          </div>
          
        </form>
        
      </dir>
    )
  }
}

InputBox.propTypes = {
  submitRupiah: PropTypes.func.isRequired
}

export default InputBox
