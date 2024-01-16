import React, { useState } from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { useNavigate } from "react-router-dom";
import PaymentDetails from "../../../Interfaces/paymentDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interfaces/common";

interface StripeBtnProps {
  price: number;
  title: string;
  createdby: string;
  courseId:string;
}
const StripeBtn: React.FC<StripeBtnProps> = ({ price, title, createdby, courseId }) => {
  const userStore = useSelector((state: RootState) => state.userUpdate);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const publishableKey =
    "pk_test_51OSDUbSFcGfHkHz59ElbCcxes5kEMxrMIXF04DTorWE6gO4umd6LAxM3MWoxJOxlaHh1UmqHRWQBLD1yVi4UsdHY00kWm1XjqE";
  const navigate = useNavigate();
  const userId = userStore._id;
  console.log("//usedID", userId);
  console.log("createdBY..", createdby);
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
        console.log("body-mentor-createdBy", body.createdBy);
        const paymentDetails: PaymentDetails = {
          courseAmount: body.amount,
          courseTitle: body.courseTitle,
          createdBy: body.createdBy,
          usedEmail: body.token.email,
          type: body.token.type,
          transactionId: body.token.created,
          cardType: body.token.card.brand,
          courseId:body.courseId
        };

        showSuccessToast("Payment Successfull");
        setPaymentSuccess(true);
        navigate(userEndpoints.payments, { state: { paymentDetails } });
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        showErrorToast("Payment Failed");
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
      //   currency="inr"
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
