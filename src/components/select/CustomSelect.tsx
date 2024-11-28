import { InputAdornment, MenuItem, SxProps, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { ChangeEvent, ReactNode } from "react";

export interface ICustomSelectProps {
  menuItems: string[];
  menuItemsValues: string[];
  defaultValue: string | null;
  onChange: (value: string) => void;
  sx?: SxProps;
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  width?: string | number | undefined;
  minWidth?: boolean;
  noBorderRadius?: boolean;
  disabledCount?: number;
}

export function CustomSelect(props: ICustomSelectProps) {
  const { minWidth = true } = props;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const selectedValue = event.target.value;
    props.onChange(selectedValue);
  };

  return (
    <FormControl
      sx={{ width: props.width, minWidth: minWidth ? "fit-content" : null }}
    >
      <TextField
        select
        label={props.label ?? ""}
        value={props.defaultValue}
        onChange={handleChange}
        sx={{
          ...props.sx,
          width: "100%",
          "& .MuiOutlinedInput-root": {
            fontFamily: "Roboto",
            borderRadius: props.noBorderRadius ? "0" : "12px",
            "& fieldset": {
              border: "1px solid #EBEBEB",
            },
            "&:hover fieldset": {
              border: "1px solid #EBEBEB",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #EBEBEB",
            },
          },
        }}
        SelectProps={{
          MenuProps: {
            onClick: (e) => {
              e.preventDefault(); // Prevent the default action
            },
          },
        }}
        InputProps={{
          ...(props.startAdornment
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    {props.startAdornment}
                  </InputAdornment>
                ),
              }
            : {}),
          ...(props.endAdornment
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    {props.endAdornment}
                  </InputAdornment>
                ),
              }
            : {}),
        }}
      >
        {props.menuItems.map((item, index) => (
          <MenuItem key={index}
                    value={props.menuItemsValues[index]}
                    disabled={props.disabledCount ? index >= props.menuItems.length - props.disabledCount : false}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
