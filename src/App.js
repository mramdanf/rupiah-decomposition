import React from 'react';

import InputBox from './components/InputBox'
import ResutlText from './components/ResultText'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rupiahDecompose: ''
    }
  }

  decomposeRupiah = (val) => {
    this.setState({
      rupiahDecompose: val
    })
  }

  render() {
    return (
      <div data-test="component-app">
        <InputBox 
          data-test="input-box"
          submitRupiah={this.decomposeRupiah}
        />
        <ResutlText 
          data-test="result-text"
          display={this.state.rupiahDecompose !== ''}
          text={this.state.rupiahDecompose}
        />
      </div>
    );
  }
}

export default App;
