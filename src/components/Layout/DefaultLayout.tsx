import React from 'react';

import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <div>
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
