import React from "react";
import { useLocation } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";

const Payment = ({}) => {
  const location = useLocation();
  const { title, price, picture } = location.state;
  console.log(title, picture, price);
  return (
    <div className="container payment d-flex column align-items-center">
      <h2>Acheter en ligne</h2>

      <img src={picture} />
      <h2>{title}</h2>
      <div className="price">{price} €</div>
      <StripeProvider
        apiKey="pk_test_kPj42JMZ5g3tc9EpAAvt1XVc00WnHeruR4
"
      >
        <div className="checkoutForm">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    </div>
  );
};
export default Payment;
