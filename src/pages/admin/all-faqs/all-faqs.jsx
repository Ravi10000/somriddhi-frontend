import "./all-faqs.styles.scss";

import { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import quries from "./quries";

import AddFaqPopup from "../../../components/add-faq-popup/add-faq-popup";
import { getAllFaqs, deleteFaq } from "../../../api/index";
import FaqCard from "./faq-card/faq-card";

export default function AllFaqs() {
  const [showAddFaqPopup, setShowAddFaqPopup] = useState(false);
  const [faqs, setFaqs] = useState([]);
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
      await fetchFaqs();
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showAddFaqPopup && (
        <AddFaqPopup setShowPopup={setShowAddFaqPopup} fetchFaqs={fetchFaqs} />
      )}
      <div className="all-faqs">
        <TitleSection
          title="All FAQs"
          addFunction={() => {
            setShowAddFaqPopup(true);
          }}
        />
        <div className="queries">
          {faqs?.map((query) => (
            <FaqCard
              query={query}
              key={query?._id}
              deleteFaqHandler={deleteFaqHandler}
            />
            // <div className="query" key={index}>
            //   <h3 className="query-title">{question}</h3>
            //   <p className="query-desc">{answer}</p>
            // </div>
          ))}
        </div>
      </div>
    </>
  );
}
