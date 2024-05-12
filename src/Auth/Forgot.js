import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { PrimaryBtn } from '../GlobalStyle'
import { login_Logo } from '../utils/images'
import { Formik} from 'formik';
import {postApi} from '../services/ApiMethod'
import { LoginForm, FieldWrap, IconWrap, Icon, InputField, LogoWrap, Logo, Logintext } from './Style'
import { ForMikWrap } from '../Pages/Styles'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import { useHistory } from 'react-router-dom'

export default function Forgot() {
    const history=useHistory()
    const langDirection = useSelector(state => state.Language.dir)
    const[loading,setLoading]=useState(false)
    const[passwordGenerated,setPasswordGenerated]=useState(false)
    const SubmitHandler = async(values) => {
            setLoading(true)
            let res=await postApi('forgot_password_email',values)
            if(res.status===200){
                setLoading(false)
                setPasswordGenerated(true)
            }
            else{
                setLoading(false)
                toast.error(res,{theme:'colored'})
                setPasswordGenerated(false)
            }
         
    }
    const goToLogin=()=>{
        history.replace('/')
    }
    return (
        <Formik
        initialValues={{ email: ''}}
        validate={values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            return errors;
        }}
        onSubmit={(values) => {
            SubmitHandler(values)
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
           
         
        }) => (
        <LoginForm onSubmit={handleSubmit}>
            <LogoWrap>
                <Logo src={login_Logo} alt="contolio" />
            </LogoWrap>
            <Logintext >
                Forgot Password
            </Logintext>
                        {passwordGenerated?
                        <span className='generate-password-text'>New Generated Password has been sent to your email address.</span>
                        :<ForMikWrap>
                            <FieldWrap>
                                <InputField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                    placeholder="Email" type="text"
                                     value={values.email} 
                                 />
                                <IconWrap>
                                    <Icon Direction={langDirection} viewBox="0 0 14 12"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M0.129731 1.95507C0.253995 1.56197 0.73689 1.48591 1.05883 1.74346L5.25085 5.09709C6.27347 5.91518 7.72653 5.91518 8.74916 5.09709L12.9412 1.74346C13.2631 1.48591 13.746 1.56197 13.8703 1.95507C13.9546 2.22167 14 2.50551 14 2.79997V8.39997C14 9.94634 12.7464 11.2 11.2 11.2H2.8C1.2536 11.2 0 9.94634 0 8.39997V2.79997C0 2.50551 0.0454509 2.22167 0.129731 1.95507Z" fill="#145DA0"/>
<path d="M1.93216 0.649278C1.73449 0.491141 1.76757 0.184107 2.01048 0.112854C2.26088 0.0394031 2.52584 0 2.8 0H11.2C11.4742 0 11.7391 0.0394031 11.9895 0.112854C12.2324 0.184107 12.2655 0.491141 12.0679 0.649278L7.87458 4.00389C7.3633 4.41294 6.6367 4.41294 6.12542 4.00389L1.93216 0.649278Z" fill="#145DA0"/>
                                    </Icon></IconWrap>
                            </FieldWrap>
                            {errors.email && touched.email && <p className='err-msg'>{errors.email}</p>}
                        </ForMikWrap>}
                        <BtnWrap>
                            {loading?<CircularProgress/>:passwordGenerated?<PrimaryBtn onClick={goToLogin}>OK</PrimaryBtn>: <PrimaryBtn type="submit">VERIFY</PrimaryBtn>}
                        </BtnWrap>
        </LoginForm>
            )}
            </Formik>
    )
}



const BtnWrap = styled.div`
      width:100%;
     display:flex;
     justify-content:center;
     margin-top:30px;
`

