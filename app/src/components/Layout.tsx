/**
 * @file Wraps each page and provides global UI elements, like the header.
 */
import {
  Grid,
  GridContainer,
  Header,
  SiteAlert,
  Title,
} from "@trussworks/react-uswds";
import Head from "next/head";
import { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";

import LanguageSelector from "./LanguageSelector";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props): ReactElement => {
  const { t, i18n } = useTranslation("components", { keyPrefix: "Layout" });

  return (
    <div lang={i18n.language}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SiteAlert showIcon={false} variant="emergency">
        <div className="font-body-2xs">
          <Trans
            i18nKey="Layout.demo_banner"
            ns="components"
            components={{
              "date-tag": (
                <span className="bg-accent-warm-dark display-inline-block padding-x-05 radius-sm" />
              ),
            }}
          />
        </div>
      </SiteAlert>
      <Header basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar width-full display-flex flex-justify">
            <Title>{t("title")}</Title>
            <LanguageSelector />
          </div>
        </div>
      </Header>
      <main className="padding-top-3">{children}</main>

      <GridContainer>
        <Grid row>
          <Grid col="fill">
            <a
              className="usa-link font-body-2xs desktop:font-body-sm margin-y-3 display-inline-block"
              href={"#TODO"}
            >
              {t("feedback")}
            </a>
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  );
};

export default Layout;
