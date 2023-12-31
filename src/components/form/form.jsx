import "./form.styles.scss";
import React, { useState } from "react";
import Button from "../button/button";
import { createNewNewLetter } from "../../api/index";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function Form({ setFlash }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const inputRef = React.useRef();

  const subscribeToNewsLetter = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let userName = email.split("@")[0];
    let addNewsletter = {
      email,
      name: userName,
      status: "Active",
    };

    try {
      const newletter = await createNewNewLetter(addNewsletter);
      console.log({ newletter });
      if (newletter.data.status === "success") {
        inputRef.current.value = "";
        setFlash({
          type: "success",
          message: "Subscribed Successfully",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="form-section" id="feedback-form">
      <div className="form-container">
        <div className="img-container">
          <img src="/form-img.png" alt="form-background" />
          <div className="img-cover"></div>
        </div>
        <form onSubmit={subscribeToNewsLetter}>
          <h4 className="title">
            Subscribe to our
            <br />
            Newsletter!
          </h4>
          <p className="subtitle">
            Be the first to get exclusive offers
            <br />
            and the latest news
          </p>
          <input
            ref={inputRef}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email address"
          />
          <Button isLoading={isLoading}>Subscribe</Button>
        </form>
      </div>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(Form);
