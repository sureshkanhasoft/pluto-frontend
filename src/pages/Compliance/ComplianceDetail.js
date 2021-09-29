import React, { useEffect, useState } from 'react';
import {
    Box, makeStyles, Backdrop, CircularProgress
} from "@material-ui/core"
import { Link } from 'react-router-dom';
import './compliance.scss';
import { deleteDocument, documentDetails } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import Notify from '../../components/Notify/Notify';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    fileName: {
        wordBreak: "break-all",
        cursor:"pointer"
    },
    actionBtnBox: {
        display: "flex",
        marginLeft: 20
    }
}))

const ComplianceDetail = ({ match }) => {
    const paramsId = match.params.id;
    const classes = useStyles();
    const baseUrl = "http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/"
    const dispatch = useDispatch();
    const [deleteNotify, setDeleteNotify] = useState(false)
    const [imgView, setImgView] = useState("")
    const [pdfView, setPdfView] = useState("")

    const pdfData = `${baseUrl}${pdfView}`
    const imgData = `${baseUrl}${imgView}`


    const { documentDetail, loading, deleteDocumentSuccess, deleteDocumentError } = useSelector(state => state.addCompliance);

    const deleteData = (id) => {
        dispatch(deleteDocument(id))
        setDeleteNotify(true)
    }

    useEffect(() => {
        dispatch(documentDetails(`${paramsId}`))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const viewFile = (e, filename) => {
        const extension = filename.split('.').pop()
        if(extension === "pdf") {
            setImgView("")
            setPdfView(filename)
        } else {
            setImgView(filename)
            setPdfView("")
        }
    }
    

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {deleteNotify && (deleteDocumentSuccess?.message || deleteDocumentSuccess) &&
                <Notify
                    data={deleteDocumentSuccess?.message ? deleteDocumentSuccess?.message : deleteDocumentSuccess}
                    status="success"
                />
            }
            {deleteNotify && deleteDocumentError?.message &&
                <Notify
                    data={deleteDocumentError?.message}
                    status="error"
                />
            }
            <ProfileUpdateInfo />
            <Box display="flex">
                <Box flexGrow={1} className="image-preview-container">
                    <span className="image-text-center">Click on a document name to preview it.</span>
                    {
                        imgView && <img src={imgData} alt="details"  />
                    }
                    {
                        pdfView &&
                        <object data={pdfData} type="application/pdf" width="100%" height="100%" style={{position:"relative"}}>
                            {/* <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p> */}
                        </object>
                    }
                </Box>
                <Box className="right-box-inner">
                    <Box >
                        <Link to="/profile/documents" className="back-button mb-24"><KeyboardArrowLeftIcon /> Back to all documents </Link>
                        <h1 className="mb-24 f-400">{paramsId}</h1>

                        <Box className="mb-24">
                            <h2 className="title-label">UPLOADED FILES</h2>
                            <div className="uploaded-files">
                                {
                                    documentDetail && documentDetail?.data?.data && documentDetail?.data?.data.map((list, index) => {

                                        return (
                                            <Box className="upload-link" display="block" key={index}>
                                                <Box display="flex" alignItems="center" flexGrow={1}>
                                                    <Box flexGrow={1} display="flex" alignItems="center">
                                                        <InsertPhotoOutlinedIcon />
                                                        <span className={classes.fileName} onClick={e => viewFile(e, list.file_name)}>{list.file_name}</span>
                                                    </Box>
                                                    <Box className={classes.actionBtnBox}>
                                                        <a target="_blank" href={`http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/${list.file_name}`} download className="file-icons">
                                                            <ArrowDownwardIcon />
                                                        </a>
                                                        <Link to="#" className="file-icons" onClick={(e) => deleteData(list.id)}>
                                                            <DeleteIcon />
                                                        </Link>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                    })
                                }
                            </div>
                        </Box>
                        <Box>
                            <h2 className="title-label">DOCUMENT STATUS</h2>
                            <div className="document-upload-status">
                                {/* <span className="f-700 mr-4">NURSE </span> document status: */}
                                <span className="f-700 mr-4"></span> document status:
                                <div className="document-status mt-8">
                                    <span className="spinner mr-8"></span>
                                    <span className="">Pending Review</span>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ComplianceDetail
