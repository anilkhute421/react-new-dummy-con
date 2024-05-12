import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  BackLink,
  CardBackground,
  Label,
  LabelBox,
  NoData,
  PageHeader,
  PageWrap,
} from "../../Styles";
import { DescriptionLabel } from "../../unitAvailable/Style";
import Box from "@mui/material/Box";
import IntlMassage from "../../../utils/IntlMassage";
import styled from "styled-components";
import {
  DeleteMedia,
  DownloadMedia,
  MediaEye,
  PlayMedia,
  VideoThumbForBackend,
} from "../../../utils/images";
import imageCompression from "browser-image-compression";
import DeleteImage from "../../../components/DeleteImage";
import { postApi } from "../../../services/ApiMethod";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader";
import { CircularProgress } from "@mui/material";
import { saveAs } from "file-saver";
import VideoModal from "./VideoModal";
import { getChat } from "../../../firebase/GetChat";
import { UploadImage } from "../../../firebase/uploadImage";
import { generateVideoThumb } from "./handleMedia/uploadMedia";
import { UploadVidToStore } from "../../../firebase/uploadVideoToStore";
import { useIntl } from "react-intl";
export default function AttachmentMedia(props) {
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
  const history = useHistory();

  const dir = useSelector((state) => state.Language.dir);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const [previewVideoList, setPreviewVideoList] = useState(false);
  const [show, setShow] = useState(false);
  const [requestAttachment, setRequestAttachment] = useState([]);
  const [loader, setLoader] = useState(false);
  const [mediaId, setMediaId] = useState(null);
  const [playFile, setPlayFile] = useState(null);
  const [commentMedia, setCommentMedia] = useState([]);
  const [commentMediaLoader, setCommentMediaLoader] = useState(false);
  const [listOfThumb, UpdateListOfThumb] = useState([]);
  const [isImgOpen, setIsImgOpen] = useState(false);
  const [openImageSrc, setOpenImageSrc] = useState(null);
  // Video Modal
  const [open, setOpen] = useState(false);
  const handleOpen = (videoFile) => {
    setPlayFile(videoFile);
    setOpen(true);
  };
  const handleClose = () => {
    setPlayFile(null);
    setOpen(false);
  };
  // handle media input function
  const handleAttachmentUpload = (file) => {
    if (
      file[0].name.includes(".png") ||
      file[0].name.includes(".jpg") ||
      file[0].name.includes(".jpeg") ||
      file[0].name.includes(".heic")
    ) {
      uploadAttachmentImg(file[0]);
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

  // ----------
  const uploadAttachmentImg = (file) => {
    let randomID = (Math.floor(Math.random() * 108098980000) + 10090900)
      .toString()
      .substring(1);
    let id = randomID;
    UpdateListOfThumb((prev) => [
      ...prev,
      {
        file: file,
        id,
        thumb: URL.createObjectURL(file),
      },
    ]);
    sendImgToStore(file, id);
  };
  // ----------------------------
  const sendImgToStore = async (file, id) => {
    let imgThumbUrl = "";

    const getThumbUrl = async (data) => {
      if (data.status === "success") {
        imgThumbUrl = data.url;
      }
    };
    const getImgUrl = async (data) => {
      if (data.status === "success") {
        let thumbnail_name = imgThumbUrl !== "" ? imgThumbUrl : data.url;
        let attachment = data.url;
        let file_type = 1;
        mediaToServer(thumbnail_name, attachment, file_type, (id = data.id));
      } else {
        UpdateListOfThumb((state) => state.filter((f) => f.id !== data.id));
      }
    };
    // original image
    const Img = await imageCompression(file, options);
    //  thumb img of original image of max-size 100kb
    const imgThumb = await imageCompression(file, thumbOptions);
    // to get thumb
    UploadImage(imgThumb, id + 21898, file.name, getThumbUrl);
    UploadImage(Img, id, file.name, getImgUrl);
  };
  // ------------------
  const VideoUpload = async (file) => {
    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("src", URL.createObjectURL(file));
    videoPlayer.load();
    videoPlayer.addEventListener("loadedmetadata", async () => {
      if (videoPlayer.duration < 21) {
        let randomID = (Math.floor(Math.random() * 108098980000) + 10090900)
          .toString()
          .substring(1);
        const cover = await generateVideoThumb(file, 2);
        let id = randomID;
        UpdateListOfThumb((prev) => [
          ...prev,
          {
            file: file,
            cover,
            id,
            thumb: URL.createObjectURL(cover),
          },
        ]);
        sendVideoToStore(file, id, cover);
      } else {
        toast.error(intl.formatMessage({ id: "error.videoLength20" }), { theme: "colored" });
      }
    })
  };
  const sendVideoToStore = async (file, id, cover) => {
    let thumbURL = "";

    const getThumbUrl = (data) => {
      if (data.status === "success") {
        thumbURL = data.url;
      }
    };

    UploadImage(cover, id, file.name, getThumbUrl);
    const getVideoStatus = async (data) => {
      if (data.status === "success") {
        let thumbnail_name = thumbURL;
        let attachment = data.url;
        let file_type = 2;

        mediaToServer(thumbnail_name, attachment, file_type, (id = data.id));
      } else {
        UpdateListOfThumb((state) => state.filter((f) => f.id !== data.id));
      }
    };

    UploadVidToStore(file, id, getVideoStatus);
  };

  // upload filePath to server
  const mediaToServer = async (thumbnail_name, attachment, file_type, id) => {
    const res = await postApi("upload_maintenance_files", {
      thumbnail_name,
      attachment,
      file_type,
      maintenance_request_id: props.location.state.id,
    });

    if (res.status === 200) {
      getFetchAllAttachment(props.location.state.id);
      toast.success(res.message, { theme: "colored" });
      UpdateListOfThumb((state) => state.filter((f) => f.id !== id));
    } else {
      toast.error(res, { theme: "colored" });
      UpdateListOfThumb((state) => state.filter((f) => f.id !== id));
    }
  };

  const getFetchAllAttachment = async (id) => {
    setLoader(true);
    let req = {
      maintenance_request_id: id,
    };
    let res = await postApi("fetch_maintanence_request_all_attachment", req);

    if (res.status === 200) {
      setRequestAttachment(res.MaintenanceFiles);

      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getDeletePop = (id) => {
    setShow(true);
    setMediaId(id);
  };
  const closeDelModal = () => {
    setShow(false);
  };
  const handleConfirm = async () => {
    let d = {
      maintenance_request_id: props.location.state.id,
      maintenance_file_id: mediaId,
    };
    let res = await postApi(`delete_attachment_by_id`, d);
    if (res.status === 200) {
      toast.error(res.message, { theme: "colored" });
      closeDelModal();
      setMediaId(null);
      getFetchAllAttachment(props.location.state.id);
    } else {
      toast.error(res.message, { theme: "colored" });
      closeDelModal();
      setMediaId(null);
    }
  };
  const fetchImage = async (file) => {
    let r = await fetch(file, { mode: "no-cors" });
    let s = await r.blob();
    saveAs(file, s.type);
  };
  const getUpdatedChat = (newMedia) => {
    setCommentMediaLoader(false);
    setCommentMedia(newMedia);
  };
  useEffect(() => {
    setCommentMediaLoader(true);
    let id = props.location.state.id;

    getChat({ id, getUpdatedChat });
    getFetchAllAttachment(props.location.state.id);
  }, []);
  const openMedia = (img) => {
    setOpenImageSrc(img);
    setIsImgOpen(true);
  };
  const closeImgDialog = () => {
    setIsImgOpen(false);
    setOpenImageSrc(null);
  };
  return (
    <PageWrap>
      {show && (
        <DeleteImage
          show={show}
          onHide={() => setShow(false)}
          handleConfirm={handleConfirm}
        />
      )}

      <PageHeader>
        {isImgOpen && (
          <ImgPreview>
            <div>
              <span className="crossImag text-center" onClick={closeImgDialog}>
                <i className="icon-cross" />
              </span>
              <img src={openImageSrc} alt="" />
            </div>
          </ImgPreview>
        )}
        <LabelBox>
          <Label>
            <BackLink
              Dir={dir}
              onClick={() => history.push("/home/maintanence/")}
            >
              <i className="icon-down-back" />
            </BackLink>
            <IntlMassage id="maintanence.allAttachment" />
          </Label>
        </LabelBox>

        <UploadMedia className="mx-4 text-center">
          <input
            type="file"
            onChange={(e) => handleAttachmentUpload(e.target.files)}
            accept="image/* , video/*"
          />
          <IntlMassage id="button.uploadAttachment"></IntlMassage>
        </UploadMedia>
      </PageHeader>
      <CardBackground className="mt-4 text-center">
        <DescriptionLabel style={{ fontSize: "22px" }}>
          <IntlMassage id="Maintenance.request.Attachments" />
        </DescriptionLabel>
        <Media>
          {listOfThumb &&
            listOfThumb.map((ele, idx) => (
              <MediaBox key={idx}>
                <img className="thumbnail" src={ele.thumb} alt="" />
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "50px",
                    left: "0",
                    right: "0",
                  }}
                >
                  <CircularProgress sx={{ color: "white" }} color="warning" />
                </Box>
              </MediaBox>
            ))}

          {previewVideoList && (
            <MediaBox>
              <img className="thumbnail" src={VideoThumbForBackend} alt="" />

              {loading && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "50px",
                    left: "0",
                    right: "0",
                  }}
                >
                  <CircularProgress sx={{ color: "white" }} color="warning" />
                </Box>
              )}
            </MediaBox>
          )}

          <>
            {!requestAttachment.length > 0 ? (
              <NoData>
                <IntlMassage id="Maintenance.request.Attachments.nomedia" />
              </NoData>
            ) : (
              requestAttachment.map((image, index) => (
                <MediaBox key={index}>
                  <img
                    className="thumbnail"
                    src={image.thumbnail_name}
                    alt=""
                  />
                  <MediaActions>
                    {image.file_type === 1 && (
                      <ActionIcon
                        onClick={() => openMedia(image.file_name)}
                        src={MediaEye}
                      />
                    )}
                    <ActionIcon
                      src={DeleteMedia}
                      onClick={() => getDeletePop(image.id)}
                    />

                    {image.file_type === 2 && (
                      <ActionIcon
                        onClick={() => handleOpen(image.file_name)}
                        src={PlayMedia}
                      />
                    )}
                  </MediaActions>
                </MediaBox>
              ))
            )}
          </>
        </Media>
      </CardBackground>
      {open && (
        <VideoModal show={open} hide={handleClose} videoUrl={playFile} />
      )}
      <CardBackground className="mt-4 text-center">
        <DescriptionLabel style={{ fontSize: "22px" }}>
          <IntlMassage id="Maintenance.request.AttachmentsComment" />
        </DescriptionLabel>
        <Media>
          {commentMediaLoader ? (
            <NoData>
              <CircularProgress />
            </NoData>
          ) : commentMedia.length > 0 ? (
            commentMedia.map(
              (ele, idx) =>
                ele.messageType !== 0 && (
                  <MediaBox key={idx}>
                    {ele.messageType === 1 && (
                      <img className="thumbnail" src={ele.thumbURL} alt="" />
                    )}
                    {ele.messageType === 2 && (
                      <img className="thumbnail" src={ele.thumbURL} alt="" />
                    )}
                    <MediaActions>
                      {ele.messageType === 1 && (
                        <DownLoadMedia
                          href={ele.message}
                          target="_blank"
                          download
                        >
                          <ActionIcon src={DownloadMedia} />
                        </DownLoadMedia>
                      )}
                      {ele.messageType === 1 && (
                        <ActionIcon
                          onClick={() => openMedia(ele.message)}
                          src={MediaEye}
                        />
                      )}
                      {ele.messageType === 2 && (
                        <ActionIcon
                          onClick={() => handleOpen(ele.message)}
                          src={PlayMedia}
                        />
                      )}
                    </MediaActions>
                  </MediaBox>
                )
            )
          ) : (
            <NoData>
              <IntlMassage id="msg.nodata" />
            </NoData>
          )}
        </Media>
      </CardBackground>
    </PageWrap>
  );
}

const UploadMedia = styled.span`
  height: 42px;
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
  min-width: max-content;
  position: relative;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    right: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
`;

const MediaBox = styled.div`
  width: 200px;
  height: 120px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin: 10px;
  &:after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    z-index: 9;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 54.58%, #000000 100%);
  }
  .thumbnail {
    height: 100%;
    width: 100%;
  }
`;
const MediaActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 10px;
  z-index: 10;
`;

const Media = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
const DownLoadMedia = styled.a`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
`;
const ActionIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
`;

const ImgPreview = styled(Box)`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  height: 100vh;
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
      height: 100%;
      max-height: 100vh;
      width: 80%;
      margin: 0 auto;
      object-fit: contain;
    }
    .crossImag {
      position: absolute;
      top: 15px;
      right: 20px;

      background: #fff;
      color: #f00;
      z-index: 13;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: grid;
      align-items: center;
      box-shadow: 1px 3px 5px #000;
    }
  }
`;
