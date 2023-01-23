/**
 * @file Entry point for the web app. All pages are children of this component.
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import "../../styles/styles.scss";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const { query } = useRouter();

  return (
    <Layout>
      <Component {...pageProps} query={query} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
