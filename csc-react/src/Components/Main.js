import React from "react";

export default function Main() {
    return (
        <div style={{
            justifyContent:"center",
            textAlign: "center",
            fontFamily: "Cochin",
            fontWeight: "bold",
            color: 'white',
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
        }}>
            <h3>Welcome to <br/>Countries->States->Cities</h3>
        </div>
    );
}