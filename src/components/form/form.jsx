import "./form.styles.scss";
import React from "react";
import Button from "../button/button";

export default function Form() {
  return (
    <section className="form-section">
      <div className="form-container">
        <div className="img-container">
          <img src="/form-img.png" alt="form-background" />
          <div className="img-cover"></div>
        </div>
        <form action="">
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
          <input type="email" placeholder="Enter your email address" />
          <Button>Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
