import React from 'react';
import { Box } from "@material-ui/core"
import { Link } from 'react-router-dom';
import './compliance.scss';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';

const ComplainceDetail = () => {
    return (
        <>
            <ProfileUpdateInfo />
            <Box display="flex">
                <Box flexGrow={1} className="image-preview-container">
                    <span className="image-text-center">Click on a document name to preview it.</span>
                    <img src="" alt="details" />
                </Box>
                <Box className="right-box-inner">
                    <Box >
                        <Link to="/profile/documents" className="back-button mb-24"><KeyboardArrowLeftIcon /> Back to all documents </Link>
                        <h1 className="mb-24 f-400">Passport (including cover)</h1>

                        <Box className="mb-24">
                            <h2 className="title-label">UPLOADED FILES</h2>
                            <div className="uploaded-files">
                                {
                                    [1, 2, 3].map(index => (
                                        <Box className="upload-link" display="block" key={index}>
                                            <Box display="flex" alignItems="center" flexGrow={1}>
                                                <Box flexGrow={1} display="flex" alignItems="center">
                                                    <InsertPhotoOutlinedIcon />
                                                    <span>Capturing.PNG</span>
                                                </Box>

                                                <Box>
                                                    <Link to="#" download className="file-icons">
                                                        <ArrowDownwardIcon />
                                                    </Link>
                                                    <Link to="#" className="file-icons">
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

export default ComplainceDetail
