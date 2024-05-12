import React, { useEffect, useState } from "react";
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
import PaymentTable from "../payments/PaymentTable";
import PaginatedItems from "../../pageCounter/Pagination";
import { postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import IntlMassage from "../../utils/IntlMassage";

export default function ViewPaymentINUnits(props) {

  const history = useHistory();
  const dir = useSelector((state) => state.Language.dir);
  const back = () => {
    history.goBack();
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page , setPage] = useState(1)
  const [pageCount , setPageCount] = useState(1)

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
    // {
    //   id: "table.tenantname",
    //   key: "tenant_name",
    //   show: false,
    // },
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
      id: "table.paymentdate",
      key: "payment_date",
      show: false,
    },
    {
      id: "table.paymentStatus",
      key: "status",
      show: false,
    },
    {
      id: "table.paymentMethod",
      key: "payment_type",
      show: false,
    },

    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const formActions = {
    apply: true,
    view: true,
  };

  const getPaymentviewDetails = async () => {
    setLoading(true);
    let req = {
      page: page,
      unit_id: props.location.state.id,
    };
    let res = await postApi("payment_list_by_unit_id", req);
    if (res.status === 200) {
      setData(res.data);
      setPageCount(res.pagecount)
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
    getPaymentviewDetails();
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
            <IntlMassage id="sidebar.payments" />
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
            <IntlMassage id="sidebar.payments" />
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
        <PaymentTable
          action={formActions}
          headerData={PaymentHeader}
          startfrom={page < 1 ? 0 : (page - 1) * 10}
          TableData={data}
        />
        <PaginatedItems
          currentPage={0}
          pageCount={pageCount}
          getChangedPage={getChangedPage}
          itemsPerPage={10}
        />
      </TableWrap>
    </div>
  );
}
