import styles from "./website-content.module.scss";

import TitleSection from "../title-section/title-section";
import ProcessEditable from "../process-editable/process-editable";

export default function WebsiteContent() {
  return (
    <div className={styles["website-content"]}>
      <TitleSection title="website content" noAddButton />
      <div className={styles["process-editable-container"]}>
        <ProcessEditable />
      </div>
    </div>
  );
}
