import "./all-faqs.styles.scss";

import { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import quries from "./quries";

import axios from "axios";
import AddFaqPopup from "../../../components/add-faq-popup/add-faq-popup";
import { getAllFaqs } from "../../../api/";
export default function AllFaqs() {
  const [showAddFaqPopup, setShowAddFaqPopup] = useState(false);
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await getAllFaqs();
        // const response = await axios.get("http://3.108.161.80:8002/api/faq");
        // console.log({ response });
        setFaqs(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {showAddFaqPopup && <AddFaqPopup setShowPopup={setShowAddFaqPopup} />}
      <div className="all-faqs">
        <TitleSection
          title="All FAQs"
          addFunction={() => {
            setShowAddFaqPopup(true);
          }}
        />
        <div className="queries">
          {faqs?.map(({ question, answer }, index) => (
            <div className="query" key={index}>
              <h3 className="query-title">{question}</h3>
              <p className="query-desc">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
