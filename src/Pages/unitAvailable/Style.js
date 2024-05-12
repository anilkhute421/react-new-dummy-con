import styled from "styled-components"

export const ListWrap = styled.div`
   display:flex;
   flex-direction:column;


`
export const UnitWrap=styled.div`
width:100%;
padding-left:10px;
padding-right:10px;
`

export const UnitListWrap = styled.div`
 padding:20px;
 width:100%;
 display:flex;
 flex-direction:row;
 justify-content:flex-start;

 background: #FFFFFF;

 border: 1px solid rgba(61, 107, 192, 0.3);
 box-sizing: border-box;
 border-radius: 6px;
 margin-bottom:10px;
 @media screen and (max-width:575px){
  flex-direction:column;
}
`

export const ListImgWrap = styled.div`

    width:94px;
    min-width:94px;
    height:94px;     
    position:relative;
   margin-right:${({Dir})=>Dir==='ltr' && '20px'};
   margin-left:${({Dir})=>Dir==='rtl' && '20px'};
 img{
     width:100%;
        height:100%;
        object-fit:cover;
        border-radius: 6px;
 }
 @media screen and (max-width:1265px){
  width:150px;
  height:150px;
}
@media screen and (max-width:575px){
  width:100%;
  height:200px;
  margin-bottom:20px;
}

`
export const UnitDetailBox = styled.div`
     display:flex;
     flex-direction:column ;
     justify-content:start;


 
`
export const UnitBtnBox = styled.div`
     display:flex;
     flex-direction:column ;
     justify-content:flex-end;
     align-items:end;
   height:100px;
   @media screen and (max-width:1265px){
    height:auto;
}
@media screen and (max-width:575px){
  .btns{
    margin-top:20px;
  }
}
 
`
export const Row = styled.div`
  display:flex;
  align-items:center;
  flex-direction:row;
  width:100%;
  justify-content:start;
  align-items:start;
 @media screen and (min-width:400px){
  padding-right:${({Dir})=>Dir==='ltr'&&"20px"};
  padding-left:${({Dir})=>Dir==='rtl'&&"20px"};
  >div{
    padding-right:25px;
  }
 }
  
  flex-wrap:wrap;
 
`
export const UnitLabel = styled.h3`
  font-family: Montserrat;
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 20px;
   min-width:70px;
   width:max-content;
   color: ${({ color }) => color};
   text-transform:${({ transform }) => transform};
   @media screen and (max-width:575px){
    font-size: 14px;
   }
`
export const Avialable = styled.div`
border:none;
width:max-content;
background: #2E8BC0;
border-radius: 15px;
color:#fff;
padding:5px 15px;
font-weight: 500;
font-size: 12px;
margin-right:${({Dir})=>Dir==='ltr'&& '10px'};
margin-left:${({Dir})=>Dir==='rtl'&& '10px'};
`
export const Active = styled.span`
border:none;
background: rgba(0, 0, 0, 0.6);
border-radius: 15px;
color:#fff;
padding:5px 15px;  
font-weight: 500;
font-size: 12px;  
`
export const ValueLabel = styled.label`
font-weight: normal;
font-size: 14px;
line-height: 17px;
color: #000000;
min-width:70px;
width:max-content;
padding-bottom:5px;
padding-top:10px;

`
export const UnitValue = styled.label`
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: #000000;
padding-top:10px;
padding-bottom:5px;


`
export const UnitListRight=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:start;
   width:100%;
   flex-wrap:wrap;


`
export const UnitActionBtn=styled.button`
        background: #2E8BC0;
        box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
        border-radius: 10px;
        border:none;
        color:#fff;
        padding:11px 20px;
        font-weight: 600;
        font-size: 12px;
        margin-left:${({Dir})=>Dir==='rtl'&& '10px'};
        margin-right:${({Dir})=>Dir==='ltr'&& '10px'};
        min-width:max-content;
        &:hover{
          background: #2E8Bd0;
          box-shadow: 1px 3px 18px rgba(61, 107, 192, 0.45);
        }


`
export const DetailWrap = styled.div`
      display:flex;
      flex-direction:column;
      @media screen and (max-width:767px){
        flex-direction:column;
      }
`
export const DetailColumn = styled.div`
      width:100%;
      display:flex;
      flex-direction:column;
      @media screen and (min-width:768px){
        padding-left:${({ Dir }) => Dir === 'ltr' && "20px"};
      padding-right:${({ Dir }) => Dir === 'rtl' && "20px"};
      }

`

export const ImageSlideBox = styled.div`
         width:400px;
         max-width:100%;
         @media screen and (max-width:767px){
             width:100%;
             margin-bottom:20px;
         }
          .carousel .thumbs{
            padding:0;
            li{
                height:55px;
                width:55px;
            }
         }
         .carouse0l .thumb.selected{
             border-color: #2E8BC0 !important;
         }
         .carousel .thumb:hover{
            border-color: #2e8bc0b5 !important;
         }
`
export const ImgBox = styled.div`
          width:100%;
          height:260px;
          img{
              width:100%;
              height:100%;
              object-fit:cover;
              border-radius: 6px;
          }
`


export const UnitNo = styled.div`
          display:flex;
          flex-direction:row;
          align-items:center;
          .unitno{
              font-weight: 500;
              font-size: 18px;
              line-height: 22px;
              color: #000000;
          }
          .number{
              font-weight: 600;
              font-size: 18px;
              line-height: 22px;
              color: #000000;
              padding-left:20px;
              padding-right:20px;
          }
          .id{
              font-weight: 500;
              font-size: 14px;
              line-height: 17px;
              color: #145DA0;
              display:flex;
              flex-direction:row;
              text-tranform:uppercase;
          }
`
export const FlexBox = styled.div`
            width:100%;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            flex-wrap:wrap;
            label{
              font-weight: normal;
              font-size: 14px;
              line-height: 17px;
              color: #000000;
              min-width:140px;
            }
            h6{
              font-weight: 500;
              font-size: 14px;
              line-height: 17px;
              color: #000000;
              margin:0;
            }
      .single-value-row{
          padding-bottom:20px;
      
      }
`
export const BuildingInfo = styled.h3`
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
`
export const InfoRow = styled.div`
      display:flex;
      flex-direction:row;
      align-items:start;
      margin-bottom:20px;
      label{
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          color: #000000;
          min-width:80px; 
      }
      span{
          font-weight: 500;
          font-size: 14px;
          line-height: 17px; 
          color: #000000;
      }
`
export const DescriptionLabel=styled.span`
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #000000;

`
export const DescriptionText=styled.p`
        padding-top:10px;
        width:100%;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #000000;
        opacity: 0.6;
`
// add units
export const ImageInputWrap = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
border-radius: 10px;
width:100px;
height:100px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
overflow:hidden;
margin-top:20px;
position:relative;
margin-right:${({ Dir }) => Dir === 'ltr' && "20px"};
margin-left:${({ Dir }) => Dir === 'rtl' && "20px"};
cursor:pointer;
font-size: 10px;
line-height: 12px;
text-align: center;
color: #00A3FF;
img{
    height:30px;
    margin-bottom:10px;
}
input{
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    z-index:2;
    opacity:0;
    cursor:pointer;
}
`
export const FileSelect = styled.div`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  justify-content:evenly;
`
export const CancelImg = styled.div`
 width:36px;
 height:36px;
 background:rgba(0,0,0,0.15);
 position:absolute;
 top:0;
 left:${({ Dir }) => Dir === 'rtl' && '0'};
 right:${({ Dir }) => Dir === 'ltr' && '0'};
 border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
color:#fff;
 cursor:pointer;
`
export const SelectedImgWrap = styled.div`
      background: #FFFFFF;
      box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
      border-radius: 10px;
      width:100px;
      height:100px;
      overflow:hidden;
      margin-top:20px;
      position:relative;
      transition:all ease-in-out 0.5s;
      margin-right:${({ Dir }) => Dir === 'ltr' && "20px"};
      margin-left:${({ Dir }) => Dir === 'rtl' && "20px"};
      img{
        width:100%;
        height:100%;
        border-radius: 10px;
        border:none;
        outline:none;
}`
