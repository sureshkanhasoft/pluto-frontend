import React, { useState } from 'react';
import {
    Container,
    Chip,
    LinearProgress,
    Box,
    makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import './compliance.scss';
import InfoIcon from '@material-ui/icons/Info';
import ListAltIcon from '@material-ui/icons/ListAlt';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PublishIcon from '@material-ui/icons/Publish';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
    progressbar: {
        backgroundColor: "#e6e6e6",
        "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: "#21d5ac",
        },
    }
}))

const Compliance = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const handleClick = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mt-16">Compliance</h1>
                    <div className="">
                        {
                            [1, 2].map((index) => (
                                <div className="document-upload-container" key={index}>
                                    <div className="document-header">
                                        <div className="f-grow">
                                            <div className="d-flex mb-8">
                                                <InfoIcon className="header-left-icon" />
                                                <h1 className="title-text mb-0 f-700">PASSPORT (INCLUDING COVER)</h1>
                                            </div>
                                            <Chip label="REQUIRED" className="required"></Chip>
                                        </div>
                                        <div className="d-flex">
                                            <button className="btn">
                                                <PublishIcon className='mr-8' />
                                                <input type="file" onChange={handleClick} />
                                                <span>Upload files</span>
                                            </button>
                                            <Link to="/profile/documents/1" className="btn view-btn"><ListAltIcon className='mr-8' />View Details</Link>
                                            <Link to="#" className="btn show-more">Show More <KeyboardArrowDownIcon /></Link>
                                        </div>
                                    </div>
                                    <div className="document-status-container">
                                        <div className="document-upload-status d-flex y-center">
                                            <span className="f-700 mr-4">NURSE </span> document status:
                                            <div className="document-status ml-8">
                                                <span className="spinner mr-8 "></span>
                                                <span className="">Pending</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="upload-listing-content">
                                        <div to="/profile/documents/1" className="file-listing uploading-file-container">
                                            <Box className="file-listing-inner d-flex flex-grow">
                                                <Box className="upload-icon">
                                                    <ArrowUpwardIcon />
                                                </Box>
                                                <Box flexGrow={1}>
                                                    <Box display="flex">
                                                        <Box component="p" flexGrow={1}>Uploading: file-name.png</Box>
                                                        <p variant="body2">{`${Math.round(progress,)}%`}</p>
                                                    </Box>

                                                    <LinearProgress variant="determinate" value={progress} className={classes.progressbar} />
                                                </Box>
                                            </Box>
                                        </div>
                                        <Link to="/profile/documents/1" className="file-listing">
                                            <div className="file-listing-inner d-flex flex-grow">
                                                <div className="image-icon">
                                                    <InsertPhotoOutlinedIcon />
                                                </div>
                                                <div>
                                                    <span className="file-list-lable">FILE NAME</span>
                                                    <p className="mb-0">screenshot-from-2021-07-05-17-14-19.png</p>
                                                </div>
                                            </div>
                                            <div className="file-listing-inner">
                                                <span className="file-list-lable">DATE ADDED</span>
                                                <p className="mb-0">05-07-2021</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </Container>
            </section>
        </>
    );
};

export default Compliance;