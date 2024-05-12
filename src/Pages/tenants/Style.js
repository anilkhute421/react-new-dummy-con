import styled from "styled-components";

export const TabSwitch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 5px;
  flex-wrap: nowrap;
  overflow-x: auto;
`;
export const TabItem = styled.div`
  background: ${({ active }) => (active ? "#145DA0" : "transparent")};
  border-radius: 10px;
  color: ${({ active }) => (active ? "#fff" : "rgba(0,0,0,0.6)")};
  height: 100%;
  padding: 13px 30px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  min-width: max-content;
  //             @media screen and (max-width:767px){
  //                 padding:10px 16px;
  //                 font-size:12px;
  //                 line-height:15px;
  //             }
  //             @media screen and (max-width:450px){
  //                 padding:8px 10px;
  //                 font-size:10px;
  //                 line-height:13px;
  //             }
  //             @media screen and (max-width:400px){
  //                 padding:5.5px;
  //                 font-size:9.5px;
  //                 line-height:11px;
  //             }
`;
export const TenantDeatilHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px 10px;
  @media screen and (max-width: 767px) {
    padding: 20px 10px 10px;
  }
`;
export const TenantName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  #id {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #145da0;
    text-transform: capitalize;
    padding-left: ${({ Dir }) => Dir === "ltr" && "20px"};
    padding-right: ${({ Dir }) => Dir === "rtl" && "20px"};
  }
`;
export const ContactDetail = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .cell {
    display: flex;
    flex-direction: row;
    padding-right: ${({ Dir }) => Dir === "ltr" && "50px"};
    padding-left: ${({ Dir }) => Dir === "rtl" && "50px"};
    padding-top: 13px;
    label {
      font-size: 14px;
      line-height: 17px;
      color: #000000;

      min-width: 80px;
    }
    span {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
  }
`;
