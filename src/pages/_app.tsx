import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Noto_Sans_KR } from '@next/font/google';

import wrapper from 'state/store';
import DefaultLayout from 'components/Layout/DefaultLayout';
import SEO from 'config/seo.config';
import { GlobalStyle } from 'styles/global-style';
import { lightTheme } from 'styles/theme';

declare global {
    interface Window {
        Kakao: any;
        kakao: any;
        NCPPay: any;
    }
}

const notoSans = Noto_Sans_KR({
    weight: ['300', '500', '700', '900'],
    variable: '--noto',
    display: 'fallback',
});

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

    const store = useStore() as any;

    return (
        <>
            <style jsx global>{`
                :root {
                    --font-base: ${notoSans.style.fontFamily};
                }
            `}</style>
            <PersistGate
                persistor={store.__persistor}
                loading={<div>loading...</div>}
            >
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
