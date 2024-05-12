import React, { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import { postApi } from "../../../services/ApiMethod";
import IntlMassage from "../../../utils/IntlMassage";
import {
  BtnWrap,
  LabelMedium,
  ModalLabel,
  ModalWrap,
  TableWrap,
} from "../../Styles";
import TenantsTable from "../TenantsTable";

function TenantReqPayment({
  tenant_unit_id,
  tenant_id,
  modalCancel,
  manuallSubmit,
  ...props
}) {
  const [play, setPlay] = useState(false);
  const [data, setData] = useState({});
  const [listing, setListing] = useState([]);
  const [record, setRecord] = useState([]);


  const dir = useSelector((state) => state.Language.dir);

  const showTenantAction = async () => {
    setPlay(true);
    let req = {
      tenant_id: tenant_id,
      tenant_unit_id: tenant_unit_id,
    };

    let res = await postApi(
      "on_change_tenant_drop_down_of_tenant_unit_edit",
      req
    );
    if (res.status === 200) {
      setData(res);
      setListing(res.list_to_show);
      setRecord(res.record_to_show);
      setPlay(false);
    } else {
      setPlay(false);
    }
  };

  useEffect(() => {
    showTenantAction();
  }, []);

  const PaymentTable = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.payment",
      key: "amount",
      show: false,
    },
    {
      id: "table.type",
      key: "payment_type",
      show: false,
    },
    {
      id: "table.cheque",
      key: "cheque_no",
      show: false,
    },
    {
      id: "table.dateTime",
      key: "payment_date",
      show: false,
    },
    {
      id: "table.paymentStatus",
      key: "status",
      show: false,
    },
  ];

  const formActions = {
    apply: false,
  };

  const ContractTable = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.contractName",
      key: "name",
      show: false,
    },
    {
      id: "table.startDate",
      key: "start_date",
      show: false,
    },
    {
      id: "table.expiryDate",
      key: "end_date",
      show: false,
    },
  ];
  const firstformActions1 = {
    apply: false,
  };

  const modalsubmit = () => {
    updateTenant();
    manuallSubmit();
  };

  const updateTenant = async () => {
    let req = {
      tenant_id: tenant_id,
      accept_decline: 1,
      tenant_unit_id: tenant_unit_id,
      case: data.case,
    };
    let res = await postApi(
      "accept_decline_on_change_tenant_drop_down_of_tenant_unit_edit",
      req
    );
    if (res.status === 200) {
      modalCancel();
    } else {
      toast.info(res.message, { theme: "colored" });
    }
  };

  return (
    <div>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <ModalWrap Dir={dir}>
          <div style={{ display: "flex", textAlign: "center" }}>
            <ModalLabel Dir={dir}>{data.msg_to_show}</ModalLabel>
          </div>
          {listing.length > 0 && (
            <>
              <LabelMedium>Payments</LabelMedium>
              <TableWrap className="mt-0">
                <TenantsTable
                  action={formActions}
                  headerData={PaymentTable}
                  startfrom={0}
                  TableData={listing}
                />
              </TableWrap>
            </>
          )}

          {record.length > 0 && (
            <>
              <LabelMedium>Contracts</LabelMedium>
              <TableWrap className="mt-0">
                <TenantsTable
                  action={firstformActions1}
                  headerData={ContractTable}
                  startfrom={0}
                  TableData={record}
                />
              </TableWrap>
            </>
          )}

          <BtnWrap>
            <button className="cancel-btn" onClick={modalCancel}>
              <IntlMassage id="button.decline" />
            </button>
            <button className="submit-btn" onClick={modalsubmit} type="submit">
              <IntlMassage id="button.accpet" />
            </button>
          </BtnWrap>
        </ModalWrap>
      </Modal>
    </div>
  );
}

export default memo(TenantReqPayment);
