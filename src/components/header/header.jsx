import styles from "./header.module.scss";
import { connect, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import Search from "../search/search";
import Button from "../button/button";
import { PiBag } from "react-icons/pi";

// selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { Link, useNavigate } from "react-router-dom";

function Header({ openModal, currentUser }) {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  return (
    <header>
      <img
        onClick={() => {
          navigate("/");
        }}
        className={styles["logo"]}
        src="/Somriddhi Final Logo-03.png"
        alt="logo"
      />
      <Search />
      <div className="relative">
        {" "}
        <PiBag className="min-h-8 min-w-9 cursor-pointer " />
        <div className="absolute text-[10px] flex items-center justify-center top-0 right-0 text-white bg-[#F01C21] min-h-[14px] p-[2px]  min-w-[20px] rounded-full">
          {items?.length ?? 0}
        </div>
      </div>
      {/* change below to !currentUser */}
      <div className={styles["buttons"]}>
        {!currentUser ? (
          <Button onClick={openModal}>Login / Sign Up</Button>
        ) : (
          <Link to="/profile">
            <button className={styles["logged-in"]}>
              <img src="/user-logged-in.png" alt="user" />
              <p>My Account</p>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, null)(Header);
