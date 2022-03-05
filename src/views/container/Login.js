import React from 'react';
import CommonMethodsHOC from './../../hocs/CommonMethodsHOC';

function Login() {
    return (
        <div className='h-screen bg-black'>
            <h1 className='font-bolc text-white'>Login Component</h1>
        </div>
    );
}

export default CommonMethodsHOC(Login);