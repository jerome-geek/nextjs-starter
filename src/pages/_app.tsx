import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Header from 'components/Common/Header';

import { GlobalStyle } from '../styles/global-style';
import { lightTheme } from '../styles/theme';
import Footer from 'components/Common/Footer';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>boilerplate</title>
            </Head>
            <GlobalStyle />
            <ThemeProvider theme={lightTheme}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default App;
