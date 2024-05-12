import React from "react";
import { useSelector } from "react-redux";
import { Table, TableFirstRow, Wrap, RowSpace, TableDataRow } from "./Style";
import { useIntl } from "react-intl";
import IntlMassage from "../utils/IntlMassage";
import TableActions from "./TableActions";
import NotificationAction from "../Pages/notification/NotificationAction";
import LocationLink from "./LocationLink";

export default function TableComponent({
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
                  {intl.formatMessage({ id: el.id }) ===
                  intl.formatMessage({ id: "table.status" }) ? (
                    Data[el.key] === 0 ? (
                      intl.formatMessage({ id: "table.deactive" })
                    ) : (
                      intl.formatMessage({ id: "table.active" })
                    )
                  ):
                  intl.formatMessage({ id: el.id }) ===
                  intl.formatMessage({ id: "table.expired" }) ? (
                    Data[el.key] === 1 ? (
                      intl.formatMessage({ id: "table.expired" })
                    ) : (
                      intl.formatMessage({ id: "table.active" })
                    )
                  )
                  
                  : intl.formatMessage({ id: el.id }) ===
                    intl.formatMessage({ id: "table.locationlink" }) ? (
                    <LocationLink link={Data[el.key]} />
                  ) : Data[el.key] === " " || Data[el.key] === "" ? (
                    "-"
                  ) : (
                    Data[el.key]
                  )}
                </td>
              )
          )}

          {Action.apply && !Action.forNotification ? (
            <td datalable={intl.formatMessage({ id: "table.action" })}>
              <TableActions Data={Data} Action={Action} id={Data.id} />
            </td>
          ) : (
            <td datalable={intl.formatMessage({ id: "table.action" })}>
              <NotificationAction Action={Action} id={Data.id} />
            </td>
          )}
        </TableDataRow>
      </tbody>
      <RowSpace />
    </>
  );
};
