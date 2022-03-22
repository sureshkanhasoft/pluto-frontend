import React, { useEffect, useState } from "react";
import { Box, makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./compliance.scss";
import { deleteDocument, documentDetails } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import ProfileUpdateInfo from "../../components/ProfileUpdateInfo/ProfileUpdateInfo";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";
import Notify from "../../components/Notify/Notify";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ApiConfig from '../../../src/config/ApiConfig';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  fileName: {
    wordBreak: "break-all",
    cursor: "pointer",
  },
  actionBtnBox: {
    display: "flex",
    marginLeft: 20,
  },
}));

const ComplianceDetail = (props) => {
  const { match } = props;
  const paramsId = match.params.id;
  const classes = useStyles();
  const baseUrl = ApiConfig.API_URL + "uploads/signee_docs/";
  const dispatch = useDispatch();
  const [deleteNotify, setDeleteNotify] = useState(false);
  const [dirImgName, setDirImgName] = useState(props.location.state);
  const [imgView, setImgView] = useState("");
  const [pdfView, setPdfView] = useState("");

  const pdfData = `${baseUrl}${pdfView}`;
  const imgData = `${baseUrl}${imgView}`;

  const pdfView1 = `${baseUrl}${pdfView}`;

  const {
    documentDetail,
    loading,
    deleteDocumentSuccess,
    deleteDocumentError,
  } = useSelector((state) => state.addCompliance);

  const deleteData = (id) => {
    dispatch(deleteDocument(id));
    setDeleteNotify(true);
  };

  useEffect(() => {
    dispatch(documentDetails(`${paramsId}`));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dirImgName) {
      const extension = dirImgName.split(".").pop();
      if (extension === "pdf") {
        setImgView("");
        setPdfView(dirImgName);
      } else {
        setPdfView("");
        setImgView(dirImgName);
      }
    }
  }, []);

  const viewFile = (e, filename) => {
    setDirImgName("");
    const extension = filename.split(".").pop();
    if (extension === "pdf") {
      setImgView("");
      setPdfView(filename);
    } else {
      setImgView(filename);
      setPdfView("");
    }
  };

  const download = (e) => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        "http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/sample-pdf_9359_1633007406.pdf",
      ],
      { type: "application/pdf" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.pdf";
    document.body.appendChild(element);
    element.click();
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

  return (
    <>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )}
      {deleteNotify &&
        (deleteDocumentSuccess?.message || deleteDocumentSuccess) && (
          <Notify data="Doc deleted successfully" status="success" />
        )}
      {deleteNotify && deleteDocumentError?.message && (
        <Notify data={deleteDocumentError?.message} status="error" />
      )}
      <ProfileUpdateInfo />
      <Box display="flex">
        <Box flexGrow={1} className="image-preview-container">
          {!imgView && !pdfView && (
            <span className="image-text-center">
              Click on a document name to preview it.
            </span>
          )}

          {imgView && <img src={imgData} alt="details" />}
          {pdfView && (
            <object
              data={pdfData}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ position: "relative" }}
            >
              {/* <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p> */}
            </object>
          )}
        </Box>
        <Box className="right-box-inner">
          <Box>
            <Link to="/profile/documents" className="back-button mb-24">
              <KeyboardArrowLeftIcon /> Back to all documents{" "}
            </Link>
            {/* <span className="back-button mb-24" download onClick={(e) => download(e)}><KeyboardArrowLeftIcon /> asdasds </span> */}
            <h1 className="mb-24 f-400">
              {paramsId === "passport"
                ? "Copy of Passport in Colour including front cover. (Right to work)"
                : ""}
              {paramsId === "immunisation_records"
                ? "Immunisation records - Proof of immunity for (Varicella, Tuberculosis, Rubella, Measles, Hep B Level 100). Blood results needs to be traceable to exact Clinic/ source. For EPP clearance ( HIV 1 & 2) Hep C and Hep B surface antigen ( IVS)"
                : ""}
              {paramsId === "training_certificates"
                ? "Mandatory training certificates- Fire safety, BLS,MH, Infection control, safeguarding child/Adult etc"
                : ""}
              {paramsId === "nursing_certificates"
                ? "Nursing Certificates/ Diploma/NVQ"
                : ""}
              {paramsId === "professional_indemnity_insurance"
                ? "Proof of Current Professional Indemnity Insurance"
                : ""}
              {paramsId === "nmc_statement" ? "NMC statement of entry" : ""}
              {paramsId === "dbs_disclosure_certificate"
                ? "DBS disclosure certificate- Front and back"
                : ""}
              {paramsId === "cv"
                ? "CV- Work history from school leaving age with no gaps. Please ensure that all dates are in (DD/MM/YY) format"
                : ""}
              {paramsId === "employment"
                ? "TWO references covering the last 3 years of employment (must include hospital/company stamp or company/hospital logo letter head)"
                : ""}
              {paramsId === "address_proof"
                ? "TWO proofs of address dated within last 3 months (bank statement, utility bill, official government letter etc.)"
                : ""}
              {paramsId === "passport_photo"
                ? "X1 passport Photo for ID badge"
                : ""}
              {paramsId === "proof_of_ni"
                ? "Proof of NI- Any letter from HMRC showing NI number or Copy of NI card ( front & back Copy ) -We don’t accept payslips"
                : ""}
            </h1>

            <Box className="mb-24">
              <h2 className="title-label">UPLOADED FILES</h2>
              <div className="uploaded-files">
                {documentDetail &&
                  documentDetail?.data &&
                  documentDetail?.data?.map((list, index) => {
                    const extension = list.file_name.split(".").pop();
                    return (
                      <Box className="upload-link" display="block" key={index}>
                        <Box display="flex" alignItems="center" flexGrow={1}>
                          <Box flexGrow={1} display="flex" alignItems="center">
                            {extension === "pdf" ? (
                              <PictureAsPdfIcon />
                            ) : (
                              <InsertPhotoOutlinedIcon />
                            )}
                            <span
                              className={classes.fileName}
                              onClick={(e) => viewFile(e, list.file_name)}
                            >
                              {list.file_name}
                            </span>
                          </Box>
                          <Box className={classes.actionBtnBox}>
                            <a
                              href={`http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/${list.file_name}`}
                              target="_blank"
                              rel="noreferrer" 
                              download={`http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/${list.file_name}`}
                              className="file-icons"
                            >
                              <ArrowDownwardIcon />
                            </a>
                            <Link
                              to="#"
                              className="file-icons"
                              onClick={(e) => deleteData(list.id)}
                            >
                              <DeleteIcon />
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
              </div>
            </Box>
            <Box>
              <h2 className="title-label">DOCUMENT STATUS</h2>
              <div className="document-upload-status d-flex y-center">
                {/* <span className="f-700 mr-4">NURSE </span> document status: */}
                <span className="f-700 mr-4"></span> document status:
                <div className="document-status ml-8">
                  {/* <span className="spinner mr-8"></span> */}
                  {documentDetail &&
                    documentDetail?.data &&
                    documentDetail?.data[0].document_status && (
                      <span
                        className=""
                        style={{ textTransform: "capitalize" }}
                      >
                        {documentDetail &&
                          getDocsStatusName(
                            documentDetail?.data[0].document_status.toLowerCase()
                          )}
                      </span>
                    )}
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ComplianceDetail;
