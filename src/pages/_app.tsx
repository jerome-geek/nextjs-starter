import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';
import { GlobalStyle } from 'styles/global-style';
import { lightTheme } from 'styles/theme';
import { DefaultSeo } from 'next-seo';
import SEO from 'config/seo.config';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            useErrorBoundary: true,
            refetchOnWindowFocus: process.env.REACT_APP_MODE === 'production',
        },
        mutations: {
            useErrorBoundary: true,
        },
    },
});

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>Voice Caddie</title>
            </Head>
            <DefaultSeo {...SEO} />
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={lightTheme}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
