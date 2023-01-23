/**
 * @file Customize the look-and-feel of Storybook
 * https://storybook.js.org/docs/react/configure/features-and-behavior
 */
import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

const theme = create({
  base: "dark",
  brandTitle: "U.S. Department of Labor",
  brandUrl: "https://www.dol.gov/",
  brandImage: `${process.env.BASE_PATH ?? ""}/img/dol-logo.svg`,
  brandTarget: "_self",
});

addons.setConfig({
  isFullscreen: false,
  showNav: false,
  showPanel: true,
  panelPosition: "right",
  enableShortcuts: true,
  showToolbar: true,
  theme,
  selectedPanel: undefined,
  initialActive: "canvas",
  sidebar: {
    showRoots: false,
  },
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: false },
    copy: { hidden: true },
    fullscreen: { hidden: true },
    outline: { hidden: true },
  },
});

/** Workaround to rename the panel's name in the Storybook UI on mobile-sized screens */
window.addEventListener("load", () => {
  const buttons = document.querySelectorAll("button");
  const addonsButton = Array.from(buttons).find(
    (button) => button.textContent.trim() === "Addons"
  );
  if (addonsButton) addonsButton.textContent = "Scenarios";
});
