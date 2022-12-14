import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
  PaymentElement,
  ElementsConsumer
} from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [user, setUser] = useState("Louie");
  const [contact, setContact] = useState({
    phone: "",
    name: ""
  });
  const [priceOneDay, setPriceOneDay] = useState(120);
  const [days, setDays] = useState(0);
  const navigate = useNavigate();
  // stripe things
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [proccessing, setProccessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create-payment-intent",
        priceOneDay * days
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.reponse);
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const handleStripeSubmit = async (ev) => {
    ev.preventDefault();
    setProccessing(true);

    const payload = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete"
      }
    });
    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`);
      setProccessing(false);
    } else {
      setError(null);
      setProccessing(true);
      setSucceeded(true);
      setTimeout(() => {
        navigate("/confirmation");
      }, 3000);
    }
  };
  const handleStripeChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div>
      {succeeded ? (
        <article
          style={{
            color: "#f44336",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h4>Thank you</h4>
          <h4>Your paymennt was successful!</h4>
          {/* <h4>Redirecting to home page shortly</h4> */}
        </article>
      ) : (
        <article
          style={{
            marginBottom: "1rem",
            marginLeft: "1rem",
            marginTop: "2rem"
          }}
        >
          <h5>
            Hello {user && user} Your Total: ${priceOneDay * days}
          </h5>

          <input
            type="text"
            value={contact.name}
            placeholder="First & Last name"
            required
            className="user-info"
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
          <input
            type="text"
            value={contact.phone}
            placeholder="Your Phonenumber"
            required
            className="user-info"
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </article>
      )}

      <form style={{ width: "100%" }} onSubmit={handleStripeSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleStripeChange}
        />
        <button disabled={proccessing || succeeded || disabled} id="submit">
          <span id="button-text">
            {proccessing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your.
          <a
            href={`https://dashboard.stripe.com/test/payments`}
            style={{ margin: "0 0.2rem" }}
          >
            Stripe dashboard
          </a>
          {/* Redirecting home shortly */}
        </p>
      </form>
    </div>
  );
};

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
};

const Stripecheckout = ({
  sendOrderData,
  calculateDeliveryFee,
  setActiveStep,
  contact,
  setContact
}) => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <InjectedCheckoutForm
          sendOrderData={sendOrderData}
          calculateDeliveryFee={calculateDeliveryFee}
          setActiveStep={setActiveStep}
          contact={contact}
          setContact={setContact}
        />
      </Elements>
    </Wrapper>
  );
};

export default Stripecheckout;
const Wrapper = styled.section`
  width: 100;
  background: white;
  form {
    width: 100vw;
    height: 200px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  .user-info {
    width: 80%;
    font-size: 0.8rem;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    font-size: 6px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
    color: #22c55e;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 3rem;
    width: 300px;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #22c55e;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    height: 2rem;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 300px;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;
