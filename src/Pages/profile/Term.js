import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CrossBtn, Item, TermsText, Space, ModalBody } from "./Style";
import IntlMassage from "../../utils/IntlMassage";
import { useSelector } from "react-redux";
import { BaseUrl } from "../../utils/constants";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: "80vh",
  maxWidth: "calc(100% - 48px)",
  bgcolor: "#fff",
  border: "none",
  pt: 3,
  px: 2,
  pb: 3,
  borderRadius: "16px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
};

export default function Term() {
  const dir = useSelector((state) => state.Language.dir);
  const lang = useSelector((state) => state.Language.language);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Item style={{ listStyle: "none" }} Dir={dir} onClick={handleOpen}>
        <IntlMassage id="footer.terms" />
      </Item>
      <Modal
        disableScrollLock={false}
        disableEscapeKeyDown={true}
        open={open}
        aria-labelledby="parent-modal-title"
      >
        <Box sx={style}>
          <CrossBtn Dir={dir} onClick={handleClose}>
            <i className="icon-cross" />
          </CrossBtn>
          <ModalBody>
            <TermsText dir={dir}>
            <iframe
                title="policy"
                src={`${BaseUrl}terms_condition/${lang}/property_manager`}
                style={{width:"100%" , height:"100%"}}
              ></iframe>
            </TermsText>
          </ModalBody>
        </Box>
      </Modal>
    </div>
  );
}
