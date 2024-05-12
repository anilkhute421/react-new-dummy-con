import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import IntlMassage from "../../utils/IntlMassage";
import { useSelector } from "react-redux";
import {BtnWrap, Input, ModalLabel, ModalWrap,  TextArea} from '../../Pages/Styles'


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth:'100%',
  bgcolor: "transparent",
  border: "none",
  pt: 0,
  px: 0,
  pb: 0,
  borderRadius: "0",
};

export default function AcceptPayment() {
  const dir = useSelector((state) => state.Language.dir);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Dir = useSelector((state) => state.Language.dir);

  return (
    <div>
  
    
      <Modal
      disableScrollLock={false}
        disableEscapeKeyDown={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
      >
        <Box sx={style}>
       

        <ModalWrap Dir={dir}>
        <span className="cross-btn" onClick={handleClose}><i className="icon-cross" /></span>
        <ModalLabel dir={dir}>
        Contact Us
                   {/* <IntlMassage id="footer.terms" /> */}
                </ModalLabel>
                <AddNotificationBox>         
                  <Input placeholder='Name'/>
                  <Input placeholder='Email'/>
                  <Input placeholder='Subject'/>
                 
                    
        </AddNotificationBox>
        <TextArea placeholder='Description' />


        <BtnWrap>
                <button className="cancel-btn " >
                    <IntlMassage id="button.cancel" />
                </button>
                <button className="submit-btn" onClick={() => console.log("I am Clicked")} type="submit" >
                    <IntlMassage id="button.submit" />
                </button>
            </BtnWrap>

        </ModalWrap>
      
        </Box>
      </Modal>
    </div>
  );
}

