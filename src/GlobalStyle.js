import styled, { createGlobalStyle } from "styled-components";
import { calIcon } from "./utils/images";

export const GlobalStyle = createGlobalStyle`
*{
    box-sizing:border-box;
    padding:0;
    margin:0;
    font-family: 'Montserrat', sans-serif;
    outline:none;
    }
    body{
        font-family: 'Montserrat', sans-serif;
        
    }
    .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
     
  
        margin:0 auto;
        pointer-events: auto;
        background-color: transparent;
        background-clip: padding-box;
        border:none;
        border-radius: 0;
    
    }
    .page-link{
        color:black;
        margin:4px;
        border: none;
        border-radius: 6px;
        width: 42px;
        height: 42px;
        background: white;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        display: flex;
        align-items: center;
        justify-content: center;   
    }
    .page-item.active .page-link  {
        background-color: white;
        border: 1px solid rgba(20, 93, 160, 0.6);
        color: black;
    }
    .page-item:hover .page-link{
        background:#145DA0;;
        color:#fff;
    }
     .react-datepicker__input-container input{
        width:100%;
        border:none;
        outline:none;
        padding:10px 20px;
        background:url(${calIcon}) #FFFFFF;
        background-position:${({ Dir }) => Dir === "ltr" && "right center"};
        background-position:${({ Dir }) => Dir === "rtl" && "left center"};
       cursor:pointer;
        background-repeat:no-repeat;   
        box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
        border-radius: 10px;
        margin-top:20px;
        color:rgba(0,0,0,0.6);
        &:placeholder{
        font-size: 14px;
        line-height: 17px;
        color:#000;
        opacity: 0.4;
       height:40px;
    
}
.searchResult{
    position:relative !important;
}
.searchContainer{
    height:auto;
    position:relative;
    
}

.list-group{
    position:absolute !important;
    top:0;
    left:0;
    height:100px;

}
.searchContainer {
    position:relative;
.search-result{
  position:absolute;
  top:100%;
  right:0;
  width:100%;
  max-height:140px;
  z-index:9;
  overflow-Y:auto;
  ul{
      list-style:none;
  }
}
}
.react-toggle--checked .react-toggle-track {
    background-color:red;

}
.react-toggle-track{
    background:red;
    background-color:red;
}

.switch-toggle .react-toggle-track {
    background:red;
    background-color:red;
}
.custom-classname.react-toggle--checked .react-toggle-track {
    background-color: red;
  }


  .myinput{
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 20px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
    border-radius: 10px;
    // margin-top: 20px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    &:placeholder {
      font-size: 14px;
      line-height: 17px;
      color: #000;
      opacity: 0.4;
      height: 40px;
    }
  }
  .btn-cancel{
    color:#FFFFFF;
    background: #145DA0;
    box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
    border-radius: 10px;
    border:none;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    padding:13px 25px; 
    height:42px;
  }
  


`;
export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background:  #E5E5E5;
`;
export const PrimaryBtn = styled.button`
  background: #145da0;
  color: #ffffff;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 13px 40px;
`;
export const MyButton = styled.button`
  color: #ffffff;
  background: #145da0;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 13px 25px;
  height: 42px;
  position: relative;
  margin: 0 10px;
`;
export const SecondaryBtn = styled.button`
  color: #ffffff;
  background: #f44336;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 13px 25px;
  height: 42px;
`;
export const Fluid = styled.div`
  width: 100%;
  min-height: 100vh;
`;
export const InputWrap = styled.div`
  position: relative;
  .search-input {
    margin-top: 0;
  }
  input {
    padding: 10px 40px;
  }
  .mt-0 {
    margin-top: 0;
  }

  @media screen and (max-width: 575px) {
    width: 100%;
  }
`;
export const SecondHeader = styled.div`
  width: 100%;
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: cenetr;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    .mobile {
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  @media screen and (min-width: 768px) {
    .export-btn {
      margin-left: ${({ Dir }) => Dir === "ltr" && "20px"};
      margin-right: ${({ Dir }) => Dir === "rtl" && "20px"};
    }
  }
`;

export const ThirdHeader = styled.div`
  width: 100%;
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: cenetr;
  background: #fff;
  // box-shadow: 0px 2px 8px rgb(61 107 192 / 28%);
  border-radius: 10px;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    .mobile {
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  @media screen and (min-width: 768px) {
    .export-btn {
      margin-left: ${({ Dir }) => Dir === "ltr" && "20px"};
      margin-right: ${({ Dir }) => Dir === "rtl" && "20px"};
    }
  }

  // @media screen and (max-width: 1110px) {
  //   background: #000;
  //   background: #fff;
  //   display: flex;
  //   flex-direction:column;
  // }
`;

export const FilterButton = styled.button`
  background: #fff;
  color: #145da0;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 13px 25px;
  height: 42px;
  position: relative;
  margin: 0 10px;
  cursor: pointer;
  @media screen and (max-width: 413px) {
    margin : 10px;
  }

  img {
    height: 20px;
    margin: 0 2px 0 0;
  }

  p {
    width: 12px;
    margin: 0;
    padding: 0;
    border-radius: 10px;
    height: 12px;
    background: red;
    position: absolute;
    top: 8px;
    right: 10px;
  }
`;

export const DateIcon = styled.div`
  position: absolute;
  top: 60%;
  left: ${({ Dir }) => Dir === "rtl" && "10px"};
  right: ${({ Dir }) => Dir === "ltr" && "10px"};

  .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
    color: #145da0;
  }
`;

export const InputDate = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 5px;
  font-size: 14px;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 1);
  &:placeholder {
    font-size: 14px;
    line-height: 17px;
    color: #000;
    opacity: 0.4;
    height: 40px;
  }
`;
