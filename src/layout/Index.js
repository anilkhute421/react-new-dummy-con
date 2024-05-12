import React from 'react'
import {Wrapper } from '../GlobalStyle'
import { Route,Switch ,Redirect} from 'react-router-dom'
import Login from '../Auth/Login';
import Verify from '../Auth/Verify';
import Forgot from '../Auth/Forgot'
import {Background,FormWrap} from './Style'

export default function Index() {
    const langDirection = "ltr"
    return (
        <Wrapper dir={langDirection}>
            <Background>
                <FormWrap>
                    <Switch>
                        <Route  path="/verify" component={Verify} exact  />
                        <Route  path="/forgot" component={Forgot} exact  />
                        <Route path="/" component={Login} exact />
                        <Redirect to="/" />
                    </Switch>          
                </FormWrap>
            </Background>
        </Wrapper>
    )
}




