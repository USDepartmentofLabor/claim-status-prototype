import { useTranslation } from "react-i18next";

// Note in the future to support multiple languages, use USWDS Language Picker once it is released
// https://github.com/uswds/uswds/pull/4937
const LanguageSelector = () => {
  const { t, i18n } = useTranslation("components", {
    keyPrefix: "LanguageSelector",
  });
  const currLanguage = i18n.language;

  return (
    <div className="flex-align-self-center desktop:margin-top-2">
      <a
        href={currLanguage === "es-US" ? "/en" : "/es-US"}
        className="display-inline-block usa-link font-body-2xs desktop:font-body-sm language-selector"
        lang={currLanguage === "es-US" ? "en" : "es-US"}
      >
        {t("language_to_switch_to")}
      </a>
    </div>
  );
};

export default LanguageSelector;
