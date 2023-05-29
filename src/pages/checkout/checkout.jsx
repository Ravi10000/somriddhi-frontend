import styles from "./checkout.module.scss";
import NumInput from "../../components/num-input/num-input";
import TextInput from "../../components/text-input/text-input";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import { addGiftCard } from "../../api";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { useEffect } from "react";

function CheckoutPage({ currentUser, setFlash }) {
  console.log({ currentUser });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: currentUser?.fname || "",
      lastname: currentUser?.lname || "",
      email: currentUser?.email || "",
      telephone: currentUser?.phone || "",
    },
  });
  const { state } = useLocation();
  console.log({ state });
  useEffect(() => {
    console.log({ currentUser });
  }, [currentUser]);

  async function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handleCheckout(data) {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) return console.log("failed to load script");

      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_KEY_ID,
        currency: "INR",
        amount: state.total * 100,
        name: "Gift Card",
        description: "Pay for your gift card",
        handler: async function (response) {
          console.log({ response });
          const formData = {};
          formData.address = {
            salutation: data.salutation,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            telephone: "+91" + data.telephone,
            country: "IN",
            postcode: data.postcode,
          };

          formData.billingAddress = {
            ...formData.address,
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            region: data.region,
          };

          formData.paymentid = response.razorpay_payment_id;
          formData.unitPrice = parseInt(state.price);
          formData.totalAmount = state.total;
          formData.qty = parseInt(state.qty);
          try {
            const giftCardRes = await addGiftCard(formData);
            console.log({ giftCardRes });
            console.log({ razorpaySuccessResponse: response });
            if (giftCardRes?.data?.status === "Success") {
              setFlash({
                message: "Gift Card Purchase Successful",
                type: "success",
              });
              navigate("/profile/gift-cards");
            }
          } catch (err) {
            setFlash({
              message: "Gift Card Purchase Failed",
              type: "error",
            });
            console.log(err);
          }
        },
      };
      const payment = new window.Razorpay(options);
      payment.open();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.checkoutPage}>
      <h2>Checkout Page</h2>
      <div className={styles.container}>
        <div className={styles.orderDetails}>
          <h3 className={styles.subtitle}>Order Details</h3>
          <p>
            Gift Card Quantity: <span>{state?.qty}</span>
          </p>
          <p>
            Gift Card Price: <span>₹{state?.price}</span>
          </p>
          <p>
            Order Total: <span> ₹{state?.total}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleCheckout)}>
          <h3 className={styles.subtitle}>Billing Details</h3>
          <div className={styles.inputGroupsContainer}>
            <div className={styles.inputGroup}>
              <TextInput
                label="Mr/Ms/Mrs"
                register={{
                  ...register("salutation", { required: "type Mr or Mrs." }),
                }}
              />
              <TextInput
                label="First Name"
                register={{
                  ...register("firstname", { required: "first name required" }),
                }}
              />
              <TextInput
                label="Last Name"
                register={{
                  ...register("lastname", { required: "last name required" }),
                }}
              />
              <TextInput
                label="Email"
                register={{
                  ...register("email", { required: "email required" }),
                }}
              />
              <NumInput
                maxlength="10"
                label="Phone"
                register={{
                  ...register("telephone", { required: "phone required" }),
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <TextInput
                label="Address Line 1"
                register={{
                  ...register("line1", { required: "address required" }),
                }}
              />
              <TextInput
                label="Address Line 2"
                register={{
                  ...register("line2"),
                }}
              />
              <TextInput
                label="City"
                register={{
                  ...register("city", { required: "city required" }),
                }}
              />
              <TextInput
                label="Region"
                register={{
                  ...register("region", { required: "region required" }),
                }}
              />
              <NumInput
                maxlength="6"
                label="Pincode"
                register={{
                  ...register("postcode", { required: "pincode required" }),
                }}
              />
            </div>
          </div>
          <div className={styles.checkoutBtn}>
            <Button>Checkout</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { setFlash })(CheckoutPage);
