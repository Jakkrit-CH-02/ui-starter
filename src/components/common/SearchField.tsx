import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Accessible name; defaults to "Search" */
  label?: string;
};

export const SearchField = ({ value, onChange, placeholder, label }: Props) => {
  const { t } = useTranslation();

  return (
    <TextField
      type="search"
      size="small"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: { xs: "100%", sm: 280 }, "& .MuiOutlinedInput-root": { backgroundColor: "background.paper" } }}
      slotProps={{
        htmlInput: { "aria-label": label ?? t("common.search") },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
