import React, { useEffect, useState } from 'react';
import {
    Container,
    makeStyles, Button, Backdrop, CircularProgress
} from '@material-ui/core';

import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import './compliance.scss';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UploadFile from './UploadFile';
import { documentDetails } from '../../store/action';
import Notify from '../../components/Notify/Notify';

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
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))



const ComplianceList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const getToken = localStorage.getItem("token") ? localStorage.getItem("token").replace(/['"]+/g, '') : "";
    const [selectedFile, setSelectedFile] = useState([]);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [key2, setKey] = useState("")
    const { documentDetail, documentDetailError, loading } = useSelector(state => state.addCompliance);
    const [addDocMsg, setAddDocMsg] = useState("")
    const [notifyMsg, setNotifyMsg] = useState(false)

    const handleClick = (e, keyData) => {
        setKey(keyData)
        setSelectedFile(e.target.files);
    }

    useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            onSubmit();
        }
    }, [selectedFile])

    const onSubmit = (e) => {
        let formData = new FormData();

        for (const key of Object.keys(selectedFile)) {
            formData.append('files[]', selectedFile[key])
            formData.append('key', key2)
        }
        setAddDocMsg("")

        axios.post('http://backendbooking.kanhasoftdev.com/public/api/signee/upload-document', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': getToken ? `Bearer ${getToken}` : ""
            },
            onUploadProgress: progressEvent => {
                setUploadPercentage(
                    parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    )
                );
            }
        })
            .then(function (response) {
                const dataItem = response.data
                if (dataItem && dataItem.status === true) {
                    dispatch(documentDetails(""))
                    setNotifyMsg(true)
                    setAddDocMsg("Document Uploaded Successfully")
                }
            })
            .catch(function (error) {
                setAddDocMsg(error.message)
            });
    }

    useEffect(() => {
        dispatch(documentDetails(""))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {notifyMsg && addDocMsg &&
                <Notify
                    data={addDocMsg}
                    status="success"
                />
            }
            <ProfileUpdateInfo />

            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mt-16">Compliance</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <UploadFile
                            title="Copy of Passport in Colour including front cover. (Right to work)"
                            key1="passport"
                            handleClick={(e) => handleClick(e, 'passport')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="Immunisation records - Proof of immunity for (Varicella, Tuberculosis, Rubella, Measles, Hep B Level 100). Blood results needs to be traceable to exact Clinic/ source. For EPP clearance ( HIV 1 & 2) Hep C and Hep B surface antigen ( IVS)"
                            key1="immunisation_records"
                            handleClick={(e) => handleClick(e, 'immunisation_records')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="Mandatory training certificates- Fire safety, BLS,MH, Infection control, safeguarding child/Adult etc"
                            key1="training_certificates"
                            handleClick={(e) => handleClick(e, 'training_certificates')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="Nursing Certificates/ Diploma/NVQ"
                            key1="nursing_certificates"
                            handleClick={(e) => handleClick(e, 'nursing_certificates')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="Proof of Current Professional Indemnity Insurance"
                            key1="professional_indemnity_insurance"
                            handleClick={(e) => handleClick(e, 'professional_indemnity_insurance')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="NMC statement of entry"
                            key1="nmc_statement"
                            handleClick={(e) => handleClick(e, 'nmc_statement')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="DBS disclosure certificate- Front and back"
                            key1="dbs_disclosure_certificate"
                            handleClick={(e) => handleClick(e, 'dbs_disclosure_certificate')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="CV- Work history from school leaving age with no gaps. Please ensure that all dates are in (DD/MM/YY) format"
                            key1="cv"
                            handleClick={(e) => handleClick(e, 'cv')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="TWO references covering the last 3 years of employment (must include hospital/company stamp or company/hospital logo letter head)"
                            key1="employment"
                            handleClick={(e) => handleClick(e, 'employment')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="TWO proofs of address dated within last 3 months (bank statement, utility bill, official government letter etc."
                            key1="address_proof"
                            handleClick={(e) => handleClick(e, 'address_proof')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile title="X1 passport Photo for ID badge"
                            key1="passport_photo"
                            handleClick={(e) => handleClick(e, 'passport_photo')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        <UploadFile
                            title="Proof of NI- Any letter from HMRC showing NI number or Copy of NI card ( front & back Copy ) -We don’t accept payslips"
                            key1="proof_of_ni"
                            handleClick={(e) => handleClick(e, 'proof_of_ni')}
                            uploadPercentage={uploadPercentage}
                            selectedFile={selectedFile}
                            documentDetail={documentDetail}
                        />
                        {/* <Button variant="contained" className={classes.btnSecondary} type="submit" formNoValidate>Upload</Button> */}
                    </form>

                </Container>
            </section>
        </>
    );
};

export default ComplianceList;