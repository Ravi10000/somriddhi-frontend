import React, { useState, useNavigate } from "react";
import "./topbar.styles.scss";
import Logo from "./logo.png";
import Dot from "./Dot.png";
import { Link } from "react-router-dom";
// import allMenus from "./Data.js";
// import { allHelp } from "./Data.js";
import { topMenuOptions, bottomMenuOptions } from "./menu-list";
const SideBar = ({
  isMenuVisible,
  setIsMenuVisible,
  hideMenu,
  setSelectedOption,
  selectedOption,
}) => {
  // const [isClicked, setIsClicked] = useState(0);
  function selectOption(item) {
    console.log(item);
    setIsMenuVisible(false);
    window.scrollTo(0, 0);
    // setSelectedOption(item);
  }
  return (
    // <div className={`drawer ${isMenuVisible && "active"}`}>
    //   <div className="logo">
    //     <img className="logoImg" src={Logo} alt="logo" />
    //     <div className="hide-menu" onClick={hideMenu}>
    //       <img src="/close-menu.png" alt="close side bar" />
    //     </div>
    //   </div>
    //   <div className="allMenu">
    //     {allMenus.map((item, index) => (
    //       <div key={index}>
    //         {isClicked === index + 8 ? (
    //           <div className="menuC">
    //             <p className="menuTextC">{item}</p>
    //           </div>
    //         ) : (
    //           <div
    //             className="menuNC"
    //             onClick={(e) => {
    //               setIsClicked(index + 8);
    //             }}
    //           >
    //             <p className="menuTextNC">{item}</p>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    //   <div className="btMenu">
    //     {allHelp.map((item, index) => (
    //       <div key={index}>
    //         {isClicked === index ? (
    //           <div className="menuC">
    //             <img className="dot" src={Dot} alt="" />
    //             <p className="dotmenuTextC">{item}</p>
    //           </div>
    //         ) : (
    //           <div
    //             className="dotmenuNC"
    //             onClick={(e) => {
    //               setIsClicked(index);
    //             }}
    //           >
    //             <img className="dot" src={Dot} alt="" />
    //             <p className="dotmenuTextC">{item}</p>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className={`sidebar ${isMenuVisible && "visible"}`}>
      <div className="logo-and-close" onClick={hideMenu}>
        <img src="/logo.png" alt="somriddihi" />
        <img className="close-btn" src="/close-menu.png" alt="somriddihi" />
      </div>
      <div className="options">
        <div className="top-menu">
          {topMenuOptions.map((item, index) => (
            <Link to={`/admin/${item}`} key={index}>
              <div
                className={`option top ${
                  selectedOption === item && "selected"
                }`}
                onClick={() => {
                  selectOption(item);
                }}
              >
                <p>{item}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="bottom-menu">
          {bottomMenuOptions.map((item, index) => (
            <Link to={`/admin/${item}`} key={index}>
              <div
                className={`option bottom ${
                  selectedOption === item && "selected"
                }`}
                onClick={() => {
                  selectOption(item);
                }}
              >
                <div className="dot"></div>
                <p>{item}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
