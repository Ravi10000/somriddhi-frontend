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
import { useEffect, useState } from "react";
import Backdrop from "../../components/backdrop/backdrop";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { initiateTransaction } from "../../api/transaction";
import { getPincodeDetails } from "../../api";
import { Link } from "react-router-dom";

function CheckoutPage({ currentUser, setFlash }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPhonePe, setIsPhonePe] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const checkoutSchema = z.object({
    mobile: z
      .string()
      .min(10, "Moblie Number Should be 10 digits")
      .max(10, "Mobile Number Should be 10 digits"),
    email: z.string().email("Invalid Email"),
    // salutation: z.string().nonempty("Salutation is required"),
    firstname: z.string().nonempty("First Name is required"),
    lastname: z.string(),
    line1: z.string().nonempty("Address Line 1 is required"),
    line2: z.string(),
    district: z.string().nonempty("District is required"),
    // .nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    // .nonempty("Region is required"),
    postcode: z
      .string()
      .min(6, { message: "postcode have to be 6 digits" })
      .max(6, { message: "postcode have to be 6 digits" })
      .nonempty("Pincode is required"),
    tos: z
      .boolean()
      .refine((val) => val, { message: "Please accept terms of services" }),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: currentUser?.email || "",
      mobile: currentUser?.phone || "",
    },
  });
  const [postcodeError, setPostcodeError] = useState(null);
  const postcode = watch("postcode");
  const { state } = useLocation();

  async function handleCheckout(data) {
    console.log({ data });
    if (postcodeError) {
      setError("postcode", { message: postcodeError });
      return;
    }
    setIsCheckingOut(true);

    try {
      // data.amount = 1;
      // data.quantity = 1;
      // data.unitPrice = 1;
      data.amount = state?.total;
      data.quantity = state?.qty;
      data.unitPrice = state?.price;
      data.method = isPhonePe ? "phonepe" : "yespay";
      console.log({ data });
      console.log({ isPhonePe });
      const { data: transactionData } = await initiateTransaction(data);
      console.log({ transactionData });
      if (isPhonePe && transactionData.redirectUrl) {
        window.open(transactionData.redirectUrl, "_blank");
        return;
      }
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
      setIsPhonePe(false);
    }
  }

  async function searchPincode() {
    setIsSearching(true);
    try {
      const res = await getPincodeDetails(postcode);
      const details = res?.data?.[0]?.PostOffice?.[0];
      console.log({ details });
      if (!details) {
        setError("postcode", { message: "Invalid Pincode" });
        setPostcodeError("Invalid Pincode");
        setValue("district", "");
        setValue("state", "");
        return;
      }
      setError("postcode", null);
      setPostcodeError(null);
      setValue("district", details?.District);
      setValue("state", details?.State);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSearching(false);
    }
  }

  useEffect(() => {
    if (postcode?.length === 6) searchPincode();
  }, [postcode]);

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
            Amazon Shopping Voucher Quantity: <span>{state?.qty}</span>
          </p>
          <p>
            Amazon Shopping Voucher Price: <span>₹{state?.price}</span>
          </p>
          <p>
            Order Total: <span> ₹{state?.total}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleCheckout)} noValidate>
          <h3 className={styles.subtitle}>Billing Details</h3>
          <div className={styles.inputGroupsContainer}>
            <div className={styles.inputGroup}>
              {/* <TextInput
                label="Mr/Ms/Mrs"
                register={{
                  ...register("salutation"),
                }}
                error={errors?.salutation?.message}
              /> */}
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
              <div className={styles.pincodeContainer}>
                <NumInput
                  maxLength="6"
                  label="Postcode / Pincode"
                  register={{
                    ...register("postcode"),
                  }}
                  error={errors?.postcode?.message}
                />
                {isSearching && <div className={styles.loader}></div>}
              </div>
              <TextInput
                label="District"
                register={{
                  ...register("district"),
                }}
                error={errors?.district?.message}
              />
              <TextInput
                label="State"
                register={{
                  ...register("state"),
                }}
                error={errors?.state?.message}
              />
            </div>
          </div>
          <div className={styles.tosCheckbox}>
            <div className={styles.checkbox}>
              <input type="checkbox" id="tos" {...register("tos")} />
              <label htmlFor="tos">
                I confirm that I have read and agree to Somriddhi's{" "}
                <Link to="/terms-and-conditions" className={styles.tosLink}>
                  Terms of Services
                </Link>
              </label>
            </div>
            {errors?.tos?.message && (
              <p className={styles.tosError}>{errors?.tos?.message}</p>
            )}
          </div>
          <div className={styles.checkoutBtn}>
            <Button>Checkout</Button>
            <button
              className={styles.phonepeBtn}
              onClick={() => {
                if (isValid) setIsPhonePe(true);
              }}
            >
              <p>Checkout</p>
              <img src="/phonepe-icon.svg" alt="phonepe" />
            </button>
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
