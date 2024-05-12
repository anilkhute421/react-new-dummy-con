import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableComponent from "../../components/Table";
import {
  BackLink,
  BtnWrap,
  ContractDetail,
  ContractDocBox,
  ContractLabelBox,
  ContractLeased,
  EditBtn,
  Label,
  LabelBox,
  LabelMedium,
  PageLabel,
  PageWrap,
  TableWrap,
  ContractPreviewBox,
  NoData,
  CardBackground,
} from "../Styles";
import Loader from "../../Loader/Loader";
import { docIcon } from "../../utils/images";
import IntlMassage from "../../utils/IntlMassage";
import { SecondaryBtn } from "../../GlobalStyle";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postApi } from "../../services/ApiMethod";
import DeleteDialog from "../../components/DeleteDialog";
import { toast } from "react-toastify";
import { Avialable } from "../unitAvailable/Style";
import { openContractFile } from "../../viewDocument/ViewContract";

export default function ViewContract(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();

  const [data, setData] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const Roles = useSelector((state) => state.Auth.data.role_details);

  const ContractHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.linkedBuilding",
      key: "building_name",
      show: false,
    },
    {
      id: "table.linkedtoUnit",
      key: "unit_no",
      show: false,
    },
    {
      id: "table.tenantID",
      key: "tenant_name",
      show: false,
    },
    // {
    //   id: "table.action",
    //   key: "",
    //   show: true,
    // },
  ];

  const formActions = {
    show: true,
    // unlink: true,
  };

  const viewdetails = async (id) => {
    setLoader(true);
    let d = {
      contract_id: id,
    };

    let res = await postApi(`view_contract_by_contract_id`, d);
    if (res.status === 200) {
      setData(res.data);
      setLoader(false);
    } else {
      setLoader(false);
      setError(true);
    }
  };

  const gotoEdit = () => {
    let id = props.location.state.id;
    history.push("/home/contracts/edit/", (id = { id }));
  };

  const godelete = () => {
    openModal();
  };
  const openModal = () => {
    setOpenDelete(true);
  };
  const closeModal = () => {
    setOpenDelete(false);
  };
  const del = async () => {
    let d = {
      contract_id: props.location.state.id,
    };

    let res = await postApi("delete_contract", d);
    if (res.status === 200) {
      toast.info(res.message, { theme: "colored" });
      closeModal();
      history.push(`/home/contracts/`);
    } else {
      toast.error(res, { theme: "colored" });
    }
  };

  useEffect(() => {
    viewdetails(props.location.state.id);
  }, []);
  if (loader) {
    return <Loader />;
  }
  if (error) {
    return (
      <CardBackground style={{ marginTop: "70px" }}>
        <NoData>Something went wrong.</NoData>
      </CardBackground>
    );
  }
  return (
    <>
      <DeleteDialog
        handleConfirm={() => del()}
        show={openDelete}
        onHide={closeModal}
      />
      <PageWrap>
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
            <IntlMassage id="contract.header.view" />
            </Label>
          </LabelBox>
        </PageLabel>
        <ContractLeased>
          <ContractLabelBox>
            <LabelMedium style={{ padding: "0px" }}>{data.name}</LabelMedium>

            <Avialable className="my-2">
              {data.status === "Deactive" ? (
              <IntlMassage id="contract.expired" />
              ) : (
                <IntlMassage id="unit.info.active" />
              )}
            </Avialable>
          </ContractLabelBox>
          <ContractDetail Dir={dir}>
            <div className="cell">
              <label>
            <IntlMassage id="contract.createOn" />
              </label>
              <span>{data.created_on}</span>
            </div>
            <div className="cell">
              <label>
              <IntlMassage id="contract.startDate" />
              </label>
              <span>{data.start_date}</span>
            </div>
            <div className="cell">
              <label>
              <IntlMassage id="contract.endDate" />
              </label>
              <span>{data.end_date}</span>
            </div>
          </ContractDetail>
          <div className="d-flex align-items-center flex-wrap">
            {data.all_files &&
              data.all_files.map((ele, idx) => (
                <ContractPreviewBox key={idx}>
                  <ContractDocBox>
                    <img
                      src={
                        ele.file_name.toString().includes(".pdf")
                          ? docIcon
                          : ele.file_name
                      }
                      alt=""
                    />
                  </ContractDocBox>
                  <i
                    className="icon-view"
                    onClick={() => openContractFile(ele.file_name)}
                  />
                </ContractPreviewBox>
              ))}
          </div>
          <BtnWrap className="justify-content-end">
            {data.status === "Deactive" ? (
              <EditBtn style={{ background: "grey" }}>
                <IntlMassage id="button.edit" />
              </EditBtn>
            ) : (
              <EditBtn onClick={gotoEdit}>
                <IntlMassage id="button.edit" />
              </EditBtn>
            )}
            {Roles.contracts_management_delete === 1 && (
              <SecondaryBtn onClick={godelete} style={{ margin: "0px 10px" }}>
                <IntlMassage id="button.delete" />
              </SecondaryBtn>
            )}
          </BtnWrap>
        </ContractLeased>

        <TableWrap>
          <TableComponent
            action={formActions}
            headerData={ContractHeader}
            startfrom={0}
            TableData={[data]}
          />
        </TableWrap>
      </PageWrap>
    </>
  );
}
