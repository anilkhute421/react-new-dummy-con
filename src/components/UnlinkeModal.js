import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { BtnWrap, ModalLabel, ModalWrap } from "../Pages/Styles";
import { useSelector } from "react-redux";
import IntlMassage from "../utils/IntlMassage";
import { postApi } from "../services/ApiMethod";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CircularProgress } from "@mui/material";

export default function UnlinkeModal({ show, onHide, tenant_id }) {
  const Dir = useSelector((state) => state.Language.dir);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAccptDeline, setShowAccptDeline] = useState("");
  const history = useHistory();
  const back = () => history.goBack();

  const unlinked = async () => {
    let req = {
      tenant_id: tenant_id,
    };
    let res = await postApi("unlinked_for_tenant_view", req);
    console.log(res, "resUNLInKED");
    if (res.status === 200) {
      setData(res);
      setShowAccptDeline(res.show_confirm_decline_buttons);
    }
  };

  const sumbit = async () => {
    let req = {
      tenant_id: tenant_id,
      accept_decline: 1,
    };
    let res = await postApi("unlinked_confirm_decline_for_tenant_view", req);
    console.log(res, "Accpet Decline------------");
    if (res.status === 200) {
      setLoading(false);
      back();
      toast.info(res.message, { theme: "colored" });
    } else {
      setLoading(false);
      toast.info(res.message, { theme: "colored" });
    }
  };

  useEffect(() => {
    unlinked();
  }, []);

  return (
    <div>
      <Modal
        backdrop="static"
        size="md"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <ModalWrap Dir={Dir}>
          <span className="cross-btn" onClick={onHide}>
            <i className="icon-cross" />
          </span>
          <ModalLabel Dir={Dir} className="d-flex text-center ">
            {data.msg_to_show}
          </ModalLabel>
          {showAccptDeline === 0 ? (
            <BtnWrap>
              <button className="submit-btn" onClick={onHide}>
                <IntlMassage id="button.ok" />
              </button>
            </BtnWrap>
          ) : (
            <BtnWrap>
              <button className="cancel-btn" onClick={onHide}>
                <IntlMassage id="button.decline" />
              </button>
              {loading ? (
                <CircularProgress />
              ) : (
                <button className="submit-btn" onClick={sumbit} type="submit">
                  <IntlMassage id="button.accpet" />
                </button>
              )}
            </BtnWrap>
          )}
        </ModalWrap>
      </Modal>
    </div>
  );
}
