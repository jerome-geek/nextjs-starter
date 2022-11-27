import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import wrapper, { makeStore } from 'state/store';
import DefaultLayout from 'components/Layout/DefaultLayout';
import SEO from 'config/seo.config';
import { GlobalStyle } from 'styles/global-style';
import { lightTheme } from 'styles/theme';

function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 0,
                        useErrorBoundary: true,
                        refetchOnWindowFocus:
                            process.env.NODE_ENV === 'production',
                    },
                    mutations: {
                        useErrorBoundary: true,
                    },
                },
            }),
    );

    const persistor = persistStore(makeStore());

    return (
        <>
            <PersistGate persistor={persistor} loading={<div>loading...</div>}>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <ThemeProvider theme={lightTheme}>
                            <DefaultSeo {...SEO} />
                            <GlobalStyle />
                            <Head>
                                <meta
                                    name='viewport'
                                    content='width=device-width, initial-scale=1'
                                />
                                <title>Voice Caddie</title>
                            </Head>
                            <DefaultLayout>
                                <Component {...pageProps} />
                            </DefaultLayout>
                        </ThemeProvider>
                    </Hydrate>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </PersistGate>
        </>
    );
}

export default wrapper.withRedux(appWithTranslation(App));
