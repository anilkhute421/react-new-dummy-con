import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { PlayMedia, MediaEye } from "../../utils/images";

import { CardBackground, PageWrap } from "../Styles";
import { DescriptionLabel } from "../unitAvailable/Style";
import axios from "axios";
import { BaseUrl } from "../../utils/constants";
import Loader from "../../Loader/Loader";
import { saveAs } from "file-saver";
import VideoModal from "../maintanence/Request/VideoModal";

export default function WhatsaapLinkPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataMedia, setDataMedia] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = (vid) => {
    setVideoUrl(vid);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setVideoUrl(null);
  };
  const [videoUrl, setVideoUrl] = useState(null);

  console.log(dataMedia, "dataMedia");

  const getMedia = async () => {
    setLoading(true);
    let res = await axios.post(
      `${BaseUrl}api/maintenance_request_details_for_expets`,
      {
        unique_code: id,
      }
    );
    if (res.status === 200) {
      setData(res.data.maintenance_details);
      setDataMedia(res.data.MaintenanceFiles);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const fetchImage = async (file) => {
    let r = await fetch(file, { mode: "no-cors" });
    let s = await r.blob();
    saveAs(file, s.type);
  };

  useEffect(() => {
    getMedia();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <PageWrap>
        <CardBackground className="mt-4 text-center">
          <DescriptionLabel style={{ fontSize: "22px" }}>
            Maintenance Request Attachments
          </DescriptionLabel>
          <Media>
            {dataMedia.map((image, index) => (
              <MediaBox>
                <img className="thumbnail" src={image.thumbnail_name} alt="" />
                <MediaActions>
                  {image.file_type === 1 && (
                    <ActionIcon
                      src={MediaEye}
                      onClick={() => fetchImage(image.file_name)}
                    />
                  )}

                  {image.file_type === 2 && (
                    <ActionIcon
                      onClick={() => handleOpen(image.file_name)}
                      src={PlayMedia}
                    />
                  )}
                </MediaActions>
              </MediaBox>
            ))}
          </Media>
          {open && (
            <VideoModal show={open} hide={handleClose} videoUrl={videoUrl} />
          )}
        </CardBackground>
      </PageWrap>
    </div>
  );
}

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

const ActionIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
`;
