import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth: '100%',
  bgcolor: 'background.paper',
  border: '0',
  boxShadow: 24,
  p: 2,
  borderRadius: 4
};

export default function VideoModal({ show, hide, videoUrl }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={hide}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box sx={style}>
          <video controls height="500vh" src={videoUrl} width="100%" autoPlay>
     
          </video>
        </Box>
      </Fade>
    </Modal>
  )
}
