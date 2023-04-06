import styles from "./header.module.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Search from "../search/search";
import Button from "../button/button";

// selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { Link, useNavigate } from "react-router-dom";

function Header({ openModal, currentUser }) {
  const navigate = useNavigate();
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
