import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import styles from "./datePicker.module.css";
import DatePicker from "react-date-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface ICustomDatePickerProps {
    date: Value;
    setDate: React.Dispatch<React.SetStateAction<Value>>;
}

export function CustomDatePicker(props: ICustomDatePickerProps) {
    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + 331);

    return (
        <div>
            <DatePicker
                className={styles.calendar}
                clearIcon={<></>}
                calendarClassName={styles.calendarfield}
                onChange={props.setDate}
                value={props.date}
                calendarIcon={<DateRangeRoundedIcon sx={{ color: "#FA5252", mr: 2 }} />}
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
                format="y-MM-dd"
                minDate={new Date()}
                maxDate={maxDate}
                required
            />
        </div>
    );
}
