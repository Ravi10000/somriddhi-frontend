import styles from "./checkout.module.scss";
import NumInput from "../../components/num-input/num-input";
import TextInput from "../../components/text-input/text-input";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/button";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { useState } from "react";
import Backdrop from "../../components/backdrop/backdrop";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { initiateTransaction } from "../../api/transaction";

function CheckoutPage({ currentUser, setFlash }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const checkoutSchema = z.object({
    mobile: z
      .string()
      .min(10, "Moblie Number Should be 10 digits")
      .max(10, "Mobile Number Should be 10 digits"),
    email: z.string().email("Invalid Email"),
    salutation: z.string().nonempty("Salutation is required"),
    firstname: z.string().nonempty("First Name is required"),
    lastname: z.string(),
    line1: z.string().nonempty("Address Line 1 is required"),
    line2: z.string(),
    city: z.string().nonempty("City is required"),
    region: z.string().nonempty("Region is required"),
    postcode: z.string().nonempty("Pincode is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: currentUser?.email || "",
      mobile: currentUser?.phone || "",
    },
  });
  const { state } = useLocation();
  console.log({ state });

  async function handleCheckout(data) {
    console.log({ data });
    setIsCheckingOut(true);
    try {
      data.amount = state?.total;
      data.quantity = state?.qty;
      data.unitPrice = state?.price;
      const { data: transactionData } = await initiateTransaction(data);
      console.log({ transactionData });
      window.open(
        `${import.meta.env.VITE_PAYMENT_PAGE_URL}?mobile=${data.mobile}&email=${
          data.email
        }&amount=${data.amount}&request_id=${transactionData.transaction._id}`
      );
    } catch (err) {
      setFlash({
        message: "Gift Card Purchase Failed",
        type: "error",
      });
      console.log(err);
    } finally {
      setIsCheckingOut(false);
    }
  }
  return (
    <div className={styles.checkoutPage}>
      {isCheckingOut && (
        <Backdrop>
          <div className={styles.loaderContainer}>
            <h2>Processing purchase </h2>
            <h3>please wait, it might take a while</h3>
            <h3>do not close this window.</h3>
            <div className={styles.loader}></div>
          </div>
        </Backdrop>
      )}
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
        <form onSubmit={handleSubmit(handleCheckout)} noValidate>
          <h3 className={styles.subtitle}>Billing Details</h3>
          <div className={styles.inputGroupsContainer}>
            <div className={styles.inputGroup}>
              <TextInput
                label="Mr/Ms/Mrs"
                register={{
                  ...register("salutation"),
                }}
                error={errors?.salutation?.message}
              />
              <TextInput
                label="First Name"
                register={{
                  ...register("firstname"),
                }}
                error={errors?.firstname?.message}
              />
              <TextInput
                label="Last Name"
                register={{
                  ...register("lastname"),
                }}
                error={errors?.lastname?.message}
              />
              <TextInput
                label="Email"
                register={{
                  ...register("email"),
                }}
                error={errors?.email?.message}
              />
              <NumInput
                maxLength="10"
                label="Phone"
                register={{
                  ...register("mobile"),
                }}
                error={errors?.mobile?.message}
              />
            </div>
            <div className={styles.inputGroup}>
              <TextInput
                label="Address Line 1"
                register={{
                  ...register("line1"),
                }}
                error={errors?.line1?.message}
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
                  ...register("city"),
                }}
                error={errors?.city?.message}
              />
              <TextInput
                label="Region"
                register={{
                  ...register("region"),
                }}
                error={errors?.region?.message}
              />
              <NumInput
                maxlength="6"
                label="Postcode / Pincode"
                register={{
                  ...register("postcode"),
                }}
                error={errors?.postcode?.message}
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
