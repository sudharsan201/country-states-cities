import React from 'react';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import City from "./City";
import StateList from "./StateList";

const CityManage = () => {
    return (
        <MDBContainer>
            <MDBRow>

                <MDBCol md="6">
                    <City/>
                </MDBCol>
                <MDBCol md="6">
                    <StateList/>
                </MDBCol>

            </MDBRow>
        </MDBContainer>
    )
}

export default CityManage;