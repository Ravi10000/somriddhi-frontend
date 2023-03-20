import "./form.styles.scss";
import React, { useState } from "react";
import Button from "../button/button";
import { createNewNewLetter } from "../../api/index";

export default function Form() {
  const [email, setEmail] = useState('');

  const subscribeToNewsLetter = async (e) => {
    e.preventDefault();
    let userName = email.split('@')[0];
    let addNewsletter = {
      name: userName,
      email: email,
      status: "Active"
    }
    const newletter = await createNewNewLetter(addNewsletter);
    console.log(newletter);
  }

  return (
    <section className="form-section">
      <div className="form-container">
        <div className="img-container">
          <img src="/form-img.png" alt="form-background" />
          <div className="img-cover"></div>
        </div>
        <form >
          <h4 className="title">
            Subscribe to our
            <br />
            Newsletter!
          </h4>
          <p className="subtitle">
            Be the first to get exclusive offers
            <br />
            ands the latest news
          </p>
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email address" />
          <Button onClick={subscribeToNewsLetter} >Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
