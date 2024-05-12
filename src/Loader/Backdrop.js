import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
export default function BackdropLoader({play}) {
    return (
        <Backdrop sx={
            {
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }
        }
        open={play}>
        <CircularProgress color="inherit"/>
    </Backdrop>
    )
}


