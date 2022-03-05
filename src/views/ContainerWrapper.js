import React from 'react';

import NoInternetConnectionScreen from '../components/NoInternetConnectionScreen';
import NetworkIssueScreen from './../components/NetworkErrorScreen';
import LoadingScreen from '../components/LoadingScreen';
import { useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';

export default function ContainerWrapper({ children }) {
    const appState = useSelector(({ applicationState }) => applicationState.bucket)
    const isOnline = useSelector(({ connection }) => connection.isOnline);

    return (
        <div>
            <LoadingScreen show={appState?.isLoadingPanel} />
            <NoInternetConnectionScreen show={!isOnline} />
            <NetworkIssueScreen show={appState?.isNetworkIssue} />
            <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <main>
                {/* <SideNav user={user} show={true} /> */}
                <section>
                    {/* <Header show={true} /> */}
                    {children}
                    {/* <Footer show={true} /> */}
                </section>
            </main>
            {/* <SVGs /> */}
        </div>
    );
}
