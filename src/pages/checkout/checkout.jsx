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
import { fetchGiftcardDiscount } from "../../api/giftcard.req";
import { BsCheck2 } from "react-icons/bs";
import PaymentGatways from "../../components/payment-gateways/payment-gateways";

function CheckoutPage({ currentUser, setFlash }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  // const [is]
  const [isSearching, setIsSearching] = useState(false);
  const [giftcardDiscount, setGiftcardDiscount] = useState(0);
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
    trigger,
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
  const discountAmount = !giftcardDiscount
    ? 0
    : parseFloat((state?.total / 100) * giftcardDiscount).toFixed(2);
  const orderTotal = state?.total - discountAmount;
  async function handleCheckout(data) {
    console.log({ data });
    if (postcodeError) {
      setError("postcode", { message: postcodeError });
      return;
    }
    setIsCheckingOut(true);

    try {
      data.discountedAmount = orderTotal;
      data.amount = state?.total;
      data.quantity = state?.qty;
      data.unitPrice = state?.price;
      data.method = paymentMethod;
      console.log({ data });
      console.log({ isPhonePe: paymentMethod });
      const { data: transactionData } = await initiateTransaction(data);
      console.log({ transactionData });
      if (transactionData?.redirectUrl) {
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
      setPaymentMethod(null);
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

  async function handleFetchGiftcardDiscount() {
    try {
      const res = await fetchGiftcardDiscount();
      console.log({ res });
      const discountPercentage = res?.data?.discount?.discountPercentage;
      if (discountPercentage) {
        console.log({ discountPercentage });
        setGiftcardDiscount(parseFloat(discountPercentage));
      }
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    if (parseFloat(state?.total) < 2) return;
    handleFetchGiftcardDiscount();
  }, []);

  useEffect(() => {
    if (postcode?.length === 6) searchPincode();
  }, [postcode]);

  return (
    <div className={styles.checkoutPage}>
      <h2>Checkout Page</h2>
      <div className={styles.container}>
        <div className={styles.orderDetails}>
          <h3 className={styles.subtitle}>Order Details</h3>
          <p>
            Amazon Shopping Voucher Quantity: <span>{state?.qty}</span>
          </p>
          <p>
            Amazon Shopping Voucher Price:{" "}
            <span>₹{parseInt(state?.price) * parseInt(state?.qty)}</span>
          </p>
          {!!giftcardDiscount && (
            <p>
              Discount Applied &nbsp;&#x28;
              {giftcardDiscount}%&#x29; OFF
              <span className={styles.discountAmount}>
                {" "}
                - ₹{discountAmount}
              </span>
            </p>
          )}
          <p>
            Order Total: <span className={styles.total}> ₹{orderTotal}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleCheckout)} noValidate>
          {showPaymentGateway && (
            <PaymentGatways
              isValid={isValid}
              setPaymentMethod={setPaymentMethod}
              close={() => setShowPaymentGateway(false)}
            />
          )}
          <h3 className={styles.subtitle}>Billing Details</h3>
          <div className={styles.inputGroupsContainer}>
            <div className={styles.inputGroup}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <TextInput
                  inputStyle={{ width: "100%" }}
                  label="First Name"
                  register={{
                    ...register("firstname"),
                  }}
                  error={errors?.firstname?.message}
                />
                <TextInput
                  inputStyle={{ width: "100%" }}
                  label="Last Name"
                  register={{
                    ...register("lastname"),
                  }}
                  error={errors?.lastname?.message}
                />
              </div>
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
          {!!giftcardDiscount && (
            <div className={styles.discountCard}>
              <span>
                <BsCheck2 />
              </span>
              <p>
                Discount Applied ₹{discountAmount}
                &nbsp;&#x28;
                {giftcardDiscount}%&#x29; OFF
              </p>
            </div>
          )}
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
            <Button
              onClick={(e) => {
                trigger();
                if (!isValid) return;
                // e.preventDefault();
                setShowPaymentGateway(true);
              }}
              type="button"
            >
              Checkout
            </Button>
            {/* <button
              className={styles.phonepeBtn}
              onClick={() => {
                if (isValid) setPaymentMethod("phonepe");
              }}
            >
              <p>Checkout</p>
              <img src="/phonepe-icon-sm.svg" alt="phonepe" />
            </button>
            <button
              className={styles.upiBtn}
              onClick={() => {
                if (isValid) setPaymentMethod("upigateway");
              }}
            >
              <p>Checkout</p>
              <img src="/upigateway-icon.svg" alt="" />
            </button> */}
          </div>
        </form>
      </div>
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
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { setFlash })(CheckoutPage);
