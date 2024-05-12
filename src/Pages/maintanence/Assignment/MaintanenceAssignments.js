import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { InputWrap, MyButton, SecondHeader } from "../../../GlobalStyle";
import IntlMassage from "../../../utils/IntlMassage";
import { Icon, Input, TableWrap } from "../../Styles";
import MiantanenceTable from "../MiantanenceTable";

export default function MaintanenceAssignments() {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();

  const AssignmentsBuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
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
      id: "table.reqfor",
      key: "reqfor",
      show: false,
    },
    {
      id: "table.status",
      key: "status",
      show: false,
    },
    {
      id: "table.reqdate",
      key: "reqdate",
      show: false,
    },
    {
      id: "table.assignedexpert",
      key: "assignedexpert",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];
  const AssignmentsDatatable = [
    {
      building: "White Tower",
      unitno: "23",
      reqfor: "AC Repair",
      status: "Request Raised",
      reqdate: "21 Oct 2021",
      assignedexpert: "Andrew",
      action: "active",
    },
    {
      building: "Pearl Parkview",
      unitno: "13",
      reqfor: "AC Repair",
      status: "Request Raised",
      reqdate: "21 Oct 2021",
      assignedexpert: "Jennifer",
      action: "active",
    },
    {
      building: "Green Garden",
      unitno: "54",
      reqfor: "Plumber Service",
      status: "Request Cancel",
      reqdate: "21 Oct 2021",
      assignedexpert: "Parker Sam",
      action: "active",
    },
    {
      building: "Trump Tower",
      unitno: "334",
      reqfor: "Electricity Service",
      status: "Request Raised",
      reqdate: "21 Oct 2021",
      assignedexpert: "Trump Cole",
      action: "active",
    },
    {
      building: "White Tower",
      unitno: "12",
      reqfor: "Plumber Service",
      status: "Request Raised",
      reqdate: "21 Oct 2021",
      assignedexpert: "Alice",
      action: "active",
    },
  ];
  const AssignmentsformActions = {
    apply: true,
    edit: true,
    view: true,
    // pathname: "/home/tenants/view/",
    // pathnameEdit: "/home/tenants/edit/",
  };

  return (
    <>
      <SecondHeader Dir={dir}>
        <div className="mobile d-flex flex-row align-items-center">
          <InputWrap>
            <Input className="search-input" placeholder="Search" type="text" />
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <MyButton className="export-btn">
            <IntlMassage id="button.export" />
          </MyButton>
        </div>
        {/* <div className='d-flex flex-row m-2'>
                    <MaintanenceText>Filter by Status</MaintanenceText>
                    <MaintanenceSelect Dir={dir} >
                            <option>ALL</option>
                            <option>option1 </option>
                            <option>option1 </option>
                            <option>option1 </option>
                    </MaintanenceSelect>   

                    </div> */}
        <MyButton
          className="m-2"
          onClick={() => history.push("/home/maintanence/createrequest")}
          Dir={dir}
        >
          <IntlMassage id="button.createrequest" />
        </MyButton>
      </SecondHeader>

      <TableWrap>
        <MiantanenceTable
          action={AssignmentsformActions}
          headerData={AssignmentsBuildingHeader}
          startfrom={0}
          TableData={AssignmentsDatatable}
        />

        <Pagination />
      </TableWrap>
    </>
  );
}
