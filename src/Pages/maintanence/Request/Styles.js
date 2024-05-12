import styled, { createGlobalStyle } from "styled-components";

export const Chatbox = styled.div`
  width: 400px;
  max-width: 100%;
  max-height: 100vh;
  position: absolute;
  background: #fff;
  z-index: 101;
  top: 0;
  right: ${({ Dir }) => Dir === "ltr" && "0"};
  left: ${({ Dir }) => Dir === "rtl" && "0"};
  @media screen and (max-width: 575px) {
    width: 100%;
  }

  .scroll {
    float: left;
    clear: both;
    z-index: 1;
  }
  .left {
    float: left;
    border-right: 0;
    background: #e7eef5;
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
    position: relative;
    clear: both;
    z-index: 1;
  }
  .left:after {
    top: 10px;
    transform: translateX(0px) rotate(-88deg);
    right: calc(100% - 5px);

    width: 0;
    height: 0;

    position: absolute;
    border-right-color: #e7eef5;
    border-left: 0;
  }

  .right {
    float: right;
    background: #145da0;
    color: #fff;
    clear: both;
    position: relative;
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.48);
  }

  .right:after {
    top: 10px;
    transform: translateX(0px) rotate(88deg);
    width: 0;
    height: 0;
    left: calc(100% - 7px);
    position: absolute;
    border-left-color: #145da0;
    border-right: 0;
  }
  .rtltime {
    position: absolute;
    top: -18px;

    min-width: max-content;
    color: #0009;
    font-size: 8px;
    display: block;
    left: 7px;

    padding: 2px 3px;
  }
  .your {
    position: absolute;
    top: -18px;

    min-width: max-content;
    color: #0009;
    font-size: 8px;
    display: block;
    right: 7px;

    padding: 2px 3px;
  }
  .my {
    position: absolute;
    top: -18px;
    left: 0;
    min-width: max-content;
    color: #0009;
    font-size: 8px;
    display: block;

    padding: 2px 3px;
  }
`;
export const ChatWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const GlobalStyle = createGlobalStyle`
  body{
      overflow:hidden;
  }
`;
export const ChatHeader = styled.div`
  width: 100%;
  height: 54px;
  background: #fff;
  padding: 20px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin: 0;
    color: #000000;
  }

  .innerDiv {
    width: calc(100% - 40px);
  }
  @media screen and (max-width: 575px) {
    h4 {
      font-size: 18px;
      line-height: 22px;
    }
    padding: 10px 10px 10px;
  }
`;
export const HR = styled.hr`
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  width: calc(100% - 20px);
`;
export const ViewAttachments = styled.span`
  color: #2e8bc0;
  border: 1px solid #2e8bc0;
  border-radius: 6px;
  background: #fff;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  padding: 6px 15px;
  cursor: pointer;
`;
export const CrossBtn = styled.span`
  background: #f44336;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  font-size: 8px;
  cursor: pointer;
  min-width: 24px;
`;
export const ChatFooter = styled.form`
  height: 55px;
  width: 100%;
  background: #145da0;
  padding: 10px 15px 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const MessageContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 20px 0;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #adb5bd;
  }
`;
export const MsgInputWrap = styled.div`
  width: 100%;
  position: relative;
  .chooseMedia {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 50%;
    opacity: 0;
    transform: translateY(-50%);
    left: ${({ Dir }) => Dir === "rtl" && "8px"};
    right: ${({ Dir }) => Dir === "ltr" && "8px"};
    z-index: 10;
    cursor: pointer;
  }
`;
export const MessageInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #ffffff;
  border: none;
  padding: 10px 10px 10px 20px;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
  &::placeholder {
    font-style: italic;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
  }
`;
export const Message = styled.div`
  padding: 8px 14px 7px;
  margin: 7px 30px 25px;
  border-radius: 9px;
  position: relative;
  animation: fadeIn 1s ease-in;
  max-width: 70%;
  width: max-content;
  font-size: 14px;
  min-width: 130px;

  overflow-wrap: break-word;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom: 0;
    margin-top: -10px;
  }

  label {
    position: absolute;
    top: -18px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    text-transform: capitalize;
  }
  label.mylabel {
    right: 0;
    position: absolute;
  }
  label.yourlabel {
    left: 0;
    position: absolute;
  }
`;
export const UploadingCommentMedia = styled.div`
  padding: 8px 14px 7px;
  margin: 7px 30px;
  border-radius: 9px;
  position: relative;
  animation: fadeIn 1s ease-in;
  max-width: 70%;
  width: max-content;
  font-size: 14px;
  min-width: 130px;
  margin-bottom: 30px;
  img {
    height: 100px;
    width: auto;
  }
`;
