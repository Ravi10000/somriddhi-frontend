import styles from "./checkout.module.scss";
import NumInput from "../../components/num-input/num-input";
import TextInput from "../../components/text-input/text-input";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/button";
import { addGiftCard } from "../../api";
function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      salutation: "Mr.",
      firstname: "John",
      lastname: "Doe",
      email: "email@test.test",
      telephone: "1234567890",
      line1: "123, abc street",
      line2: "xyz area",
      city: "city",
      state: "state",
      country: "country",
      region: "region",
      postcode: "123456",
      company: "company",
      gstn: "1234567890",
      code: "123456",
    },
  });
  const { state } = useLocation();
  console.log({ state });

  // const handleCheckout = (data) => {
  //   console.log({ data });
  // };

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

  async function handlePayment(data) {
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
            telephone: data.telephone,
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            region: data.region,
            // state: data.state,
            company: data.company,
            country: data.country,
            postcode: data.postcode,
            gstn: data.gstn,
            code: data.code,
          };
          formData.paymentId = response.razorpay_payment_id;
          formData.unitPrice = state.price;
          formData.totalAmount = state.total;
          formData.qty = state.qty;
          formData.billingAddress = {
            ...formData.address,
          };
          formData.address.billToThis = true;

          // data.paymentId = response.razorpay_payment_id;
          // data.unitPrice = state.price;
          // data.totalAmount = state.total;
          // data.qty = state.qty;
          const giftCardRes = await addGiftCard(formData);
          console.log({ giftCardRes });
          console.log({ razorpaySuccessResponse: response });
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
        <form noValidate onSubmit={handleSubmit(handlePayment)}>
          <h3 className={styles.subtitle}>Billing Details</h3>
          <div className={styles.inputGroupsContainer}>
            <div className={styles.inputGroup}>
              <TextInput
                label="Mr/Mrs."
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
            </div>
            <div className={styles.inputGroup}>
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
              <TextInput
                label="Country"
                register={{
                  ...register("country", { required: "country required" }),
                }}
              />
              <NumInput
                maxlength="6"
                label="Pincode"
                register={{
                  ...register("postcode", { required: "pincode required" }),
                }}
              />
              <TextInput
                label="Company"
                register={{
                  ...register("company", { required: "company required" }),
                }}
              />
              <TextInput
                label="GST No."
                register={{
                  ...register("gstn", { required: "GST No. required" }),
                }}
              />
              <TextInput
                label="Code"
                register={{
                  ...register("code"),
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

export default CheckoutPage;
