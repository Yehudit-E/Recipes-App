import { Control, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface InputProps {
  name: string;
  control: Control<any>;
  label: string;
  multiline?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = ({ name, control, label, multiline = false, rows = 1 }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          multiline={multiline}
          rows={rows}
          error={!!error}
          helperText={error?.message}
          sx={{ marginBottom: "16px" }}
        />
      )}
    />
  );
};

export default Input;