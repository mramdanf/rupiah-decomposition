import React from 'react';
import './index.css'

import InputBox from './components/InputBox'
import ResutlText from './components/ResultText'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rupiahDecompose: '',
      inputRupiahError: false,
    }
  }

  decomposeRupiah = (val, inputRupiahError) => {
    this.setState({
      rupiahDecompose: val,
      inputRupiahError,
    })
  }

  render() {
    return (
      <div 
        id="app-section"
        data-test="component-app"
        className="container text-center"
      >
        <InputBox 
          data-test="input-box"
          submitRupiah={this.decomposeRupiah}
        />
        <ResutlText 
          data-test="result-text"
          display={this.state.rupiahDecompose !== ''}
          text={this.state.rupiahDecompose}
          error={this.state.inputRupiahError}
        />
      </div>
    );
  }
}

export default App;
