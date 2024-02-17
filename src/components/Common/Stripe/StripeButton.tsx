import React, { useState } from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import {
  showErrorToast,
} from "../../../services/popups/popups";
import { useNavigate } from "react-router-dom";
import PaymentDetails from "../../../Interfaces/paymentDetails";


interface StripeBtnProps {
  price: number;
  title: string;
  createdby: string;
  courseId:string;
}
const StripeBtn: React.FC<StripeBtnProps> = ({ price, title, createdby, courseId }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const publishableKey =
    "pk_test_51OSDUbSFcGfHkHz59ElbCcxes5kEMxrMIXF04DTorWE6gO4umd6LAxM3MWoxJOxlaHh1UmqHRWQBLD1yVi4UsdHY00kWm1XjqE";
  const navigate = useNavigate();
  
  
  const onToken = async (token: Token) => {
    const body = {
      amount: price,
      courseTitle: title,
      createdBy: createdby,
      token: token,
      courseId:courseId
    };
    userAxios
      .post(userEndpoints.payments, body)
      .then(() => {
        const paymentDetails: PaymentDetails = {
          courseAmount: body.amount,
          courseTitle: body.courseTitle,
          createdBy: body.createdBy,
          usedEmail: body.token.email,
          type: body.token.type,
          transactionId: body.token.created,
          cardType: body.token.card.brand,
          courseId: body.courseId,
          date: ""
        };

        
        setPaymentSuccess(true);
        navigate(userEndpoints.payments, { state: { paymentDetails } });
      })
      .catch((error) => {
        showErrorToast(`Payment Failed",${error}`);
      });
  };
  const closePopup = () => {
   
    setPaymentSuccess(false);
  };
  return (
    <>
    <StripeCheckout
      label="Buy Course"
      name="StudyOnline"
      description="Purchase Course and explore more"
      panelLabel="Proceed payment"
      amount={price}
      token={onToken}
      stripeKey={publishableKey}
      //   image="https://res.cloudinary.com/dc3otxw05/image/upload/v1703739138/User%20Image/xnjfl3qswk36lbjfqtny.jpg"
      billingAddress={false}
    />

    {paymentSuccess && (
      <div>
        <p>Payment Successful</p>
        <button onClick={closePopup}>Close</button>
      </div>
    )}
    </>
  );
};

export default StripeBtn;
