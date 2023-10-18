import "./home.styles.scss";

// section components
import Banner from "../../components/banner/banner";
import Coupons from "../../components/coupons/coupons";
import Deals from "../../components/deals/deals";
import Download from "../../components/download/download";
import Form from "../../components/form/form";
import Offers from "../../components/offers/offers";
import PopulatCategories from "../../components/popular-categories/popular-categories";
import PopularMembership from "../../components/popular-membership/popular-membership";
import Process from "../../components/process/process";
import ScrollToTop from "../../components/scrollToTop";
import CustomCategories from "../../components/custom-categories/custom-categories";
// import GiftCardList from "../../components/gift-card-list/gift-card-list";
import { useState } from "react";
import GiftCardList from "../../components/gift-card-list/gift-card-list";

export default function HomePage() {
  const demoResponse = {
    status: "Success",
    data: {
      id: "324",
      sku: "CNPIN",
      name: "API TESTING - CN & PIN",
      description:
        "Gifting is always fun when your gift is Wish Gift Card! Your loved ones can now shop for a great range of products for women, men, kids and babies as well as toys, home, electronics, gaming and more.",
      price: {
        price: "RANGE",
        type: "RANGE",
        min: "10",
        max: "10000",
        denominations: [
          "10",
          "100",
          "500",
          "1000",
          "2000",
          "3000",
          "4000",
          "5000",
          "6000",
          "7000",
          "8000",
          "9000",
          "10000",
        ],
        currency: {
          code: "INR",
          symbol: "₹",
          numericCode: "356",
        },
        cpg: [],
      },
      kycEnabled: "0",
      additionalForm: null,
      metaInformation: {
        page: {
          title: null,
        },
        meta: {
          title: null,
          keywords: null,
          description: null,
        },
        canonical: {
          url: null,
        },
      },
      type: "DIGITAL",
      schedulingEnabled: false,
      currency: "356",
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/thumbnail/324_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/mobile/324_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/image/324_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/small_image/324_microsite.png",
      },
      tnc: {
        link: "https://woohooqa.app.link/e/Aowg9z74kqb",
        content:
          '<ol>\r\n<li>The Gift card is valid for purchases made from Makemytrip only and is valid for a period of 12 Months from the date of Purchase.</li>\r\n<ul>For Flights, Hotels & Holidays:\r\n<ul><li>Can be redeemed online at www.makemytrip.com or on MakeMyTrip Android & IOS app. Please follow the steps listed below:\r\n<ul><li>Select your Flight/ Hotel and fill required details till you reach the payment page.</ul></li>\r\n<ul><li>On Website, click on "More options" and Select "Gift Card" as your Payment Mode. On Android and IOS app, choose Gift Card as the payment option</ul></li>\r\n<ul><li>Enter your Gift Card/ Card No. (16 Digit) and 6 Digit Pin No.</ul></li>\r\n<ul><li>Click on "Make Payment" and Pay the Balance amount (if any) using other Payment Modes Listed.</ul></li>\r\n<ul><li>Flights & Hotels are not redeemable offline.</ul></li></ul></li>\r\n<ul><li>For redeeming Holidays offline through our Holiday Experts :\r\n<ul><li>Please call on the understated number to redeem the card.</ul></li>\r\n<ul><li>Domestic Holiday packages: 9599595601</ul></li>\r\n<ul><li>International Holiday packages: 9599595618</ul></li>\r\n<ul><li>Alternatively you can also write on gifts@makemytrip.com</ul></li>\r\n<ul><li>You can also visit the MakeMyTrip Branches to redeem.</ul></li></ul></li></ul>\r\n<li>This Gift card is not valid on Bus, Rail and Car bookings. </li>\r\n<li>Gift cards are valid on bookings made through MMT Mobile App. </li>\r\n<li>In case of transaction failures after Gift Card is applied, amount would be automatically refunded to the same cards within 24 hours.</li>\r\n<li>This Gift card/voucher cannot be clubbed with any other ongoing offer discount/cash back/promotion run by Makemytrip.com on app or website.</li> \r\n<li>This Gift card is valid for partial redemption. Balance would remain in the Gift Card till the validity period and can be reused for multiple transactions.</li>\r\n<li>Multiple Gift Cards (up to 3) can be combined and used on 1 transaction.</li>\r\n<li>Products and services are subject to availability.   </li>\r\n<li>The Gift card cannot be cancelled or exchanged for cash. </li>\r\n<li>The Gift card validity cannot be extended under any circumstances.</li>\r\n<li>Gift Card code/Physical copy or both to be provided at the time of booking along with an ID proof for the offline redemption. </li>\r\n<li>MakeMyTrip is not responsible if the Gift card is lost, stolen or used without permission. </li>\r\n<li>In case of cancellation of bookings made using the gift card within the validity period, the amount will be reversed to the same card as used at the time of \r\nbooking. </li>\r\n<li>Users are required to save the gift card number and PIN to utilize this refunded amount as we will not be able to reset the PIN or reissue a new gift card \r\nnumber.</li>\r\n<li>In case of cancellations where the gift card validity has expired, no refund will be processed for the amount paid by the gift card.</li>\r\n<li>MakeMyTrip is the final authority on the interpretation of these rules </li>\r\n<li>MakeMyTrip reserves the right to deny accepting any Gift card if it suspects that there is duplicity of cards. </li>\r\n<li>In no event the liability of MakeMyTrip for any claims shall exceed the value of the card. </li>\r\n<li>In the event of any dispute, parties agree to exclusive jurisdiction of courts of New Delhi. </li>\r\n<li>This is for individual use only, Travel agents found using the card would lead to cancellation of booking and no refund would be made.</li>\r\n</ol>',
      },
      categories: [
        "4",
        "7",
        "8",
        "52",
        "54",
        "108",
        "118",
        "121",
        "122",
        "127",
        "132",
        "147",
        "154",
        "178",
        "188",
        "207",
        "214",
        "242",
        "246",
        "247",
        "261",
        "262",
        "263",
        "264",
        "265",
        "266",
        "267",
        "271",
        "291",
        "297",
        "411",
      ],
      themes: [],
      customThemesAvailable: false,
      handlingCharges: [],
      reloadCardNumber: false,
      expiry: "1 Year from the Date of Expiry",
      formatExpiry: null,
      discounts: [],
      relatedProducts: [
        {
          sku: "PROCESSINGSTS",
          name: "API TESTING - Processing Status",
          type: "DIGITAL",
          url: "api-testing-processing-status",
          images: {
            base: "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/base_image/324_.",
            small:
              "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/small_image/324_microsite.png",
            mobile:
              "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/mobile/324_microsite.png",
            thumbnail:
              "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/thumbnail/324_microsite.png",
          },
        },
      ],
      storeLocatorUrl: null,
      brandName: "API TESTING SIT",
      etaMessage: "",
      createdAt: "2018-07-26T06:58:11+00:00",
      updatedAt: "2023-05-12T06:12:07+00:00",
      cpg: {
        barcode: {
          encoding: "CA128",
        },
        redemptionTerms: [],
        type: "clp",
        code: "Test Pat eGift Card",
        erupi_purpose: null,
        erupi_payer_type: null,
        erupi_recurrence_pattern: null,
        erupi_validity: null,
      },
      payout: {
        enabled: false,
        payment_methods: ["svc"],
        account_types: ["BANK_ACCOUNT", "UPI"],
        transaction_types: ["IMPS", "NEFT", "UPI"],
        maximum_beneficiaries: "1",
        validate_terms_and_condition: "",
        convenience_charge: {
          type: "fixed",
          minimum_amount: "",
          maximum_amount: "",
          amount: "0",
        },
        validation: {
          amount: "1",
          convenience_charge: "0",
        },
      },
      allowedfulfillments: [
        {
          code: false,
        },
      ],
    },
  };

  const [giftCards, setGiftCards] = useState(demoResponse.data.price);

  // setGiftCards(demoResponse.data.price);
  return (
    <div className="home-page" id="home">
      <ScrollToTop />
      {/* <GiftCardList /> */}
      {/* <GiftCardSlider denominations={giftCards?.denominations} /> */}
      {/* <CustomCategories /> */}
      <GiftCardList />
      <Banner />
      <Coupons />
      <Offers />
      <Deals />
      <PopularMembership />
      <Form />
      <Process />
      <Download />
      <PopulatCategories />
    </div>
  );
}
