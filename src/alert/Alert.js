import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";

import IntlMassage from "../utils/IntlMassage";
// import {useIntl} from 'react-intl'

import { BtnWrap } from "../Pages/Styles";
import { useIntl } from "react-intl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Alert({
  MsgText,
  open,
  handleClose,
  handleConfirm,
}) {

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {MsgText}
          </Typography>
          <BtnWrap>
            <span className="cancel-btn" onClick={handleClose}>
              <IntlMassage id="button.cancel" />
            </span>
            <button className="submit-btn" onClick={handleConfirm}>
              <IntlMassage id="button.confirm" />
            </button>
          </BtnWrap>
        </Box>
      </Fade>
    </Modal>
  );
}
