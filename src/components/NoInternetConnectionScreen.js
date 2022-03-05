import React from 'react';

export default function NoInternetConnectionScreen({ show }) {
    return (
        <div style={{ display: `${show ? 'block' : 'none'}` }}>
            <h1>Connection Lost...</h1>
        </div>
    );
}
