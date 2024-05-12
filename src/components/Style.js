import styled from "styled-components";
export const Table = styled.table`
  width: 100%;
  margin-bottom: 2em;
  border-spacing: 0;
  border-collapse: separate;

  @media screen and (max-width: 767px) {
    border-collapse: collapse;
  }
`;
export const Wrap = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  transition: all ease-in 0s;
`;

export const TableFirstRow = styled.tr`
  width: 100%;
  background: #ffffff;
  border: none;
  box-sizing: border-box;
  border-radius: 6px;

  th {
    border-top: none;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    padding: 10px;
    text-transform: capitalize;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const RowSpace = styled.div`
    width:100%;
    height:10px;
    background:transparent:
`;
// table action styled

export const ActionBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  span {
    margin-right: 10px;
  }
`;
export const View = styled.span`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
`;
export const Edit = styled.span`
  cursor: pointer;
  font-size: 17px;
  color: #2e8bc0;
`;
export const Delete = styled.span`
  color: #f44336;
  cursor: pointer;
  font-size: 16px;
`;

export const Approved = styled.span`
width:16px;
height:16px;
border-radius:10px;
background:#20C982;
cursor: pointer;
font-size: 16px;
img {
  width:75%;
  margin : 0 0 2px 2px;
}


`

export const TableDataRow = styled.tr`
  width: 100%;
  background: #ffffff;
  height: auto;
  td {
    padding: 10px;
    border: 1px solid rgba(20, 93, 160, 0.3);
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #000;
    border-right: 0px;
    border-left: 0px;
    &:last-child {
      border-top-right-radius: ${({ Dir }) => Dir === "ltr" && "6px"};
      border-top-left-radius: ${({ Dir }) => Dir === "rtl" && "6px"};
      border-bottom-right-radius: ${({ Dir }) => Dir === "ltr" && "6px"};
      border-bottom-left-radius: ${({ Dir }) => Dir === "rtl" && "6px"};
      border-right: ${({ Dir }) =>
        Dir === "ltr" && "1px solid rgba(20, 93, 160, 0.3)"};
      border-left: ${({ Dir }) =>
        Dir === "rtl" && "1px solid rgba(20, 93, 160, 0.3)"};
    }
    &:first-child {
      border-top-right-radius: ${({ Dir }) => Dir === "rtl" && "6px"};
      border-top-left-radius: ${({ Dir }) => Dir === "ltr" && "6px"};
      border-bottom-right-radius: ${({ Dir }) => Dir === "rtl" && "6px"};
      border-bottom-left-radius: ${({ Dir }) => Dir === "ltr" && "6px"};
      border-right: ${({ Dir }) =>
        Dir === "rtl" && "1px solid rgba(20, 93, 160, 0.3)"};
      border-left: ${({ Dir }) =>
        Dir === "ltr" && "1px solid rgba(20, 93, 160, 0.3)"};
    }
  }

  @media screen and (max-width: 767px) {
    td {
      width: 100%;
      display: block;
      position: relative;
      padding-top: 30px;
      // padding-left: ${({ Dir }) => Dir === "ltr" && "120px"};
      // padding-right: ${({ Dir }) => Dir === "rtl" && "120px"};
      &:before {
        content: attr(datalable);
        position: absolute;
        top: 5px;
        left: ${({ Dir }) => Dir === "ltr" && "5px"};
        right: ${({ Dir }) => Dir === "rtl" && "5px"};

        align-items: center;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: rgba(0, 0, 0, 0.6);
        width: 100%;
        // max-width:max-content;
        word-wrap: break-word;
      }
      border-right: 1px sold rgba(20, 93, 160, 0.3);
      border-left: 1px sold rgba(20, 93, 160, 0.3);
      border-top: 0px;
      border-bottom: 0px;
      border-left: 1px solid rgba(20, 93, 160, 0.3);
      border-right: 1px solid rgba(20, 93, 160, 0.3);
      &:last-child {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;

        border-bottom: 1px solid rgba(20, 93, 160, 0.3);
      }
      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 6px;

        border-top: 1px solid rgba(20, 93, 160, 0.3);
      }
    }
    tr {
      margin-top: 10px;
    }
  }
`;
// j styled

export const Unlink = styled.span`
  color: rgba(46, 139, 192, 1);
  cursor: pointer;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  border-radius: 6px;
  border: 1px solid rgba(20, 93, 160, 0.3);
  padding: 5px 15px;
&:hover{
  background:rgba(46, 139, 192, 1);
  color:#fff;
  box-shadow:1px 2px 7px rgba(20, 93, 160, 0.3);
}

`;

export const viewBtn = styled.span`
  border: 1px solid red;
`;
