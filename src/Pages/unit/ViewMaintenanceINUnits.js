import React, { useEffect, useState } from "react";
import IntlMassage from "../../utils/IntlMassage";
import {
  BackLink,
  CardBackground,
  InfoLabel,
  InfoLabelHeader,
  InfoLine,
  InfoValue,
  InfoValueHeader,
  InnnerInfo,
  Label,
  LabelBox,
  NoData,
  PageHeader,
  TableWrap,
} from "../Styles";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import MiantanenceTable from "../maintanence/MiantanenceTable";
import PaginatedItems from "../../pageCounter/Pagination";
import Loader from "../../Loader/Loader";
import { postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";

export default function ViewMaintenanceINUnits(props) {
  const history = useHistory();
  const dir = useSelector((state) => state.Language.dir);
  const back = () => {
    history.goBack();
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const RequestsBuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    // {
    //   id: "table.reqby",
    //   key: "requested_by",
    //   show: false,
    // },
    {
      id: "table.reqid",
      key: "request_code",
      show: false,
    },
    // {
    //   id: "table.building",
    //   key: "building_name",
    //   show: false,
    // },
    // {
    //   id: "table.unitno",
    //   key: "unit_no",
    //   show: false,
    // },
    {
      id: "table.reqfor",
      key: "maitinance_request_name",
      show: false,
    },
    {
      id: "table.status",
      key: "maintance_requests_status",
      show: false,
    },
    {
      id: "table.reqdate",
      key: "date",
      show: false,
    },
    {
      id: "table.experts",
      key: "name",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const RequestsformActions = {
    apply: true,
    view: true,
    pathname: "/home/maintanence/requests/view",
  };

  const getMaintenanceviewDetails = async () => {
    setLoading(true);
    let req = {
      page: page,
      unit_id: props.location.state.id,
    };
    let res = await postApi("maintenance_request_list_by_unit_id", req);
    if (res.status === 200) {
      setData(res.data);
      setPageCount(res.pagecount);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.message, { theme: "colored" });
    }
  };

  const getChangedPage = (changedpage) => {
    setPage(changedpage);
  };

  useEffect(() => {
    getMaintenanceviewDetails();
  }, [page]);

  if (loading) {
    return <Loader />;
  }
  if (!loading && data.length === 0) {
    return (
      <>
        <PageHeader>
          <LabelBox className="d-flex justify-content-between mt-4">
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              {/* <IntlMassage id="units.management" /> */}
              Maintanence Requests
            </Label>
          </LabelBox>
        </PageHeader>
        <CardBackground className="mt-5">
          <NoData>
            <IntlMassage id="msg.nodata" />
          </NoData>
        </CardBackground>
      </>
    );
  }

  return (
    <div>
      <PageHeader>
        <LabelBox className="d-flex justify-content-between mt-4">
          <Label>
            <BackLink Dir={dir} onClick={back}>
              <i className="icon-down-back" />
            </BackLink>
            <IntlMassage id="Maintenance.header.unitview" />
          </Label>
        </LabelBox>
      </PageHeader>

      <CardBackground className="mt-4 px-2 py-4">
        <InfoLine>
          <InfoLabelHeader>
            <IntlMassage id="table.buildingname" />
          </InfoLabelHeader>
          <InfoValueHeader>{data[0].building_name}</InfoValueHeader>
        </InfoLine>

        <InnnerInfo>
          <InfoLine>
            <InfoLabel className="px-2">
              <IntlMassage id="table.unitno" />
            </InfoLabel>
            <InfoValue className="px-2">{data[0].unit_no}</InfoValue>
          </InfoLine>
          <InfoLine>
            <InfoLabel className="px-2">
              <IntlMassage id="table.tenantname" />
            </InfoLabel>
            <InfoValue className="px-2">
              {data[0].first_name + " " + data[0].last_name}
            </InfoValue>
          </InfoLine>
        </InnnerInfo>
      </CardBackground>

      <TableWrap>
        <MiantanenceTable
          action={RequestsformActions}
          headerData={RequestsBuildingHeader}
          startfrom={(page - 1) * 10}
          TableData={data}
        />
        <PaginatedItems
          currentPage={page - 1}
          pageCount={pageCount}
          getChangedPage={getChangedPage}
          itemsPerPage={10}
        />
      </TableWrap>
    </div>
  );
}
