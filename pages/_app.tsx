import { DefaultLayout } from '../components/DefaultLayout';
import '../public/antd.min.css';
import { trpc } from '../src/utils/trpc';
import '../styles/globals.css';
import withTheme from '../theme';
import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(withTheme(<Component {...pageProps} />));
}) as AppType;

export default trpc.withTRPC(MyApp);
