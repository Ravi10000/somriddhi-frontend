import styles from "./share-giftcard.module.scss";

import Backdrop from "../backdrop/backdrop";
import Button from "../button/button";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import NumInput from "../num-input/num-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGiftcard } from "../../api/giftcard.req";
import { connect } from "react-redux";
import { setFlash } from "../../redux/flash/flash.actions";
import { useState } from "react";

function ShareGiftcard({ setShowPopup, giftcard, setFlash, currentUser }) {
  const formSchema = z.object({
    senderName: z.string().nonempty({ message: "Sender Name required" }),
    receiverName: z.string().nonempty({ message: "Receiver's Name required" }),
    receiverPhone: z
      .string()
      .nonempty({ message: "Receiver's Phone required" })
      .min(10, { message: "Phone number must be 10 digits" })
      .max(10, { message: "Phone number must be 10 digits" }),
    receiverEmail: z
      .string()
      .email({ message: "Invalid email" })
      .nonempty({ message: "Receiver's Email required" }),
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverName: "test name",
      receiverPhone: "9560863067",
      receiverEmail: "ravisince2k@gmail.com",
      senderName: currentUser?.fname
        ? currentUser?.fname + " " + currentUser?.lname
        : "",
    },
  });

  async function handleSendGiftcard(data) {
    try {
      setIsLoading(true);
      data.giftcard = giftcard._id;
      const res = await sendGiftcard(data);
      console.log({ res });
      setFlash({
        type: "success",
        message: "Giftcard sent successfully",
      });
      setShowPopup(false);
    } catch (err) {
      console.error(err);
      setFlash({
        type: "error",
        message: err?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Backdrop>
      <div className={styles.popup}>
        <PopupHead title="Share Voucher" setShowPopup={setShowPopup} />
        <form
          className={styles.inputContainer}
          onSubmit={handleSubmit(handleSendGiftcard)}
          noValidate
        >
          <TextInput
            register={{ ...register("senderName") }}
            label="Sender"
            placeholder="Sender's Name"
            error={errors?.senderName?.message}
          />
          <TextInput
            register={{ ...register("receiverName") }}
            label="Receiver"
            placeholder="Receiver's Name"
            error={errors?.receiverName?.message}
          />
          <NumInput
            register={{ ...register("receiverPhone") }}
            label="Phone"
            placeholder="Receiver's Phone Number"
            error={errors?.receiverPhone?.message}
          />
          <TextInput
            register={{ ...register("receiverEmail") }}
            label="Email"
            placeholder="Receiver's Email Address"
            error={errors?.receiverEmail?.message}
          />
          <Button isLoading={isLoading}>Send</Button>
        </form>
      </div>
    </Backdrop>
  );
}
const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState, { setFlash })(ShareGiftcard);
