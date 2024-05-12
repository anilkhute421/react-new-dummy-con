import React, { useMemo, useState } from "react";
import MaintanenceExpenses from "./Expense/MaintanenceExpenses";
import MaintanenceExperts from "./Expert/MaintanenceExperts";
import MaintanenceRequests from "./Request/MaintanenceRequests";

export default function MaintanenceTableSwitch(props) {
  const [activetab, setActivetab] = useState(props.Tab);

  useMemo(() => {
    setActivetab(props.Tab);
  }, [props.Tab]);

  return (
    <>
  {activetab && activetab === "Requests" ? (
    <MaintanenceRequests />
  ) :
  activetab === "Expenses" ? (
    <MaintanenceExpenses />
  ) : activetab === "Experts" && (
    <MaintanenceExperts />
  ) }
    </>
  );
}
