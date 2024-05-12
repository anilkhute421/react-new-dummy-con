import React, { useState, useMemo, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useSelector } from "react-redux";
import {
  Chatbox,
  ChatWrap,
  GlobalStyle,
  ViewAttachments,
  MsgInputWrap,
  MessageInput,
  ChatFooter,
  ChatHeader,
  HR,
  CrossBtn,
  MessageContainer,
} from "./Styles";
import Msg from "./Message";
import { Box, styled } from "@mui/system";
import { Button } from "@mui/material";
import { getChat } from "../../../firebase/GetChat";
import IntlMassage from "../../../utils/IntlMassage";
import { useIntl } from "react-intl";
import { disabledIcon, mediaIcon, sendIcon } from "../../../utils/images";
import { markAsRead, sendMediaMsg } from "../../../firebase/SendMsg";
import { toast } from "react-toastify";
import CommentThumbnail from "./CommentThumbnail";
import imageCompression from "browser-image-compression";
import { UploadImage } from "../../../firebase/uploadImage";
import { UploadVidToStore } from "../../../firebase/uploadVideoToStore";
import { generateVideoThumb } from "./handleMedia/uploadMedia";
import { postApi } from "../../../services/ApiMethod";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: ".png , .jpg",
};
const thumbOptions = {
  maxSizeMB: 0.1,
  maxWidthOrHeight: 220,
  useWebWorker: true,
  fileType: ".png , .jpg",
};
export default function ViewComments({
  open,
  id,
  close,
  receiverID,
  tenantID,
  unit_id
}) {
  const my_id = useSelector((state) => state.Auth.data);
  const msgRef = useRef(null);
  const history = useHistory();
  const intl = useIntl();
  const [disableBtn, setDisableBtn] = useState(true);
  const [msgs, setMsgs] = useState([]);
  const dir = useSelector((state) => state.Language.dir);
  const [inputText, setInputText] = useState("");
  const [openImageSrc, setOpenImageSrc] = useState(null);
  const [isImgOpen, setIsImgOpen] = useState(false);
  // ---current file
  const [currentFile, UpdateCurrentFile] = useState(null);
  // video Preview Confiirm Box
  const [imagePreviewBox, setImagePreviewBox] = useState(false);
  const [videoPreviewBox, setVideoPreviewBox] = useState(false);
  // list of uploading files-----

  const [listOfThumb, UpdateListOfThumb] = useState([]);
  // new message in chat
  const getUpdatedChat = (payload) => {
    setMsgs(payload);
  };
  const FetchComments = async () => {
    const d = await getChat({ id, getUpdatedChat });
    setMsgs(d);
  };

  // open image in chat
  const handleOpenImg = (img, status) => {
    setOpenImageSrc(img);
    setIsImgOpen(status);
  };
  const closeImgDialog = () => {
    setIsImgOpen(false);
    setOpenImageSrc(null);
  };
  // ---------handle msg send button disbale enable
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disableBtn === true) {
      return false;
    }
    let chat_id = id;
    let senderID = my_id.pm_company_id;
    let senderName = my_id.name;
    let message = inputText;
    let messageType = 0;

    setInputText("");
    const res = await sendMediaMsg({
      chat_id,
      senderID,
      id,
      senderName,
      message,
      receiverID,
      tenantID,
      messageType,
      unit_id,
      thumbURL: "",
    });
    if (res.id) {
      setDisableBtn(true);
    }
  };

  const uploadImage = async (file) => {
    setImagePreviewBox(true);
    let randomID = (Math.floor(Math.random() * 108098980000) + 10090900)
      .toString()
      .substring(1);
    UpdateCurrentFile({
      file: file,
      id: randomID,
      thumb: URL.createObjectURL(file),
    });
  };
  // ----------------------------
  const sendImgToStore = async () => {
    let imgThumbUrl = "";
    setImagePreviewBox(false);
    UpdateListOfThumb((prev) => [...prev, { ...currentFile }]);
    const getThumbUrl = async (data) => {
      if (data.status === "success") {
        imgThumbUrl = data.url;
      }
    };
    const getImgUrl = async (data) => {
      if (data.status === "success") {
        let thumbURL = imgThumbUrl !== "" ? imgThumbUrl : data.url;
        let chat_id = id;
        let senderID = my_id.pm_company_id;
        let senderName = my_id.name;
        let message = data.url;
        let messageType = 1;
        const fireStoreRes = await sendMediaMsg({
          chat_id,
          senderID,
          id,
          senderName,
          message,
          receiverID,
          tenantID,
          messageType,
          unit_id,
          thumbURL,
        });
        if (fireStoreRes.id) {
          UpdateListOfThumb((state) => state.filter((f) => f.id !== data.id));
        }
      } else {
        UpdateListOfThumb((state) => state.filter((f) => f.id !== data.id));
      }
    };
    // original image
    const Img = await imageCompression(currentFile.file, options);
    //  thumb img of original image of max-size 100kb
    const imgThumb = await imageCompression(currentFile.file, thumbOptions);
    // to get thumb
    UploadImage(
      imgThumb,
      currentFile?.id + 21898,
      currentFile.file.name,
      getThumbUrl
    );
    UploadImage(Img, currentFile?.id, currentFile.file.name, getImgUrl);
  };

  // ------------end of img to store uplaod

  // ------------------------uploading video to store
  const VideoUpload = async (file) => {
    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("src", URL.createObjectURL(file));
    videoPlayer.load();
    videoPlayer.addEventListener("loadedmetadata", async () => {
      if (videoPlayer.duration < 21) {
        setVideoPreviewBox(true);
        const cover = await generateVideoThumb(file, 2);
        let randomID = (Math.floor(Math.random() * 108098980000) + 10090900)
          .toString()
          .substring(1);
        UpdateCurrentFile({
          video: file,
          file: cover,
          id: randomID,
          thumb: URL.createObjectURL(cover),
        });
      } else {
        toast.error(intl.formatMessage({ id: "error.videoLength20" }), {
          theme: "colored",
        });
      }
    });
  };
  const sendVideoToStore = async () => {
    let thumbURL = "";
    setVideoPreviewBox(false);
    UpdateListOfThumb((prev) => [...prev, { ...currentFile }]);
    const getThumbUrl = (data) => {
      if (data.status === "success") {
        thumbURL = data.url;
      }
    };

    UploadImage(
      currentFile?.file,
      currentFile?.id,
      `${currentFile?.id}.jpg`,
      getThumbUrl
    );
    const getVideoStatus = async (data) => {
      if (data.status === "success") {
        UpdateListOfThumb((state) => state.filter((f) => f.id !== data.id));
        let chat_id = id;
        let senderID = my_id.pm_company_id;
        let senderName = my_id.name;
        let message = data.url;
        let messageType = 2;
        const res = await sendMediaMsg({
          chat_id,
          senderID,
          senderName,
          id,
          message,
          receiverID,
          tenantID,
          messageType,
          unit_id,
          thumbURL,
        });

        if (res.id) {
          UpdateListOfThumb((state) => state.filter((f) => f.id !== data.id));
        } else {
          UpdateListOfThumb((state) => state.filter((f) => f.id !== data.id));
        }
      }
    };
    UploadVidToStore(currentFile?.video, currentFile?.id, getVideoStatus);
  };
  const closeVideoBox = () => {
    setVideoPreviewBox(false);
    setImagePreviewBox(false);
  };

  // --------ebd of video upload

  // handle media input function
  const handleCommentFile = (file) => {
    if (
      file[0].name.includes(".png") ||
      file[0].name.includes(".jpg") ||
      file[0].name.includes(".jpeg") ||
      file[0].name.includes(".heic")
    ) {
      uploadImage(file[0]);
    } else if (
      file[0].name.includes(".mp4") ||
      file[0].name.includes(".mov") ||
      file[0].name.includes(".hevc") ||
      file[0].name.includes(".mpeg")
    ) {
      VideoUpload(file[0]);
    } else {
      toast.error("Selected file type is invalid", { theme: "colored" });
    }
  };

  // media input btn
  const MediaInput = () => {
    return (
      <input
        className="chooseMedia"
        onChange={(e) => handleCommentFile(e.target.files)}
        accept="image/* , video/*"
        type="file"
      />
    );
  };

  // rerender  input to select same file
  useMemo(() => {
    MediaInput();
  }, [videoPreviewBox]);

  // enable disable text msg send button
  useMemo(() => {
    if (inputText) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [inputText]);

  // mark as read messages

  const sendZeroCountToBackend = async (id) => {
    let req = {
        request_id: id , 
        unread_count: 0
    }
    await postApi("update_pm_unread_count_for_pm" , req)
  }
  useEffect(() => {
    let senderID = my_id.pm_company_id;
    FetchComments();
    markAsRead(id, senderID, receiverID , unit_id);
    sendZeroCountToBackend(id)
  }, []);

  // open attachements files
  const viewAttachments = () => {
    history.push(`/home/maintanence/requests/attachment`, (id = { id }));
  };

  //  update scroll to newest msg
  useEffect(() => {
    msgRef.current?.scrollIntoView();
  }, [msgs, listOfThumb]);
  return (
    <>
      {open && (
        <ChatWrap>
          <GlobalStyle />
          <ClickAwayListener onClickAway={close}>
            <Chatbox Dir={dir}>
              {isImgOpen && (
                <ImgPreview>
                  <div>
                    <span
                      className="crossImag text-center"
                      onClick={closeImgDialog}
                    >
                      <i className="icon-cross" />
                    </span>
                    <img src={openImageSrc} alt="" />
                  </div>
                </ImgPreview>
              )}
              <div>
                <ChatHeader>
                  <div className="innerDiv d-flex flex-row align-items-center justify-content-between">
                    <h4>
                      <IntlMassage id="label.comments" />
                    </h4>
                    <ViewAttachments onClick={viewAttachments}>
                      <IntlMassage id="label.viewAttachments" />
                    </ViewAttachments>
                  </div>
                  <CrossBtn onClick={close} className="icon-cross"></CrossBtn>
                </ChatHeader>
                <HR />
              </div>
              <div style={{ height: "calc(100vh - 109px)" }}>
                <MessageContainer>
                  {msgs &&
                    msgs.map((item, index, Arr) => {
                      if (!Arr[index - 1]) {
                        return (
                          <Msg
                            msg={item}
                            key={index}
                            Label={true}
                            handleOpenImg={handleOpenImg}
                            status={isImgOpen}
                          />
                        );
                      }
                      if (
                        Arr[index - 1] &&
                        item.senderID !== Arr[index - 1].senderID
                      ) {
                        return (
                          <Msg
                            msg={item}
                            key={index}
                            Label={true}
                            handleOpenImg={handleOpenImg}
                            status={isImgOpen}
                          />
                        );
                      }
                      return (
                        <Msg
                          msg={item}
                          key={index}
                          Label={false}
                          handleOpenImg={handleOpenImg}
                          status={isImgOpen}
                        />
                      );
                    })}

                  {listOfThumb &&
                    listOfThumb.map((ele) => (
                      <CommentThumbnail file={ele.thumb} key={ele.id} alt="" />
                    ))}

                  <div className="scroll" ref={msgRef} />
                </MessageContainer>
              </div>
              {videoPreviewBox && (
                <SelectedMediaBox Dir={dir}>
                  <div>
                    <img
                      className="thumbnailpreview"
                      src={currentFile?.thumb}
                      alt=""
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={sendVideoToStore}
                      sx={{ width: "30px", height: "35px" }}
                    >
                      <img className="sendIcon" src={sendIcon} alt="" />
                    </Button>
                    <Cross onClick={closeVideoBox} variant="contained">
                      <i className="icon-cross" />{" "}
                    </Cross>
                  </div>
                </SelectedMediaBox>
              )}
              {imagePreviewBox && (
                <SelectedMediaBox Dir={dir}>
                  <div>
                    <img
                      className="thumbnailpreview"
                      src={currentFile?.thumb}
                      alt="upload"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={sendImgToStore}
                    >
                      <img className="sendIcon" src={sendIcon} alt="" />
                    </Button>
                    <Cross onClick={closeVideoBox} variant="contained">
                      <i className="icon-cross" />
                    </Cross>
                  </div>
                </SelectedMediaBox>
              )}

              <ChatFooter>
                <MsgInputWrap Dir={dir}>
                  <MessageInput
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={intl.formatMessage({
                      id: "placeholder.typeComments",
                    })}
                  />
                  <ChooseMediaIcon Dir={dir} src={mediaIcon} />
                  <MediaInput />
                </MsgInputWrap>
                <SendButton
                  Dir={dir}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={disableBtn}
                >
                  <img src={disableBtn ? disabledIcon : sendIcon} alt="" />
                </SendButton>
              </ChatFooter>
            </Chatbox>
          </ClickAwayListener>
        </ChatWrap>
      )}
    </>
  );
}

const SendButton = styled("button")`
  width: 40px;
  border: none;
  max-width: 40px;
  height: 100%;
  background: transparent;
  color: #fff;
  img {
    transform: ${({ Dir }) => Dir === "rtl" && "rotate(180deg)"};
  }
`;
const ChooseMediaIcon = styled("img")`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ Dir }) => Dir === "rtl" && "8px"};
  right: ${({ Dir }) => Dir === "ltr" && "8px"};
  z-index: 9;
  cursor: pointer;
`;
const SelectedMediaBox = styled(Box)`
  width: 100%;
  height: 150px;
  position: absolute;
  z-index: 11;
  bottom: 54px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  div {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .thumbnailpreview {
      width: 140px;
      height: 100px;
      border-radius: 6px;
      box-shadow: 1px 2px 7px rgba(155, 155, 155, 0.7);
    }
  }
  .sendIcon {
    transform: ${({ Dir }) => Dir === "rtl" && "rotate(180deg)"};
  }
`;
const Cross = styled(Button)`
  border: none;
  background: red;
  width: 30px;
  max-width: 30px;
  min-width: 30px;
  height: 35px;

  color: #fff;
  &:hover {
    background: red;
  }
`;
const ImgPreview = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 12;
  background: rgba(0, 0, 0, 0.75);
  div {
    position: relative;
    height: 100%;
    width: 100%;

    display: grid;
    align-items: center;
    img {
      margin: auto;
      height: auto;
      width: 100%;
    }
    .crossImag {
      position: absolute;
      top: 15px;
      right: 15px;
      background: #fff;
      color: #000;
      z-index: 13;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      cursor: pointer;
      display: grid;
      align-items: center;
    }
  }
`;

