import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(550px - 84px);
  height: calc(100vh - 84px);
  @media screen and (max-width: 991px) {
    padding-top: 0;
    min-height: calc(550px - 96px);
    height: calc(100vh - 96px);
  }
`;

export const ProfileFooter = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
// ---------profile + edit profile
export const ProfileLabel = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 575px) {
    font-size: 20px;
  }
`;
export const ProfileButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 450px) {
    button {
      font-size: 11px;
      padding: 10px 15px;
    }
  }
`;
export const ChangePassword = styled.button`
  background: #2e8bc0;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  margin-left: ${({ Dir }) => Dir === "rtl" && "20px"};
  margin-right: ${({ Dir }) => Dir === "ltr" && "20px"};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 12px 30px;
  cursor: pointer;
`;
export const EditProfile = styled.button`
  border: none;
  background: #145da0;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 12px 30px;
  cursor: pointer;
`;
export const ProfileDetail = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;

  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-bottom: 30px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
export const ProfileDetailBox = styled.div`
  width: 50%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (max-width: 575px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
export const DetailList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding-bottom: ${({ ID }) => (ID === "last" ? "0" : "20px")};
  padding-bottom: ${({ ID }) => ID === "first-last" && "0px"};
  label {
    min-width: 120px;
    font-size: 14px;
    line-height: 17px;
    font-weight: 400;
    color: #000000;
    max-width: max-content;
  }
  h6 {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    word-wrap: break-word;
  }
  @media screen and (max-width: 767px) {
    padding-bottom: ${({ ID }) => ID === "first-last" && "20px"};
  }
  @media screen and (max-width: 400px) {
    label {
      min-width: 100px;
      font-size: 12px;
    }
    h6 {
      font-size: 12px;
    }
  }
`;

export const Item = styled.li`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);

  @media screen and (max-width: 430px) {
    font-size: 10px;
  }
`;
export const ModalBox = styled.div`
  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 413px;
    max-width: 100%;
    margin: 0 auto;
    pointer-events: auto;
    background-color: unset !important;
    background-clip: padding-box;
    border: none;
    border-radius: 0;
  }
`;
export const CrossBtn = styled.span`
  cursor: pointer;
  position: absolute;
  z-index: 3;
  right: ${({ Dir }) => Dir === "ltr" && "-24px"};
  left: ${({ Dir }) => Dir === "rtl" && "-24px"};
  top: -24px;
  width: 48px;
  height: 48px;
  border-radius: 48px;
  border: none;
  background: #f44336;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
`;
// terms condition style
export const TermsText = styled.p`
  padding-top: 10px;
  font-weight: normal;
  font-size: 14px;
  height: inherit;
  width:100%;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.6);
`;
export const Space = styled.div`
  margin-bottom: 20px;
`;
export const ModalBody = styled.div`
  min-height: 200px;
  width: 100%;
  height: calc(100% - 10px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
// contact us styles
export const AddNotificationBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  input {
    margin-top: 0;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
`;
export const LanguageBox = styled.div`
  padding: 0 20px;
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  input[type="radio"] {
    margin: 0;
  }
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  label {
    padding: 0 6px;
  }
  @media screen and (max-width: 575px) {
    padding: 0;
  }
`;
