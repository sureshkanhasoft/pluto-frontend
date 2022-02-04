import React, { useEffect, useState } from "react";
import { Chip, makeStyles, Box, LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";
import ListAltIcon from "@material-ui/icons/ListAlt";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PublishIcon from "@material-ui/icons/Publish";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  progressbar: {
    backgroundColor: "#e6e6e6",
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#21d5ac",
    },
  },
  btnSecondary: {
    background: "#f78b46",
    width: 140,
    height: 36,
    color: "#fff",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      background: "#d76f2d",
    },
  },
}));

const UploadFile = ({
  title,
  uploadPercentage,
  handleClick,
  fileList1,
  key1,
  documentDetail,
}) => {
  // const classes = useStyles();
  // const dispatch = useDispatch()
  const [more, setMore] = useState(true);
  // const [docStatustext, setDocStatustext] = useState("")

  // const [data, setData] = useState({
  //     key: "files",
  //     files: []
  // })

  const showMore = () => {
    setMore((item) => !item);
  };
  const getDocsStatusName = (status) => {
    switch (status) {
      case "success":
        return "Accepted";
      case "cancel":
        return "Rejected";
      case "pending":
        return "Panding";
      default:
        return "";
    }
  };
  // useEffect(() => {
  //     documentDetail && documentDetail?.data && documentDetail?.data?.filter(item => item.key === key1).map((list, index) => {
  //         const docStatus1 = index === 0 ? (list.document_status.toLowerCase()) : ""
  //         setDocStatustext(docStatus1)
  //     })
  // }, [documentDetail])
  // console.log('text: ', docStatustext);
  return (
    <>
      <div className="">
        <div className="document-upload-container">
          <div className="document-header">
            <div className="f-grow">
              <div className="d-flex mb-8">
                <InfoIcon className="header-left-icon" />
                <h1 className="title-text mb-0 f-700">{title}</h1>
              </div>
              {/* <Chip label="REQUIRED" className="required"></Chip> */}
            </div>
            <div className="d-flex">
              <button className="btn">
                <PublishIcon className="mr-8" />
                <input
                  accept="image/*,.pdf"
                  type="file"
                  multiple
                  name="files"
                  onChange={handleClick}
                />
                <span>Upload files</span>
              </button>
              <Link to={`/profile/documents/${key1}`} className="btn view-btn">
                <ListAltIcon className="mr-8" />
                View Details
              </Link>
              {/* <Link className={`btn show-more ${more === true ? "show" : ""}`} onClick={showMore}>Show More <KeyboardArrowDownIcon /></Link> */}
              <span
                className={`btn show-more ${more === true ? "show" : ""}`}
                onClick={showMore}
              >
                Show More <KeyboardArrowDownIcon />
              </span>
            </div>
          </div>
          <div className="document-status-container">
            <div className="document-upload-status d-flex y-center">
              {/* <span className="f-700 mr-4">NURSE </span> document status: */}
              <span className="f-700 mr-4"></span> document status:
              <div className="document-status ml-8">
                {/* <span className="spinner mr-8 "></span> */}
                {/* <span style={{textTransform:"capitalize"}}>{docStatustext.length > 0 ? docStatustext :"Not Uploaded"}</span> */}
                {documentDetail &&
                  documentDetail?.data &&
                  documentDetail?.data
                    ?.filter((item) => item.key === key1)
                    .map((list, index) => {
                      const docStatus =
                        index === 0 ? list.document_status.toLowerCase() : "";
                      return (
                        <span
                          key={index}
                          style={{ textTransform: "capitalize" }}
                        >
                          {getDocsStatusName(docStatus)}
                        </span>
                      );
                    })}
              </div>
            </div>
          </div>
          <div
            className={`upload-listing-content ${more === true ? "show" : ""}`}
          >
            {
              //     uploadPercentage < 100 &&
              //     <div to="/profile/documents/1" className="file-listing uploading-file-container">
              //     <Box className="file-listing-inner d-flex flex-grow">
              //         <Box className="upload-icon">
              //             <ArrowUpwardIcon />
              //         </Box>
              //         <Box flexGrow={1}>
              //             <Box display="flex">
              //                 <Box component="p" flexGrow={1}>Uploading: file-name.png</Box>
              //                 {/* <p variant="body2">{`${Math.round(progress,)}%`}</p> */}
              //                 <p variant="body2">{`${Math.round(uploadPercentage,)}%`}</p>
              //             </Box>
              //             {/* <LinearProgress variant="determinate" value={progress} className={classes.progressbar} /> */}
              //             <LinearProgress variant="determinate" value={uploadPercentage} className={classes.progressbar} />
              //         </Box>
              //     </Box>
              // </div>
            }

            {documentDetail &&
              documentDetail?.data &&
              documentDetail?.data
                ?.filter((item) => item.key === key1)
                .map((list, index) => {
                  const extension = list.file_name.split(".").pop();
                  return (
                    // <Link to={`/profile/documents/${key1}`} className="file-listing" key={index}>
                    <Link
                      to={{
                        pathname: `/profile/documents/${key1}`,
                        state: list.file_name,
                      }}
                      className="file-listing"
                      key={index}
                    >
                      <div className="file-listing-inner d-flex flex-grow">
                        <div className="image-icon">
                          {extension === "pdf" ? (
                            <PictureAsPdfIcon />
                          ) : (
                            <InsertPhotoOutlinedIcon />
                          )}
                        </div>
                        <div>
                          <span className="file-list-lable">FILE NAME</span>
                          <p className="mb-0">{list.file_name}</p>
                        </div>
                      </div>
                      <div className="file-listing-inner">
                        <span className="file-list-lable">DATE ADDED</span>
                        <p className="mb-0">{list.date_added}</p>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
