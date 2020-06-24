import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

const CheckoutForm = ({ stripe }) => {
  const [complete, setComplete] = useState(false);
  return !complete ? (
    <div className="checkout">
      <h2>Vos coordonnées bancaires</h2>
      {/* 1. On affiche le formulaire de carte bleue */}
      <CardElement />
      <button
        className="btn"
        onClick={async (event) => {
          // 2. on envoie le numéro de carte à Stripe
          const stripeResponse = await stripe.createToken({
            name: "Identifiant de l'acheteur",
          });
          if (stripeResponse.error) {
            alert(stripeResponse.error.message);
          } else {
            // 4. Stripe nous retourne un token
            console.log("stripeResponse.token", stripeResponse.token);
            // 5. on envoie ce token au backend
            const paymentResponse = await axios.post(
              "https://leboncoin-api-final.herokuapp.com/pay",
              {
                token: stripeResponse.token.id,
              }
            );
            console.log("paymentResponse", paymentResponse);
            // 10. Le backend nous confirme que le paiement a été effectué
            if (paymentResponse.status === 200) {
              setComplete(true);
            } else {
              alert("An error occurred");
              console.error(paymentResponse);
            }
          }
        }}
      >
        Procéder au paiment
      </button>
    </div>
  ) : (
    <span>Purchase Complete</span>
  );
};
export default injectStripe(CheckoutForm);
