import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';

import { GlobalStyle } from 'styles/global-style';
import { lightTheme } from 'styles/theme';
import SEO from 'config/seo.config';
import DefaultLayout from 'components/Layout/DefaultLayout';
import wrapper from 'state/store';

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

declare global {
    interface Window {
        Kakao: any;
    }
}

function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

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
                <Hydrate state={pageProps.dehydratedState}>
                    <ThemeProvider theme={lightTheme}>
                        <DefaultLayout>
                            <Component {...pageProps} />
                        </DefaultLayout>
                    </ThemeProvider>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default wrapper.withRedux(appWithTranslation(App));
