import "./settings.styles.scss";

import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { updateUser } from "../../../api";

const viewList = ["profile", "payment"];

function Settings({ currentUser }) {
  async function submitUpdateForm(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await updateUser(currentUser._id, formData);
    } catch (error) {
      console.log(error);
    }
  }

  const [view, setView] = useState("profile");
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="view-selectors">
        {viewList?.map((viewItem, index) => (
          <div
            key={index}
            className={`selector ${view === viewItem && "active"}`}
            onClick={() => {
              setView(viewItem);
            }}
          >
            <p>{viewItem}</p>
          </div>
        ))}
      </div>
      {view === "payment" && (
        <form onSubmit={submitUpdateForm} encType="application/json">
          <input type="text" placeholder="Edit your excel id" />
          <button>Save Excel ID</button>
        </form>
      )}
      {view === "profile" && (
        <form>
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
          <button>Edit Profile</button>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Settings);
