import { Box, ButtonBase } from "@mui/material";

export type FilterOption<T extends string> = {
  value: T;
  label: string;
  /** Number shown after the label */
  count?: number;
};

type Props<T extends string> = {
  /** Accessible name of the group, e.g. "Filter by status" */
  label: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

/** A row of pill buttons where exactly one is selected. */
export const FilterChips = <T extends string>({ label, options, value, onChange }: Props<T>) => (
  <Box
    role="group"
    aria-label={label}
    display="flex"
    gap={1}
    // Phones: one scrollable row. Wider screens: wrap.
    sx={{ flexWrap: { xs: "nowrap", sm: "wrap" }, overflowX: { xs: "auto", sm: "visible" }, py: 0.5 }}
  >
    {options.map((option) => {
      const selected = option.value === value;
      return (
        <ButtonBase
          key={option.value}
          aria-pressed={selected}
          onClick={() => onChange(option.value)}
          sx={(theme) => {
            const { petrol, paper, lineStrong, canvas } = theme.tokens.color;
            return {
              flex: "none",
              gap: 1,
              minHeight: 36,
              "@media (pointer: coarse)": { minHeight: 44 },
              px: 1.75,
              borderRadius: `${theme.tokens.radius.pill}px`,
              border: 1,
              borderColor: selected ? petrol[700] : lineStrong,
              backgroundColor: selected ? petrol[700] : paper,
              color: selected ? "primary.contrastText" : "text.primary",
              typography: "subtitle2",
              "&:hover": { backgroundColor: selected ? petrol[500] : canvas },
            };
          }}
        >
          {option.label}
          {option.count !== undefined && (
            <Box component="span" sx={{ opacity: 0.72, fontVariantNumeric: "tabular-nums" }}>
              {option.count}
            </Box>
          )}
        </ButtonBase>
      );
    })}
  </Box>
);
