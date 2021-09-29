import React, { useEffect } from 'react';
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

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    fileName: {
        wordBreak: "break-all"
    },
    actionBtnBox: {
        display: "flex",
        marginLeft: 20
    }
}))

const ComplianceDetail = (props) => {
    console.log('props: ', props.location.title);
    const classes = useStyles();
    const dispatch = useDispatch();

    const { documentDetail, documentDetailError, loading } = useSelector(state => state.addCompliance);
    console.log('documentDetail: ', documentDetail);

    const deleteData = (id) => {
        console.log('id: ', id);
        // dispatch(deleteDocument(id))
    }

    useEffect(() => {
        dispatch(documentDetails("passport"))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            <ProfileUpdateInfo />
            <Box display="flex">
                <Box flexGrow={1} className="image-preview-container">
                    <span className="image-text-center">Click on a document name to preview it.</span>
                    <img src="" alt="details" />
                </Box>
                <Box className="right-box-inner">
                    <Box >
                        <Link to="/profile/documents" className="back-button mb-24"><KeyboardArrowLeftIcon /> Back to all documents </Link>
                        <h1 className="mb-24 f-400">{props.location.title}</h1>

                        <Box className="mb-24">
                            <h2 className="title-label">UPLOADED FILES</h2>
                            <div className="uploaded-files">
                                {
                                    documentDetail?.data && documentDetail?.data.map((list, index) => (
                                        <Box className="upload-link" display="block" key={index}>
                                            <Box display="flex" alignItems="center" flexGrow={1}>
                                                <Box flexGrow={1} display="flex" alignItems="center">
                                                    <InsertPhotoOutlinedIcon />
                                                    <span className={classes.fileName}>{list.file_name}</span>
                                                </Box>
                                                <Box className={classes.actionBtnBox}>
                                                    <Link to={list.file_name} download className="file-icons">
                                                        <ArrowDownwardIcon />
                                                    </Link>
                                                    <Link to="#" className="file-icons" onClick={(e) => deleteData(list.id)}>
                                                        <DeleteIcon />
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </div>
                        </Box>
                        <Box>
                            <h2 className="title-label">DOCUMENT STATUS</h2>
                            <div className="document-upload-status">
                                <span className="f-700 mr-4">NURSE </span> document status:
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
