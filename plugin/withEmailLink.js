/**
 * Adds the given query schemes to the infoPlist app config
 */
const withLSApplicationQueriesSchemes = (
  config,
  schemes
) => {
  if (!config.ios) {
    config.ios = {};
  }
  if (!config.ios.infoPlist) {
    config.ios.infoPlist = {};
  }
  if (!Array.isArray(config.ios.infoPlist.LSApplicationQueriesSchemes)) {
    config.ios.infoPlist.LSApplicationQueriesSchemes = [];
  }

  config.ios.infoPlist.LSApplicationQueriesSchemes = [
    ...new Set([
      ...config.ios.infoPlist.LSApplicationQueriesSchemes,
      ...schemes,
    ]),
  ];

  return config;
};

/**
 * Configures Expo
 */
const withEmailLink = (config) => {
  config = withLSApplicationQueriesSchemes(config, [
    "message",
    "readdle-spark",
    "airmail",
    "ms-outlook",
    "googlegmail",
    "inbox-gmail",
    "ymail",
    "superhuman",
    "yandexmail",
    "fastmail",
    "protonmail",
  ]);
  return config;
};

exports.default = withEmailLink;
