/**
 * @file The status page! This is the star of the show.
 */
import { Grid, GridContainer } from "@trussworks/react-uswds";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import ClaimDetails from "../components/ClaimDetails";
import Payments from "../components/Payments";
import PendingClaimantActions from "../components/PendingClaimantActions";
import StatusIndicator from "../components/StatusIndicator";
import useClaimData from "../hooks/useClaimData";
import { getClaimDetails } from "../utils/getClaimDetails";
import { getCompletedSteps } from "../utils/getCompletedSteps";
import { mergePayAndCerts } from "../utils/mergePayAndCerts";

interface StatusPageProps {
  query: { [param: string]: string | string[] };
}

const StatusPage = (props: StatusPageProps) => {
  const { t } = useTranslation("pages", { keyPrefix: "index" });

  // For demo purposes, the active claimant scenario can be toggled by changing the scenario
  // query param, however this wouldn't be needed in a real world application.
  const scenario =
    typeof props.query.scenario === "string" ? props.query.scenario : "1";

  // Since the demo is frontend-only, we're simulating a client-side API call via the useClaimData hook,
  // however in a production application this data fetching could happen on the server-side.
  const { data, loading, error } = useClaimData(scenario);

  // TODO: Implement more "production-ready" loading and error handling
  if (error) {
    return <div>{error}</div>;
  }

  if (loading || !data) {
    return <div>Loading....</div>;
  }

  const claimData = getClaimDetails(data);
  const steps = getCompletedSteps(data);
  const hasPayments = data.payments.length > 0;
  const formattedPayData = mergePayAndCerts(data);

  return (
    <GridContainer>
      <Head>
        <title>{t("seo_title")}</title>
      </Head>
      <Grid row>
        <Grid col="fill">
          <h1>{t("title")}</h1>
          <StatusIndicator stepsCompleted={steps} />
        </Grid>
      </Grid>
      <Grid row gap={3}>
        <Grid col="fill" className="order-2">
          <PendingClaimantActions data={data} />
          {hasPayments && (
            <>
              <Payments
                claimInfo={data.claim_info}
                payments={formattedPayData}
              />
            </>
          )}
        </Grid>
        <Grid
          col={12}
          tablet={{ col: 5 }}
          desktop={{ col: 4 }}
          className="order-1 tablet:order-2"
        >
          <ClaimDetails {...claimData} />
        </Grid>
      </Grid>
    </GridContainer>
  );
};

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? "en");
  return { props: { ...translations } };
};

export default StatusPage;
