import "./add-deal-popup.styles.scss";
// components
import Backdrop from "../backdrop/backdrop";

// utils
import { createNewDeal } from "../../api/";

export default function AddDealPopup({ setShowPopup }) {
  return (
    <Backdrop>
      <div className="add-deal-popup">
        <div className="head">
          <div className="head-left">
            <img src="/arrow-left-primary.png" alt="go back" />
            <h3>Add Deal</h3>
          </div>
          <button
            className="close-popup"
            onClick={() => {
              setShowPopup(false);
            }}
          >
            <img src="/close.png" alt="close popup" />
          </button>
        </div>
        <form action="">
          <div className="deal-name input-container">
            <label htmlFor="">Name</label>
            <input
            name="name"
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Enter Banner Name"
            />
          </div>
          <div className="deal-url input-container">
            <label htmlFor="">URL</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Paster banner URL"
            />
          </div>
          <div className="deal-cashback input-container">
            <label htmlFor="">Cashback</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Cashback"
            />
          </div>
          <div className="upload-deal-img">
            <label className="label">Banner Image</label>
            <div className="upload-input">
              <img src="/upload-gray.png" alt="upload image" />
              <input
                className="file-input"
                type="file"
                accept="image/png, image/jpeg"
                // onChange={(e) => saveFile(e)}
                // className="fileFieldText"
                name="file"
                // placeholder="Upload Image"
              />
            </div>
          </div>
          <div className="dates">
            <div className="live-date date-input">
              <label htmlFor="">Live Date</label>
              <input type="date" />
            </div>
            <div className="expiry-date date-input">
              <label htmlFor="">Expiry Date</label>
              <input type="date" />
            </div>
          </div>
          <button className="add-deal-btn">Add Deal</button>
        </form>
      </div>
    </Backdrop>
  );
}
