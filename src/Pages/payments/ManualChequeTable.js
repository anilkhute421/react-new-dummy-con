import React, { useState } from "react";
import { TableWrap } from "../buildings/Styles";
import PaymentTable from "./PaymentTable";

export default function ManualChequeTable(tabletype) {
  const [page, setPage] = useState(1);

  const PaymentHeader = [
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
      id: "table.cheque",
      key: "cheque",
      show: false,
    },
    {
      id: "table.tenantname",
      key: "tenantname",
      show: false,
    },
    // {
    //   id: "table.building",
    //   key: "building",
    //   show: false,
    // },
    // {
    //   id: "table.unitno",
    //   key: "unitno",
    //   show: false,
    // },
    
    {
      id: "table.paymentdate",
      key: "paymentdate",
      show: false,
    },
    {
      id: "table.paymentStatus",
      key: "paymentStatus",
      show: false,
    },
    {
      id: "table.paymentMethod",
      key: "paymentMethod",
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
      paymentID:"20056",
      cheque: "456789",
      tenantname: "Andrew",
      paymentdate:"12 Feb 2022 ",
      paymentStatus:"Paid",
      paymentMethod:"Cheque",
    },
  
  ];
  const formActions = {
    apply: true,
    edit: true,
    view: true,
    delete: true,

    // pathname: "/home/payments/view/",
    pathnameEdit: "/home/payments/view/",
  };

  const getChangedPage = (newPage) => {
    setPage(newPage);
  };

  return (
    <TableWrap>
      <PaymentTable
          tabletype={tabletype}
          action={formActions}
          headerData={PaymentHeader}
          startfrom={0}
          TableData={Datatable}
        />
      {/* <PaginatedItems
        currentPage={page}
        getChangedPage={getChangedPage}
        pageCount={pageCount}
        itemsPerPage={10}
      /> */}
    </TableWrap>
  );
}
