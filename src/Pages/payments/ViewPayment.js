import React from 'react'
import { BackLink, BtnWrap, Input, Label, LabelBox, PageLabel, PageWrap, Select, TextArea } from '../Styles'
import { AddBuildingBox as AddPaymentBox } from '../buildings/Styles'
import IntlMassage from '../../utils/IntlMassage'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


export default function ViewPayment() {
    const[submit,setSubmit]=React.useState(false)
    const dir = useSelector(state => state.Language.dir)
    const history=useHistory()
    const back=()=>history.goBack()
    
    return (
        <div>
            <PageWrap>
            
            <PageLabel>
                <LabelBox>
                    <Label>
                       {/* <IntlMassage id="unit.add.unit" /> */}
                       <BackLink Dir={dir} onClick={back}><i className="icon-down-back" /></BackLink>
                       Edit Payment
                    </Label>
                </LabelBox>
            </PageLabel>
            <AddPaymentBox>
                    <Select Dir={dir}>
                            <option>Tenant Name</option>
                            <option>option1 </option>
                            <option>option1 </option>
                            <option>option1 </option>
                    </Select>
                    <Select Dir={dir}>
                            <option>Building Name</option>
                            <option>option1 </option>
                            <option>option1 </option>
                            <option>option1 </option>
                    </Select>
                    <Select Dir={dir}>
                            <option>Unit No.</option>
                            <option>option1 </option>
                            <option>option1 </option>
                            <option>option1 </option>
                    </Select>
                    <Select Dir={dir}>
                            <option>Payment Type</option>
                            <option>option1 </option>
                            <option>option1 </option>
                            <option>option1 </option>
                    </Select>
                    <Input type="text" placeholder="Cheque Amount"/>
                    <Input type="text" placeholder="Cheque No." />
                    <Input type="text" placeholder="Cheque Date"  />
                    <Select Dir={dir}>
                            <option>Cheque Status</option>
                            <option>option1 </option>
                            <option>option1 </option>
                            <option>option1 </option>
                    </Select>
                   

            </AddPaymentBox>
            <TextArea placeholder='Remarks'/>
            <BtnWrap>
                        <button className="cancel-btn" onClick={back} ><IntlMassage id="button.cancel" /></button>
                        <button className="submit-btn" onClick={()=>setSubmit(true)} type="submit" ><IntlMassage id="button.submit" /></button>
            </BtnWrap>
        </PageWrap>
        </div>
    )
}
