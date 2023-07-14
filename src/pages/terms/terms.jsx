import styles from "./terms.module.scss";
import Balancer from "react-wrap-balancer";

function TermsPage() {
  return (
    <div className={styles.termsPage}>
      <section>
        <h1>
          <Balancer>
            Terms and Conditions: Amazon Pay Gift Cards issued by Somriddhi.
          </Balancer>
        </h1>
        <p>
          These terms and conditions apply to Amazon Pay Gift Cards (Gift Cards)
          issued by Somriddhi Private Limited (Somriddhi) under the brand name
          Amazon Pay (India) . Somriddhi is a private limited company organized
          under the laws of India, and is the issuer of the Gift Cards. You may
          purchase Gift Cards through various options available on{" "}
          <a href="https://amazon.in" target="blank">amazon.in</a>&nbsp; corresponding mobile
          site and mobile application ("Amazon.in"), and also use Gift Cards
          provided to you by third parties in the manner provided hereunder. By
          purchasing or using a Gift Card, you are agreeing to and accept these
          terms and conditions.
        </p>
        <ol>
          <li>
            <strong>Redemption: </strong>
            Gift Cards may only be redeemed toward the purchase of eligible
            products on Amazon.in and any other third party merchants that are
            enabled to accept the Gift Cards. Purchases are deducted from the
            redeemer's Gift Card balance. Any unused Gift Card balance will
            remain associated with the redeemers Amazon Pay balance account and
            applied to purchases in order of earliest expiration date. If a
            purchase exceeds the redeemers Gift Card balance, the remaining
            amount must be paid with by credit card, net banking or debit card.
            No fees or charges apply to Gift Cards. Somriddhi may provide Gift
            Card purchasers with information about the redemption status of Gift
            Cards that they purchase or use. Certain merchants may provide you
            services only on the pre-condition that you allow us to hold
            balances in your Amazon Pay balance: Gift Card till the service
            completion by the merchant. However, your prior consent would be
            taken before holding such balances. In such cases, you agree and
            authorize us to: (i) hold your balance until service completion; and
            (ii) fail the transaction if your balance in the Amazon Pay Gift
            Card is less than the actual amount charged by the merchant for the
            services.
          </li>
          <li>
            <strong>Limitations: </strong> Gift Cards, including any unused Gift
            Card balances, expire one year from the date of issuance. You may
            request for revalidation of any expired Gift Cards. Upon receipt of
            such request, the Gift Card may be revalidated after due
            verification and subject to applicable terms and conditions. Gift
            Cards may only be purchased in denominations ranging from Rs. 10 to
            Rs. 10,000, or such other limits as Somriddhi may determine. Gift
            Cards cannot be used to purchase other gift cards. Gift Cards cannot
            be reloaded, resold, transferred for value or redeemed for cash.
            Except as provided hereunder or as per applicable law, amount in
            your Gift Cards will not be refunded to you under any circumstances.
            No refund will be provided in cash, at any point of time. Unused
            Gift Card balances may not be transferred to another users account.
            No interest will be payable by Somriddhi on any Gift Card or Gift
            Card balance. Somriddhi make no representation or warranty that
            <a href="https://amazon.in" target="blank">
              {" "}
              Amazon.in
            </a>{" "}
            will always be accessible without interruption.
          </li>
          <li>
            <strong>Fraud: </strong>Somriddhi is not responsible if a Gift Card
            is lost, stolen, destroyed or used without permission. Amazon Seller
            Services Private Limited (together with Amazon Pay is referred to as
            'Amazon') will have the right to close customer accounts and take
            payment from alternative forms of payment if a fraudulently obtained
            Gift Card is redeemed and/or used to make purchases on Amazon.in.
          </li>
          <li>
            <strong>Governing Law and Jurisdiction: </strong> These terms and
            conditions are governed by and construed in accordance with the laws
            of India. You, Somriddhi and Amazon each agree to submit to the
            exclusive jurisdiction of the courts at Bangalore. You agree to
            indemnify Somriddhi and Amazon for all claims brought by a third
            party against it or its affiliates arising out of or in connection
            with a breach of any of these terms and conditions.
          </li>
          <li>
            <strong>Limitation of Liability: </strong>NEITHER SOMRIDDHI NOR
            AMAZON MAKE ANY WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT TO GIFT
            CARDS, INCLUDING WITHOUT LIMITATION, ANY EXPRESS OR IMPLIED WARRANTY
            OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN THE EVENT
            A GIFT CARD IS NON-FUNCTIONAL, YOUR SOLE REMEDY WILL BE THE
            REPLACEMENT OF SUCH GIFT CARD. IF APPLICABLE LAW DOES NOT ALLOW
            LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF
            CERTAIN DAMAGES, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS,
            OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL
            RIGHTS.
          </li>
          <li>
            <strong>Password Security: </strong>You shall, at all times, keep
            the passwords that are by you or your customers/beneficiaries on
            Amazon.in strictly confidential and not reveal the same to any
            person or entity.
          </li>
          <li>
            <strong>General Terms: </strong>The Amazon.in Conditions of Use
            apply to Gift Cards. Somriddhi reserves the right to change these
            Gift Card terms and conditions from time to time in its discretion
            and without p
          </li>
          <li>
            Contact Information: Website address:{" "}
            <a href="https://somriddhi.store" target="blank">
              somriddhi.store
            </a>
          </li>
        </ol>
        <p>
          You are not permitted to use any of the Amazon trademarks, logos and
          related taglines except in accordance with the brand use requirements
          as set forth in the brand use resource center found at &nbsp;
          <a href="http://www.amazon.in/CorporateGiftCardBrandUseGuidelines" target="blank">
            http://www.amazon.in/CorporateGiftCardBrandUseGuidelines
          </a>
          , as modified by Amazon from time to time in its sole discretion. The
          approved brand use guidelines can be found at &nbsp;
          <a href="https://www.amazon.in/l/17543658031" target="blank">
            https://www.amazon.in/l/17543658031
          </a>
          .You agree to make good the losses suffered by Somriddhi in the event
          Amazon imposes any penalty due to your breach of any terms set out
          herein.
        </p>
      </section>
    </div>
  );
}

export default TermsPage;
