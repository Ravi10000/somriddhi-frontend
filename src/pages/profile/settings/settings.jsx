import "./settings.styles.scss";

import React, { useState } from "react";

const viewList = ["profile", "payment"];
export default function Settings() {
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
        <form>
          <input type="text" placeholder="Edit your excel id" />
          <button>Save Excel ID</button>
        </form>
      )}
      {view === "profile" && (
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input
            type="phone"
            placeholder="Phone"
            maxLength={10}
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
