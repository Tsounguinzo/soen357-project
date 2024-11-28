import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import styles from "./dateRangerPicker.module.css";
import { useState } from "react";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import AlertSnackbar from "../common/AlertSnackbar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface ICustomDateRangePickerProps {
  fromToDate: Value;
  setFromToDate: React.Dispatch<React.SetStateAction<Value>>;
}

export function CustomDateRangePicker(props: ICustomDateRangePickerProps) {
  const [selectionError, setSelectionError] = useState<string>("");

  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + 331);

  const handleDateChange = (value: Value) => {
    if (value === null) {
      setSelectionError("");
      props.setFromToDate([null, null]);
      return;
    }
    const [fromDate, toDate] = value as [Date, Date];
    if (fromDate && toDate) {
      const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 7) {
        setSelectionError("Max range is 7 days.");
        return;
      }
    }
    setSelectionError("");
    props.setFromToDate(value);
  };

  const handleCloseSnackbar = () => {
    setSelectionError("");
  };

  return (
    <div>
      <DateRangePicker
        className={styles.calendar}
        clearIcon={<></>}
        calendarClassName={styles.calendarfield}
        onChange={handleDateChange}
        value={props.fromToDate}
        calendarIcon={<DateRangeRoundedIcon sx={{ color: "#FA5252", mr: 2 }} />}
        dayPlaceholder="dd"
        monthPlaceholder="mm"
        yearPlaceholder="yyyy"
        format="y-MM-dd"
        rangeDivider=" "
        minDate={new Date()}
        maxDate={maxDate}
        required
      />
      <AlertSnackbar open={!!selectionError} message={selectionError} handleClose={handleCloseSnackbar}/>
    </div>
  );
}
