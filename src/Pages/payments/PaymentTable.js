import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  RowSpace,
  Table,
  TableDataRow,
  TableFirstRow,
  Wrap,
} from "../../components/Style";
import IntlMassage from "../../utils/IntlMassage";
import PaymentAction from "./PaymentAction";

export default function PaymentTable({
  headerData,
  TableData,
  action,
  startfrom,
}) {
  const direction = useSelector((state) => state.Language.dir);

  return (
    <Wrap>
      <Table Dir={direction}>
        <thead>
          <TableHeader Dir={direction} Data={headerData} />
        </thead>
        {TableData.map((item, i) => (
          <TableRow
            key={i}
            headers={headerData}
            Dir={direction}
            srno={i + 1 + startfrom}
            Data={item}
            Action={action}
          />
        ))}
      </Table>
    </Wrap>
  );
}

const TableHeader = ({ Data }) => {
  return (
    <TableFirstRow>
      {Data.length > 0 &&
        Data.map((item, i) => (
          <th key={i}>
            <IntlMassage id={item.id} />
          </th>
        ))}
    </TableFirstRow>
  );
};

const TableRow = ({ Data, srno, Dir, Action, headers }) => {
  const intl = useIntl();
  return (
    <>
      <tbody>
        <TableDataRow Dir={Dir}>
          <td datalable={intl.formatMessage({ id: "table.Sno" })}>{srno}</td>
          {headers.map(
            (el) =>
              el.show === false && (
                <td
                  className={
                    intl.formatMessage({ id: el.id }) === "Email"
                      ? ""
                      : "text-capitalize"
                  }
                  datalable={intl.formatMessage({ id: el.id })}
                  key={el.key}
                >
                  {Data[el.key] === 0
                    ? "Manual"
                    : Data[el.key] === 1
                    ? "Cheque"
                    : Data[el.key]}
                </td>
              )
          )}

          {Action.apply && (
            <>
              {Action.viewBtn && (
                <td>
                  <ViewBtn>View</ViewBtn>
                </td>
              )}
              <td datalable={intl.formatMessage({ id: "table.action" })}>
                <PaymentAction reqData={Data} Action={Action} id={Data.id} />
              </td>
            </>
          )}
        </TableDataRow>
      </tbody>
      <RowSpace />
    </>
  );
};

const ViewBtn = styled.button`
  border: 1px solid #1873b7;
  box-sizing: border-box;
  border-radius: 6px;
  width: 55px;
  height: 22px;
  background: #fff;
  color: #1873b7;
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
`;
