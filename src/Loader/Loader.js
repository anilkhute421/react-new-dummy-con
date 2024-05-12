import { CircularProgress } from '@mui/material'
import React from 'react'

import styled from 'styled-components'

function Loader() {
    return (
        <LoaderWrap>
           <CircularProgress color="primary"/>
        </LoaderWrap>
    )
}

export default Loader


const LoaderWrap=styled.div`
 height:100%;
 width:100%;
 display:flex;
 justify-content:center;
 align-items:center;
 min-height:550px; 
`