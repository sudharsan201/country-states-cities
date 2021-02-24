import React from 'react';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import Country from './Country';

const CountryManage = () => {
    return (
        <MDBContainer>
            <MDBRow>


                <MDBCol md="6">
                    <Country/>
                </MDBCol>



            </MDBRow>
        </MDBContainer>
    )
}

export default CountryManage;