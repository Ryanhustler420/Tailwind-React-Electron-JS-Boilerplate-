import React from 'react';

export default function NetworkIssueScreen({ show }) {
    return (
        <div style={{ display: `${show ? 'block' : 'none'}` }}>
            <h1>Network Issue...</h1>
        </div>
    );
}
