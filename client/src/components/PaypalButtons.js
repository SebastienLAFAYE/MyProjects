import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from "react-async-script-loader";
import Spinner from "./Spinner";

 const CLIENT = {
   sandbox:
     "sb-5rzmy1592863@business.example.com",
   production:
     "ATOVY0BovSFHiOamT1pJNScHAFFbDjLdlnIXqm9g_u_4XtaojwvAlGejow7YhA0tAJrJTRrIC_-E2Yln"
 };

 const CLIENT_ID =
   process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

   
let PayPalButton = null;


class PaypalButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +"Pay with Paypal",
          amount: {
            currency_code: "USD",
            value: 200
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && <Spinner />}

        {showButtons && (
          <div>
            <div>
              <h2>Total payment :</h2>
            </div>

            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div className="main center">
            <h2>
              Congrats ! You succeed to pay with Paypal !
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${'ATOVY0BovSFHiOamT1pJNScHAFFbDjLdlnIXqm9g_u_4XtaojwvAlGejow7YhA0tAJrJTRrIC_-E2Yln'}`)(PaypalButtons);