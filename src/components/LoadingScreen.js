import React from 'react';

export default function LoadingScreen({ show }) {
    return (
        <div style={{ display: `${show ? 'block' : 'none'}` }}>
            <h1>Please wait...</h1>
        </div>
    );
}
