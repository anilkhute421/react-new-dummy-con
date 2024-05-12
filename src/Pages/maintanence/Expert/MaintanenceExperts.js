import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { InputWrap, MyButton, SecondHeader } from "../../../GlobalStyle";
import IntlMassage from "../../../utils/IntlMassage";
import { Icon, Input, NoData, TableLoaderWrap, TableWrap } from "../../Styles";
import MiantanenceTable from "../MiantanenceTable";
import { getApi, postApi } from "../../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import PaginatedItems from "../../../pageCounter/Pagination";
import { exportData } from "../../../export/Export";
import { searchExpert } from "../../../store/action/ExpertMaintanence";
import { FilterStatusSelect, FilterStatusText } from "../Style";
import { useIntl } from "react-intl";

export default function MaintanenceExperts() {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [dataExpert, setDataExpert] = useState([]);
  const [expertPage, setExpertPage] = useState(1);
  const [expertPageTotal, setExpertPageTotal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const dispatch = useDispatch("");
  const keyword = useSelector((state) => state.ExpertMaintanence.keyword);
  const [specialties, setSpecialties] = useState([]);
  const [filterStatus, setFilterStatus] = useState(0);
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const intl = useIntl();

  var arrayForAll = [
    {
      name: intl.formatMessage({ id: "button.All" }),
      id: 0,
    },
  ];

  const getExpertsListing = async (p) => {
    setLoading(true);
    let req = {
      page: p,
      speciality_id: filterStatus,
    };
    let res = await postApi("experts_list_by_company_id", req);

    if (res.status === 200) {
      setDataExpert(res.data);
      setExpertPageTotal(res.pagecount);
      setLoading(false);
    } else {
      setLoading(false);
      setErrorMessage(res.message);
    }
  };

  const getChangedPage = (newpage) => {
    setExpertPage(newpage);
  };

  const getAppendArray = () => {
    arrayForAll.push(...specialties);
  };
  getAppendArray();

  const search = (word) => {
    dispatch(searchExpert(word));
  };
  useEffect(() => {
    dispatch(searchExpert(""));
  }, []);

  const getExpertBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: keyword,
      page: p,
      speciality_id: filterStatus,
    };
    let res = await postApi("search_expert", d);

    if (res.status === 200) {
      setDataExpert(res.data);
      setLoading(false);
      setExpertPageTotal(res.pagecount);
    } else {
      setErrorMessage(res.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword !== "") {
      getExpertBySearch(1);
    } else {
      getExpertsListing(expertPage);
    }
  }, [keyword]);

  useEffect(() => {
    if (filterStatus) {
      getExpertsListing(1);
      setExpertPage(1);
    } else {
      getExpertsListing(expertPage);
    }
  }, [filterStatus]);

  useEffect(() => {
    if (keyword !== "") {
      getExpertBySearch(expertPage);
    } else {
      getExpertsListing(expertPage);
    }
  }, [expertPage]);

  // This is Data Expenses table

  const ExpertsHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.name",
      key: "name",
      show: false,
    },
    {
      id: "table.phoneno",
      key: "phone",
      show: false,
    },
    {
      id: "table.email",
      key: "email",
      show: false,
    },
    {
      id: "table.specialities",
      key: "speciality_name",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const getListingSpecialties = async () => {
    let res = await getApi("specialties_dropdown");
    if (res.status === 200) {
      setSpecialties(res.data);
    }
  };

  const valueChanged = (e) => {
    setFilterStatus(e.target.value);
  };

  useEffect(() => {
    getListingSpecialties();
  }, []);

  const reload = () => {
    getExpertsListing(expertPage);
  };
  const ExpertsformActions = {
    apply: true,
    view: Roles?.expert_view === 1 ? true : false,
    edit: Roles?.expert_edit === 1 ? true : false,
    delete: Roles?.expert_delete === 1 ? true : false,
    openModal: true,
    pathnameEdit: "/home/maintanence/expert/edit",
    reload: reload,
  };

  return (
    <>
      <SecondHeader Dir={dir}>
        <div className="mobile d-flex flex-row align-items-center">
          <InputWrap>
            <Input
              className="mt-0"
              placeholder={intl.formatMessage({ id: "placeholder.search" })}
              type="text"
              value={keyword}
              onChange={(e) => search(e.target.value)}
            />
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <MyButton
            onClick={() => exportData(`${Pm_id}/expert`)}
            className="export-btn"
          >
            <IntlMassage id="button.export" />
          </MyButton>
        </div>

        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-row m-2">
            <FilterStatusText>
              {intl.formatMessage({ id: "button.statusbyfilter" })}
            </FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged}
              value={filterStatus}
              className="d-flex text-center "
              Dir={dir}
            >
              {arrayForAll.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </FilterStatusSelect>
          </div>

          {Roles.expert_create === 1 && (
            <MyButton
              className="m-2"
              style={{ background: "rgba(46, 139, 192, 1)" }}
              onClick={() => history.push("/home/maintanence/addexpert")}
              Dir={dir}
            >
              <IntlMassage id="button.experts"></IntlMassage>
            </MyButton>
          )}
        </div>
      </SecondHeader>
      <TableWrap>
        {loading ? (
          <TableLoaderWrap>
            <CircularProgress />
          </TableLoaderWrap>
        ) : dataExpert && dataExpert.length > 0 ? (
          <>
            <MiantanenceTable
              action={ExpertsformActions}
              headerData={ExpertsHeader}
              startfrom={(expertPage - 1) * 10}
              TableData={dataExpert}
            />
            <PaginatedItems
              currentPage={expertPage - 1}
              pageCount={expertPageTotal}
              getChangedPage={getChangedPage}
              itemsPerPage={10}
            />
          </>
        ) : errorMessage ? (
          <NoData>{errorMessage}</NoData>
        ) : (
          <NoData>
            <IntlMassage id="msg.nodata" />
          </NoData>
        )}
      </TableWrap>
    </>
  );
}
