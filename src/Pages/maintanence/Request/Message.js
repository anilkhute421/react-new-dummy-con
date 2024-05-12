import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { format } from 'timeago.js'
import { Message } from './Styles'

export default function Msg({ msg, Label,handleOpenImg ,status}) {

    const my_id = useSelector(state => state.Auth.data.pm_company_id)
    const Dir = useSelector(state => state.Language.dir)
    const OpenImage=()=>{
        handleOpenImg(msg.message,!status)
    }
     
    if (msg.messageType === 0) {

        return (
            <Message className={msg.senderID === my_id ? Dir === 'ltr' ? "right" : 'left' : Dir === 'rtl' ? 'right' : 'left'}>{msg.message}
                <small className={msg.senderID === my_id ? Dir === 'ltr' ? "my" : 'your' : Dir === 'rtl' ? 'rtltime' : 'your'}>
                    {format(msg.timestamp)}
                </small>
                {Label && <label className={msg.senderID === my_id ? Dir === 'ltr' ? "mylabel" : 'yourlabel' : Dir === 'rtl' ? 'mylabel' : 'yourlabel'}>
                    {msg.senderID === my_id ? "You" : msg.senderName}

                </label>}
            </Message>



        )
    }


    if (msg.messageType === 1) {
        return (
            <Message  title={'Click To Open Image'} style={{cursor:'pointer'}} onClick={OpenImage} className={msg.senderID === my_id ? Dir === 'ltr' ? "right" : 'left' : Dir === 'rtl' ? 'right' : 'left'}>
                <ImageWrap><img src={msg.thumbURL} alt={msg.senderName} /></ImageWrap>
                <small className={msg.senderID === my_id ? Dir === 'ltr' ? "my" : 'your' : Dir === 'rtl' ? 'rtltime' : 'your'}>
                    {format(msg.timestamp)}
                </small>
                {Label && <label className={msg.senderID === my_id ? Dir === 'ltr' ? "mylabel" : 'yourlabel' : Dir === 'rtl' ? 'mylabel' : 'yourlabel'}>
                    {msg.senderID === my_id ? "You" : msg.senderName}
                </label>}
            </Message>
        )
    }
    if (msg.messageType === 2) {
        return (
            <Message className={msg.senderID === my_id ? Dir === 'ltr' ? "right" : 'left' : Dir === 'rtl' ? 'right' : 'left'}>
                <video height="120px" width="200px" src={msg.message} controls>
                  
                </video>
                <small className={msg.senderID === my_id ? Dir === 'ltr' ? "my" : 'your' : Dir === 'rtl' ? 'rtltime' : 'your'}>
                    {format(msg.timestamp)}
                </small>
                {Label && <label className={msg.senderID === my_id ? Dir === 'ltr' ? "mylabel" : 'yourlabel' : Dir === 'rtl' ? 'mylabel' : 'yourlabel'}>
                    {msg.senderID === my_id ? "You" : msg.senderName}

                </label>}
            </Message>
        )
    }
}
const ImageWrap = styled.div`
  width:200px;
  height:auto;
   img{
       height:100%;
       width:100%;
   }
`
