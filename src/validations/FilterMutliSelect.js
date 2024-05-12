import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { SelectWrapper, ListItem, DropDownBox } from "./Style";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { downarrow } from "../utils/images";
import styled from "styled-components";

export default function FilterMultiSelect({
  list,
  placeholder,
  field,
  options,
  ...props
}) {
  const dir = useSelector((state) => state.Language.dir);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(list);
  const ref = useRef();

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  const selectHandle = (ele) => {
    const isAvail = selected.filter((el) => el.id === ele.id);
    if (isAvail.length > 0) {
      const temp = selected.filter((el) => el.id !== ele.id);
      setSelected([...temp]);
    } else {
      setSelected([...selected, ele]);
    }
  };

  const CheckBox = (props) => {
    if (selected.length > 0) {
      for (let i = 0; i < selected.length; i++) {
        if (props.data.id === selected[i].id) {
          return (
            <input
              type="checkbox"
              className="checkBox"
              checked={true}
              onChange={() => null}
            />
          );
        }
      }
    }
    return (
      <input
        type="checkbox"
        className="checkBox"
        checked={false}
        onChange={() => null}
      />
    );
  };
  const Chip = (props) => {
    return <ChipBox>{props.info.status}</ChipBox>;
  };

  return (
    <div className="w-100">
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <SelectWrapper>
          <Selectbox
            Dir={dir}
            {...field}
            {...props}
            className="select-box"
            onClick={toggleShow}
          >
            {selected.length === 0 && placeholder}

            <div className="d-flex w-90 flex-row align-items-center justify-content-between">
              {selected &&
                selected.map((ele, i) => i < 1 && <Chip key={i} info={ele} />)}
              {selected.length > 1 && <div>+{selected.length - 1}More</div>}
            </div>
          </Selectbox>
          {show && (
            <DropDownBox>
              <ul className="select-list">
                {options &&
                  options.map((info, idx) => (
                    <ListItem
                      key={idx}
                      ref={ref}
                      onClick={() => selectHandle(info)}
                    >
                      <div
                        style={{ height: "40px" }}
                        className="d-flex flex-row align-items-center w-100"
                      >
                        {selected.length > 0 ? (
                          <CheckBox data={info} />
                        ) : (
                          <CheckBox data={info} />
                        )}
                        <span className="name" style={{ minWidth: "130px" }}>
                          {info.status}
                        </span>
                      </div>
                    </ListItem>
                  ))}
              </ul>
            </DropDownBox>
          )}
        </SelectWrapper>
      </ClickAwayListener>
    </div>
  );
}

const Selectbox = styled.div`
  width: 100%;
  border: none;

  outline: none;
  padding: 10px 20px;

  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 20px;

  outline: 0;
  color: rgba(0, 0, 0, 0.6);
  &:placeholder {
    font-size: 14px;
    line-height: 17px;
    color: #000;
    opacity: 0.4;
    position: relative;
  }

  background: url(${downarrow}) #fff no-repeat;
  background-position: ${({ Dir }) => (Dir === "ltr" ? "right" : "left")};
  .w-90 {
    width: 90%;
  }
`;

const ChipBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: 30px;
  border: 1px solid grey;
  border-radius: 4px;
  padding-left: 5px;
  padding-right: 5px;
  .cross {
    width: 30px;
    height: 100%;
  }
`;
