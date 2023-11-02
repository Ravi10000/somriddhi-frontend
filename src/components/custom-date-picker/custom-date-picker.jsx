import styles from "./custom-date-picker.module.scss";
import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

import { useState } from "react";
import DatePicker from "react-date-picker";

function CustomDatePicker({ label, max, date, setDate }) {
  const [showCalendar, setShowCalendar] = useState(false);
  let maxDate = max || new Date();
  // maxDate.setDate(now.getDate() + 365);
  const datePickerProps = {
    // ...(date && { value: Date.parse(date) }),
  };
  return (
    <div className={styles.datePickerContainer}>
      <button
        className={styles.datePickerBtn}
        onClick={() => setShowCalendar((prevState) => !prevState)}
      >
        <img
          className={styles.calendarIcon}
          src="/calendar.svg"
          alt="date picker"
        />

        {date || <p>{label}</p>}
      </button>
      <DatePicker
        shouldCloseCalendar={() => {
          setShowCalendar(false);
          return true;
        }}
        // minDate={}
        maxDate={maxDate}
        isOpen={showCalendar}
        onChange={(date) =>
          setDate && setDate(dayjs(date).format("YYYY-MM-DD"))
        }
        // value={Date.parse(date)}
        {...datePickerProps}
      />
    </div>
  );
}

export default CustomDatePicker;
