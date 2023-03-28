import styles from "./all-faqs.module.scss";

// react hooks
import { useState, useEffect } from "react";
// packages
import { connect } from "react-redux";

// components
import TitleSection from "../title-section/title-section";
import AddFaqPopup from "../../../components/add-faq-popup/add-faq-popup";
import FaqCard from "./faq-card/faq-card";

// redux actions
import { setFlash } from "../../../redux/flash/flash.actions";

// api calls
import { getAllFaqs, deleteFaq } from "../../../api/index";

function AllFaqs({ setFlash }) {
  const [showAddFaqPopup, setShowAddFaqPopup] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [faqToEdit, setFaqToEdit] = useState(null);

  async function fetchFaqs() {
    try {
      const response = await getAllFaqs();
      setFaqs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFaqs();
  }, []);

  async function deleteFaqHandler(id, setIsDeleting) {
    setIsDeleting(true);
    try {
      const response = await deleteFaq(id);
      console.log({ response });
      if (response.data.status === "success") {
        await fetchFaqs();
        setFlash({ type: "success", message: "FAQ deleted successfully" });
      }
      setIsDeleting(false);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
      console.log(error);
    }
  }

  return (
    <>
      {showAddFaqPopup && (
        <AddFaqPopup
          setShowPopup={setShowAddFaqPopup}
          fetchFaqs={fetchFaqs}
          setFaqToEdit={setFaqToEdit}
          faqToEdit={faqToEdit}
        />
      )}
      <div className={styles["all-faqs"]}>
        <TitleSection
          title="All FAQs"
          addFunction={() => {
            setShowAddFaqPopup(true);
          }}
        />
        <div className={styles["queries"]}>
          {faqs?.length > 0 ? (
            faqs?.map((query) => (
              <FaqCard
                setFaqToEdit={setFaqToEdit}
                setShowPopup={setShowAddFaqPopup}
                query={query}
                key={query?._id}
                deleteFaqHandler={deleteFaqHandler}
              />
            ))
          ) : (
            <div className={styles["no-queries"]}>
              <h3>No FAQs found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AllFaqs);
