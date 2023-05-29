import styles from "./settings.module.scss";

import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { updateUser, changeWalletId } from "../../../api";
import { setFlash } from "../../../redux/flash/flash.actions";
import { setCurrentUser } from "../../../redux/user/user.actions";

const viewList = ["profile", "payment"];

function Settings({ currentUser, setCurrentUser, setFlash }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log({ currentUser });

  async function handleUserUpdate(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append("usertype", "customer");

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await updateUser(currentUser._id, formData);
      console.log({ response });
      if (response.data.status === "success") {
        setCurrentUser(response.data.user);
        setFlash({
          type: "success",
          message: "User Details Updated Successfully",
        });
      }
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeWalletId(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target);
      const response = await changeWalletId(formData);
      console.log({ response });
      if (response.data.status === "success") {
        setCurrentUser(response?.data?.user);
        setFlash({
          type: "success",
          message: "Wallet Id Updated Successfully",
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      1;
    }
  }

  const [view, setView] = useState("profile");
  return (
    <div className={styles.settings}>
      <h2>Settings</h2>
      <div className={styles["view-selectors"]}>
        {viewList?.map((viewItem, index) => (
          <div
            key={index}
            className={`${styles.selector} ${
              view === viewItem && styles.active
            }`}
            onClick={() => {
              setView(viewItem);
            }}
          >
            <p>{viewItem}</p>
          </div>
        ))}
      </div>
      {view === "payment" && (
        <form onSubmit={handleChangeWalletId}>
          <input
            type="text"
            placeholder="Edit your wallet id"
            name="walletId"
            defaultValue={currentUser?.walletId}
          />
          <button className={styles.btn}>
            Save Excel ID {isLoading && <div className={styles.loader}></div>}
          </button>
        </form>
      )}
      {view === "profile" && (
        <form onSubmit={handleUserUpdate} encType="application/json">
          <input
            name="fname"
            type="text"
            placeholder="First Name"
            defaultValue={currentUser?.fname}
          />
          <input
            name="lname"
            type="text"
            placeholder="Last Name"
            defaultValue={currentUser?.lname}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={currentUser?.email}
          />
          <input
            name="phone"
            type="phone"
            placeholder="Phone"
            maxLength={10}
            defaultValue={currentUser?.phone}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          <button className={styles.btn}>
            Edit Profile {isLoading && <div className={styles.loader}></div>}
          </button>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProp = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProp)(Settings);
