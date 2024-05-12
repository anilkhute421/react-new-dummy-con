import React from "react";
import { Autocomplete } from "@mui/material";
import styled from "styled-components";
import { downarrow } from "../utils/images";
import { useSelector } from "react-redux";

export default function SelectWithSearch({
  placeholder,
  options,
  updateSelectedOption,
}) {
  const dir = useSelector((state) => state.Language.dir);

  return (
    <div style={{ position: "relative" }}>
      <Autocomplete
        id="filter-demo"
        options={options}
        getOptionLabel={(option) => option.name}
        sx={{
          "& input": {
            width: "100%",
            bgcolor: "background.paper",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        onChange={(e, newvalue) => updateSelectedOption(newvalue)}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <SearchSelect dir={dir}
              placeholder={placeholder}
              type="text"
              {...params.inputProps}
            />
          </div>
        )}
      />
    </div>
  );
}

const SearchSelect = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 20px;
  background: url(${downarrow}) #ffffff no-repeat;
  background-position: ${({ dir }) => (dir === "ltr" ? "right" : "left")};
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  // margin-top: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 1);
  &:placeholder {
    font-size: 14px;
    line-height: 17px;
    color: #000;
    opacity: 0.4;
    height: 40px;
  }
`;
