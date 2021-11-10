import React from 'react';
import {
    Container
} from '@material-ui/core';

export const MyShiftAccessInfoComponent = () => {
    const signeeInfo = JSON.parse(window.localStorage.getItem('signeeInfo'));
    return (
        <>
            {
                signeeInfo && signeeInfo.status !== "COMPLIANT" &&
                <section className="pt-16 pb-16">
                    <Container maxWidth="lg">
                        <h1 className="mt-16">You are not authorized to access this page</h1>
                    </Container>
                </section>
            }
        </>
    );
};

export const MyShiftAccessCheck = () => {
    const signeeInfo = JSON.parse(window.localStorage.getItem('signeeInfo'));
    let accessStatus = true;
    if(signeeInfo){
        if(signeeInfo.status !== "COMPLIANT"){
            accessStatus = false;
        }
    }
    return accessStatus;
};
