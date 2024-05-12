import React from 'react'
import { TableWrap } from '../Styles';
import Pagination from "../../components/Pagination";
import PaymentTable from './PaymentTable';


export default function ChequePayment( tabletype ) {

    const ChequeHeader = [
        {
          id: "table.Sno",
          key: "sno",
          show: true,
        },
        {
          id: "table.amount",
          key: "amount",
          show: false,
        },
        {
          id: "table.cheque",
          key: "cheque",
          show: false,
        },
        {
          id: "table.tenantname",
          key: "tenantname",
          show: false,
        },
        {
          id: "table.building",
          key: "building",
          show: false,
        },
        {
          id: "table.unitno",
          key: "unitno",
          show: false,
        },
        {
          id: "table.chequedate",
          key: "chequedate",
          show: false,
        },
        {
          id: "table.action",
          key: "",
          show: true,
        },
      ];
      const Datatable = [
        {
            amount: "$2500",
            cheque: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            chequedate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2200",
            cheque: "456789",
            tenantname: "Jennifer",
            building: "White Tower",
            unitno: "23",
            chequedate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2500",
            cheque: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            chequedate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2500",
            cheque: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            chequedate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2500",
            cheque: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            chequedate: "21 Oct 2021",
            status: "active",
        },

        
      ];
      const formActions = {
        apply: true,
        edit: true,
        view: true,
 

        // pathname: "/home/payments/view/",
        pathnameEdit: "/home/payments/view/",
      };
      

     
    return (
        <TableWrap>
        <PaymentTable
          tabletype={tabletype}
          action={formActions}
          headerData={ChequeHeader}
          startfrom={0}
          TableData={Datatable}
        />
        <Pagination />
      </TableWrap>
    )
}
