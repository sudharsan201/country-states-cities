import React from 'react';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import State from './State';
import CountryList from "./CountryList";

const StateManage = () => {
    return (
        <MDBContainer>
            <MDBRow>

                <MDBCol md="6">
                    <State/>
                </MDBCol>
                <MDBCol md="6">
                    <CountryList/>
                </MDBCol>

            </MDBRow>
        </MDBContainer>
    )
}

export default StateManage;