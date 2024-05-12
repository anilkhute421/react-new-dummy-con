import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  DateIcon,
  FilterButton,
  InputDate,
  InputWrap,
  MyButton,
  SecondHeader,
  ThirdHeader,
} from "../../GlobalStyle";
import IntlMassage from "../../utils/IntlMassage";
import { useIntl } from "react-intl";
import { Icon, Input, Label, LabelBox, PageLabel, PageWrap } from "../Styles";
import ContractTableSwitch from "./ContractTableSwitch";
import { searchContract } from "../../store/action/ContractSearch";
import { exportData } from "../../export/Export";
import { FilterStatusSelect, FilterStatusText } from "../maintanence/Style";
import { FilterIcon } from "../../utils/images";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import { ButtonBase } from "@mui/material";

export default function Contracts() {
  const intl = useIntl();

  const ContractFilter = [
    {
      status: intl.formatMessage({ id: "button.All" }),
      id: 2,
    },
    {
      status: intl.formatMessage({ id: "button.active" }),

      id: 1,
    },
    {
      status: intl.formatMessage({ id: "contract.expired" }),
      id: 0,
    },
  ];

  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const dispatch = useDispatch();
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const keyword = useSelector((state) => state.Contracts.keyword);
  const [filterStatus, setFilterStatus] = useState(ContractFilter[0].id);
  const [filters, setFilters] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const valueChanged = (e) => {
    setFilterStatus(e.target.value);
  };
  const resetFilters = () => {
    setFilterStatus(ContractFilter[0].id);
    setFromDate(null);
    setToDate(null);
  };

  const search = (word) => {
    dispatch(searchContract(word));
  };
  useEffect(() => {
    dispatch(searchContract(""));
  }, []);

  const buttonStyle = {
    color: "#878787",
    padding: "0 10px",
    fontWeight: "500",
    "&:hover": {
      color: "red",
    },
  };

  return (
    <PageWrap>
      <PageLabel>
        <LabelBox>
          <Label>
            <IntlMassage id="label.contractManagement" />
          </Label>
        </LabelBox>
      </PageLabel>
      <SecondHeader Dir={dir}>
        <div className="mobile d-flex flex-row align-items-center">
          <InputWrap>
            <Input
              className="search-input"
              placeholder={intl.formatMessage({ id: "placeholder.search" })}
              value={keyword}
              onChange={(e) => search(e.target.value)}
              type="text"
            />
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <MyButton
            className="export-btn"
            onClick={() => exportData(`${Pm_id}/contracts_tables`)}
          >
            <IntlMassage id="button.export" />
          </MyButton>
        </div>

        <div>
          {Roles.contracts_management_create === 1 && (
            <MyButton
              onClick={() => history.push("/home/contracts/add")}
              Dir={dir}
            >
              <IntlMassage id="button.addnewcontract" />
            </MyButton>
          )}
          <FilterButton onClick={() => setFilters(!filters)} Dir={dir}>
            <img src={FilterIcon} alt="" />
            <IntlMassage id="button.filters" />
          </FilterButton>
        </div>
      </SecondHeader>

      {filters && (
        <ThirdHeader>
          <div className="d-flex flex-row m-2">
            <FilterStatusText>
              <IntlMassage id="button.statusbyfilter" />
            </FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged}
              value={filterStatus}
              className="d-flex text-center "
              Dir={dir}
            >
              {ContractFilter.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.status}
                </option>
              ))}
            </FilterStatusSelect>
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FilterStatusText>
                <IntlMassage id="filters.Choosedate" />
              </FilterStatusText>
              <div style={{ margin: "0 10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="From"
                    value={fromDate}
                    onChange={(newValue) => {
                      setFromDate(newValue);
                    }}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <InputDate
                          ref={inputRef}
                          {...inputProps}
                          readOnly
                          placeholder={intl.formatMessage({
                            id: "filters.From",
                          })}
                        />
                        <DateIcon Dir={dir}>
                          {InputProps?.endAdornment}
                        </DateIcon>
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </div>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To"
                  value={toDate}
                  onChange={(newValue) => {
                    setToDate(newValue);
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <InputDate
                        ref={inputRef}
                        {...inputProps}
                        readOnly
                        placeholder={intl.formatMessage({
                          id: "filters.To",
                        })}
                      />
                      <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <ButtonBase sx={buttonStyle} onClick={resetFilters}>
            <IntlMassage id="filters.Reset" />
          </ButtonBase>
        </ThirdHeader>
      )}

      <ContractTableSwitch
        filterStatus={filterStatus}
        fromDate={fromDate}
        toDate={toDate}
      />
    </PageWrap>
  );
}
