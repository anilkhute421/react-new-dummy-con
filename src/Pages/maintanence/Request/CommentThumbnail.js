import { CircularProgress } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { UploadingCommentMedia } from "./Styles";
import { useSelector } from "react-redux";
export default function CommentThumbnail({ file }) {
  const Dir = useSelector((state) => state.Language.dir);
  return (
    <UploadingCommentMedia className={Dir==='ltr'?"right":'left'}>
      <LoaderWrap>
        <CircularProgress />
      </LoaderWrap>
      <img src={file} alt="" />
    </UploadingCommentMedia>
  );
}

const LoaderWrap = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;
