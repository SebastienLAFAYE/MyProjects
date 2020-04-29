import React, { Component } from 'react';
import PaypalButtons from './components/PaypalButtons';

class App extends Component {
  state = {
    showPaypal: false
  };

  showPaypalButtons = () => {
    this.setState({ showPaypal: true });
  };

  render() {
    const { showPaypal } = this.state;
    if (showPaypal) {
      return <PaypalButtons />;
    } else {
      return (
        <div>
          <h2>Each gb will cost you 20€ either 20 credits</h2>
          <h3>
            <b>1€ for 1 credit</b>
          </h3>
          <button onClick={this.showPaypalButtons}>Pay with Paypal</button>
        </div>
      );
    }
  }
}

export default App;