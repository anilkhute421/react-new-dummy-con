import styled from "styled-components";

export const LoginForm = styled.form`
          width:394px;
          max-width:100%;
          box-shadow:0 10px 30px 0 rgba(0, 0, 0, 0.25);
          background:#FFFFFF;
          border-radius:16px;
          padding:40px 50px;
          @media screen and (max-width:575px){    
          padding:40px 15px;
         }
         .formik-wrap{
            //  margin-bottom:10px;
             
         }
         .formik-wrap p{
             margin:0;
             color:#F44336;
             font-size:10px;
             font-weight:500;
             transform:translateY(-10px);


         }
        .generate-password-text{
                font-size:18px;
                line-height:24px;
        }
       .otp{
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
        border-radius: 10px;    
        // width: 3rem;
        height: 48px;
        margin:0 7px;
        padding:0px 0px;
        border:none;
        outline:none;
        font-size: 16px;
        font-weight: 400;

        line-height: 20px;
       }
      .otp-error{
              border:1px solid red;
      }
`
export const LogoWrap = styled.div`
         width:100%;
         text-align:center;

`
export  const Logo = styled.img`
         height:100px;        
`
export const Logintext = styled.p`
         text-align:center;
         font-weight: 400;
         font-size: 20px;
         line-height: 24px;       
         color: #000000;
         padding-top:40px;
         padding-bottom:20px;
         span{
             width:90%;
            font-weight: normal;
            font-size: 10px;
            line-height: 12px;
            text-align:center;
            
            color: rgba(0,0,0,0.4);

         }

`
export const InputField = styled.input`       
           background: #FFFFFF;
           box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
           border-radius: 10px;
           width:100%;
           border:none;
           padding:14px 44px;
           height: 48px;
           font-weight: normal;
           font-size: 16px;
            line-height: 20px;
            color: rgba(0,0,0,0.8);
            &:placeholder{
            color: rgba(0,0,0,0.4);
            }
`
export const FieldWrap = styled.div`
           position:relative;
           width:100%;
           margin-bottom:10px;
`
export const Icon = styled.svg`
          height:18px;
        width:18px;        
`
export const IconWrap = styled.div`
position:absolute;
top:50%;
left:${({ Direction }) => Direction === "ltr" && '0px'};
right:${({ Direction }) => Direction === "rtl" && '0px'};
transform:translateY(-50%);
height:100%;
width:44px;
text-align:center;
display:flex;
justify-content:center;
align-items:center;
`
export const ForgetWrap = styled.div`
        width:100%;
        a{
         float:${({ Direction }) => Direction === "ltr" ? 'right' : 'left'};
         font-weight: 400;
          font-size: 12px;
         line-height: 15px;
         color: rgba(0,0,0,0.5);
         
         text-decoration:none;  
        }   
`


// otp page starts here
export const OtpWrap = styled.div`
        width:90%;
       margin:0 auto;
       display:flex;
       flex-diretion:column;
       justify-content:space-around;
       align-items:center;
       input{
               width:48px !important;
       }
`
export const BtnWrap = styled.div`
     width:100%;
    display:flex;
    justify-content:center;
   margin-top:50px;
`
