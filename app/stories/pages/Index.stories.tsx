import { useGlobals } from "@storybook/client-api";
import { ComponentMeta, Story } from "@storybook/react";
import React from "react";

import Layout from "../../src/components/Layout";
import Index from "../../src/pages/index";

const scenarios = {
  "1": "Incomplete Claim",
  "2": "Earnings review",
  "3": "Claim in review: Separation issue",
  "4": "Claim in review: Ability and availability issue",
  "5": "Claim in review: Work search issue",
  "6": "Decision made: eligible",
  "7": "Decision made: monetarily ineligible",
  "8": "Completed Claim",
};

export default {
  title: "Claim Status demo",
  component: Index,
  argTypes: {
    scenario: {
      description: "Toggle here to try out different claimant scenarios",
      defaultValue: Object.keys(scenarios)[0],
      options: Object.keys(scenarios),
      name: "Scenario example",
      control: {
        type: "radio",
        labels: scenarios,
      },
    },
  },
} as ComponentMeta<typeof Index>;

const Template: Story<{ scenario: string }> = (args) => {
  const [_, updateGlobals] = useGlobals();

  const toggleLanguage = (evt: Event) => {
    evt.preventDefault();
    const newLanguage =
      evt.target instanceof HTMLElement
        ? evt.target.getAttribute("lang")
        : "en";
    updateGlobals({
      locale: newLanguage,
    });
  };

  // Next.js and Storybook store the active language setting differently, so
  // need to intercept language toggling to do it the Storybook way here.
  React.useEffect(() => {
    const languageSelector = document.querySelector(".language-selector");
    languageSelector?.addEventListener("click", toggleLanguage);

    return () => {
      languageSelector?.removeEventListener("click", toggleLanguage);
    };
  });

  return (
    <Layout>
      <Index query={{ scenario: args.scenario }} />
    </Layout>
  );
};

export const Home = Template.bind({});
