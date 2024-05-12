import styled from "styled-components"



export const InputGrid=styled.div`
input{
    margin:0;
}  
  margin-top:20px;
   display:grid;
   grid-template-columns:repeat(2,1fr);
   gap:20px;
   @media screen and (max-width:600px){
    grid-template-columns:repeat(1,1fr);
   }
`
