import styles from "./about.module.scss";
import { HiLocationMarker } from "react-icons/hi";
import { BiLogoFacebook } from "react-icons/bi";
import { TbMailFilled } from "react-icons/tb";
import { PiPhoneFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa6";

function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <h1>About Us</h1>
      <div className={styles.aboutCompany}>
        <p>
          Somriddhi Digital Pvt Ltd was incorporated on 21st January 2019 under
          companies act 1956, was formerly known as Samriddhi Foundation which
          was incorporated in 2014 under provisions of partnership act,
          objective was to provide cost effective Banking and financial services
          to rural, semi-urban and urban India, to extend government subsidy and
          Banking benefits to rural part of India, “Banking for every Indian” .
          We have successfully launched and operating in financial inclusion
          project of Government India. We have more than seven years reach
          experience to provide supplementary banking services and cash
          withdrawal services thru POS , AEPS and Micro ATM in association with
          many leading banks and NBFCs.
        </p>
        <p>
          We have transparent web-based CRM and Mobile application-based
          platform to provide end to end Banking solution with average turnover
          of 100 Crore per annum.
        </p>
        <p>
          We are affiliate partner of{" "}
          <a href="https://amazon.in" target="_blank">
            www.amazon.in
          </a>
          , Flipkart ads to promote their product and services through our web
          based services and app.
        </p>
        <p>
          We have launched our brand-new website&nbsp;
          <a href="https://somriddhi.store/" target="_blank">
            somriddhi.store
          </a>{" "}
          which is a cashback and coupons website that allows users to earn
          money back on their online purchases. The website works by partnering
          with brands who offer cashback to www.somriddhi.store users. When a
          user makes a purchase through www.somriddhi.store , Amazon pays
          www.somriddhi.store a commission, and www.somriddhi.store then pays
          the user a portion of that commission as cashback.
        </p>
        <p>
          Here are some of the key features of&nbsp;
          <a href="https://somriddhi.store/" target="_blank">
            somriddhi.store
          </a>
        </p>
        <ul>
          <li>
            Cashback on a wide range of products and services:&nbsp;
            <a href="https://somriddhi.store/" target="_blank">
              somriddhi.store
            </a>{" "}
            offers cashback on a wide range of products and services, including
            fashion, electronics, travel, and groceries.
          </li>
          <li>
            Easy to use:{" "}
            <a href="https://somriddhi.store/" target="_blank">
              {" "}
              somriddhi.store
            </a>
            is very easy to use. Simply sign up for an account, find the
            retailer you want to shop at, and click on the "Shop Now" button.
            You will then be redirected to the retailer's website, and you will
            earn cashback on your purchase.
          </li>
          <li>
            Reliable:{" "}
            <a href="https://somriddhi.store/" target="_blank">
              {" "}
              somriddhi.store
            </a>{" "}
            is a reliable website, and it has a good track record of paying out
            cashback to its users.
          </li>
        </ul>
        <p>
          If you are looking for a way to save money on your online purchases,
          then{" "}
          <a href="https://somriddhi.store/" target="_blank">
            {" "}
            somriddhi.store
          </a>{" "}
          is a great option. The website is easy to use, reliable, and it offers
          cashback on a wide range of products and services.
        </p>
      </div>
      <div className={styles.contactDetails} id="contact-us">
        <h2>Contact Details</h2>
        <div className={styles.address}>
          <h3>Address</h3>
          <p>SOMRIDDHI DIGITAL PVT. LTD.</p>
          <p>CIN - U72900WB2019PTC229953</p>
          <p>Ecosuit Business Tower,</p>
          <p>Unit No 507 , 5 th Floor</p>
          <p>Plot No. IID/22, Sector II ,</p>
          <p>Biswa Bangla Sarani ,New Town,</p>
          <p>Kolkata - 700 156</p>
        </div>
        <div className={styles.mail}>
          <h4>Mail Id</h4>
          <a href="mailto:store@somriddhidigital.com" target="_blank">
            store@somriddhidigital.com
          </a>
        </div>
        <div className={styles.socialMedia}>
          <a
            className={styles.socialLink}
            href="https://g.co/kgs/8jtZ7D"
            target="_blank"
          >
            <HiLocationMarker />
            <p>Google Maps</p>
          </a>
          <a
            className={styles.socialLink}
            href="https://www.facebook.com/aessdpl"
            target="_blank"
          >
            <BiLogoFacebook />
            <p>Facebook</p>
          </a>
          <a
            className={styles.socialLink}
            href="https://www.linkedin.com/company/somriddhi-digital-private-limited/mycompany/"
            target="_blank"
          >
            <FaLinkedin />
            <p>LinkedIn</p>
          </a>
        </div>
        <div className={styles.supportPhone}>
          <h4>Support Mobile No.</h4>
          <a
            className={styles.socialLink}
            href="tel:8100603096"
            target="_blank"
          >
            <PiPhoneFill />
            <p>8100603096</p>
          </a>
          <a
            className={styles.socialLink}
            href="tel:7439551839"
            target="_blank"
          >
            <PiPhoneFill />
            <p>7439551839</p>
          </a>
        </div>
        <div className={styles.supportEmail}>
          <h4>Support Email</h4>
          <a
            className={styles.socialLink}
            href="mailto:store@somriddhidigital.com"
            target="_blank"
          >
            <TbMailFilled />
            <p>store@somriddhidigital.com</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
