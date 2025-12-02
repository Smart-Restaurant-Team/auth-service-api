import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "ar"],
    ns: ["auth", "user"],
    defaultNS: "common",

    backend: {
      loadPath: "./src/locales/{{lng}}/{{ns}}.json"
    },

    detection: {
      order: ["header"],
      caches: false
    }
  });

export default middleware.handle(i18next);
