import styled from "styled-components";
import {
    LoginBackground
} from "../utils/images";

export const Background = styled.div `
            width:100%;
            min-height:100vh;
            background-image:url(${LoginBackground});
            background-size:cover;
            position:relative;
            z-index:1;
            
`

export const FormWrap = styled.div `
           width:100%;
           min-height:100vh;
           display:flex;
           align-items:center;
           justify-content:center;
           position:relative;
           z-index:4;
           padding-top:30px;               
           padding-bottom:30px;               
`
export const Logo = styled.img `
@media screen and (max-width:400px){
    height:45px;
}
  
`
export const MobileNav = styled.div `
   width:100%;
   height:60px;
   display:flex;
   flex-direction:row;
   align-items:center;

   justify-content:space-between;
// box-shadow: -6px -2px 20px rgb(0 0 0 / 25%);
   @media screen and (min-width:992px){
       display:none;
   }
   >div{
       display:flex;
       align-items:center;


   }

`
export const Hamburger = styled.div `
 
              position:${({ open }) => open ? 'fixed' : 'relative'};
              left:${({ Dir, open }) => Dir === 'ltr' && open && '270px'};
              right:${({ Dir, open }) => Dir === 'rtl' && open && '270px'};
              transition:all ease-in 0.4s;   
              z-index:10;
               display:none;
              width:40px;
             height:40px;
             background:transparent;
             border-radius:5px;
             margin-right:${({ Dir }) => Dir === 'ltr' && '10px'};
             margin-left:${({ Dir }) => Dir === 'rtl' && '10px'};
             @media only screen and (max-width:991px){
             display:flex;
             top:0px;
             cursor: pointer;
              width: 2rem;
            height: 1.8rem;
            justify-content: space-between;
           flex-direction: column;

> div {
  height: 2px;
  background-color: ${({ open }) => (open ? "#145DA0" : '#145DA0')};
  transition: 0.5s;
  z-index: 99;
}
> div:nth-child(1) {
    transform:  ${({ open }) => (open ? "translateY(15px) rotate(45deg)" : '')};
}
 > div:nth-child(2) {
    opacity: ${({ open }) => (open ? "0" : '1')};
}
 > div:nth-child(3) {
    transform: ${({ open }) => (open ? "translateY(-15px) rotate(-45deg)" : '')}; ;
}
@media screen and (max-width:400px){
    width:1.8rem;   
    height: 1.4rem;
}
`

export const ContentBox = styled.div `
     width:100%;
     background: rgba(20, 93, 160, 0.05);
     min-height:100vh; 
     display:flex;
     flex-direction:column;
     justify-content:space-between; 
   
`
export const DesktopGap = styled.div `
    padding-top:36px;
    padding-right:40px;
    padding-left:40px;
    width:100%;
    height:auto;
    @media screen and (max-width:575px){
        padding-left:15px;
        padding-right:15px;
    }
`
export const PageWrap = styled.div `
      min-height:550px;
      position:relative;
    
  @media screen and (min-width:992px){
    padding-left:${({ Dir }) => Dir === 'ltr' && '260px'};
    padding-right:${({ Dir }) => Dir === 'rtl' && '260px'};
  }
      
`
export const PageHeader = styled.div `
      width:100%;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:end;
`
export const LanguageSelect = styled.div `
       width: 94px;
       height: 48px;
       border:none;
       border-radius:10px;
       position:relative;
       background: #FFFFFF;
       font-weight: 600;
       font-size: 14px;
       line-height: 17px;
       color:rgba(0,0,0,0.6);
       box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
       -webkit-appearance: none;
       -moz-appearance:none; 
       appearance:none;
      display:flex;
      justify-content:center;
      align-items:center;
      cursor:pointer;
      transition:all ease-in 0.3s;
      div{
        //   width:45px;
        padding:0 5px;
          display:flex;
          justify-content:space-between;
          text-transform:capitalize;
      }
      .select-icon{
          transition:all ease-in 0s;
          margin:0 3px;
          font-size:8px;
          transform:${({ open }) => !open ? 'rotate(180deg) translateY(5px)' : 'translateY(5px)'}            
      }
      @media screen and (max-width:991px){
          height:40px;
      }   
      @media screen and (max-width:400px){
        width: 74px;
        height:30px;
      }
`
export const List = styled.ul `
width: 100% !important;
justify-content:center !important;
align-items:center ;
cursor:pointer;
border:none;
position:absolute !important;
z-index:4;
top:100%;
left:0;
padding:0; 
background: #FFFFFF;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color:rgba(0,0,0,0.6);
box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
li{
    height:30px;
    // width: 94px;
    display:flex;
    justify-content:center;
    align-items:center;
    &:hover{
        background:rgba(0,0,0,0.1);
    }
}
`
export const BellIcon = styled.i `
       color:#145DA0;
       font-size:28px;
       margin-left:30px;
       margin-right:30px;
       position:relative;
       cursor:pointer;
       @media screen and (max-width:400px){
        margin-left:10px;
        margin-right:10px;
        font-size:20px;
       }
`
export const Dot = styled.span `
background: #F44336;
position:absolute;
height:7px;
width:7px;
border-radius:50%;
top:15%;
right:${({ Dir }) => Dir === 'ltr' && '17%'};
left:${({ Dir }) => Dir === 'rtl' && '17%'};

border:2px solid rgba(20, 93, 160, 0.05);
`
export const Dp = styled.img `
cursor:pointer;
      height:42px;
      width:42px;
      border-radius:50%;
      border:none;
     filter: box-shadow(0px 2px 8px rgba(61, 107, 192, 0.28));
     @media screen and (max-width:400px){
        height:35px;
        width:35px;
     }
`
export const Name = styled.span `
font-weight: 600;
font-size: 16px;
line-height: 20px;
color: #000000;
display:flex;
cursor:pointer;
flex-direction:row;
align-items:center;
@media screen and (min-width:576px){
    margin-left:${({Dir})=>Dir==='ltr'&&'16px'};
margin-right:${({Dir})=>Dir==='rtl'&&'16px'};
}
i{
    margin-left:${({Dir})=>Dir==='ltr'?'10px':'0'};
    margin-right:${({Dir})=>Dir==='rtl'?'10px':'0'};
    font-size:10px;
    
}

`

// dashboard styles

export const ProfileDropDown = styled.ul`
width:200px;
background:#fff;
border-radius:5px;
padding:10px 5px;
position:absolute;

top:calc(100% + 10px);
right:${props => props.Dir === 'ltr' && '0'};
left:${props => props.Dir === 'rtl' && '0'};
box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.50);
transition:all ease-out 0.5s;
list-style:none;
z-index:9;
span{
    height:20px;
    width:20px;
    position:absolute;
    top:-7px;

    right:${props => props.Dir === 'ltr' && '5px'};
left:${props => props.Dir === 'rtl' && '4px'};
    background:#fff;

}
.d{
    transform:rotate(45deg);
}

a.nav-link{
    width:100%;
    padding:8px 0;
    cursor:pointer;
    font-weight:500;
    position:relative;
    z-index:9;
    color:#000;
    cursor:pointer;
    letter-spacing:0.4px;
    border-radius:6px;
    font-size:14px;
    display:flex;
    flex-direction:row;
    text-decoration:none;
    &:hover{
        background:#9dc3d978;
        color:#000;
    }
}
`
export const DropDown = styled.div`
 display:flex;
 flex-direction:column;
position:relative;
`
export const Listitem = styled.li`
  width:100%;
  padding:8px 0;
  cursor:pointer;
  font-weight:500;
  position:relative;
  z-index:9;
  color:#000;
  cursor:pointer;
  letter-spacing:0.4px;
  border-radius:6px;
  font-size:14px;
  display:flex;
  flex-direction:row;
  text-decoration:none;
  &:hover{
      background:#9dc3d978;
      color:#000;
  }
`
export const Icon = styled.img`
height:18px;
width:18px;
margin-left:15px;
margin-right:15px;

`
