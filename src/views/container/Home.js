import React from 'react';
import CommonMethodsHOC from './../../hocs/CommonMethodsHOC';
import _ from 'lodash';

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}


export default CommonMethodsHOC(Home);