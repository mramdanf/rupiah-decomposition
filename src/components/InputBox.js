import React from 'react'

class InputBox extends React.Component {
  constructor(props) {
    super(props)
    this.inputRupiah = React.createRef()
  }

  handleSubmitRupiah = (e) => {
    e.preventDefault()
    this.props.submitRupiah(this.inputRupiah.current.value)
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

export default InputBox
