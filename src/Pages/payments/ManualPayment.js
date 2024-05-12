import React from 'react'
import { TableWrap } from '../Styles';
import PaymentTable from './PaymentTable';
import Pagination from "../../components/Pagination";


export default function ManualPayment(tabletype) {

    const ManualHeader = [
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
          id: "table.paymentID",
          key: "paymentID",
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
          id: "table.status",
          key: "status",
          show: false,
        },
        {
            id: "table.paymentdate",
            key: "paymentdate",
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
            paymentID: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            paymentdate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2200",
            paymentID: "456789",
            tenantname: "Jennifer",
            building: "White Tower",
            unitno: "23",
            paymentdate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2500",
            paymentID: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            paymentdate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2500",
            paymentID: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            paymentdate: "21 Oct 2021",
            status: "active",
        },
        {
            amount: "$2500",
            paymentID: "456789",
            tenantname: "Andrew",
            building: "White Tower",
            unitno: "23",
            paymentdate: "21 Oct 2021",
            status: "active",
        },

        
      ];
      const formActions = {
        apply: true,
        edit: true,
        view: true,
        pathnameEdit: "/home/payments/view/",
      };
    return (
        <TableWrap>
        <PaymentTable
          tabletype={tabletype}
          action={formActions}
          headerData={ManualHeader}
          startfrom={0}
          TableData={Datatable}
        />
        <Pagination />
      </TableWrap>
    )
}
