import React, { useEffect } from 'react';
import CommonMethodsHOC from './../../hocs/CommonMethodsHOC';

function Register() {

    useEffect(() => {
        // dispatch(diableSearchProductRepositoriesOption());
        // dispatch(diableSearchRepoProductsOption());
        return () => {
            // runs when you leave this component, or distroyed this component
            // dispatch(enableSearchProductRepositoriesOption());
            // dispatch(enableSearchRepoProductsOption());
        }
    }, []);

    return (
        <div>
            Register Component
        </div>
    );
}

export default CommonMethodsHOC(Register);