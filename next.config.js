/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    experimental: {
        esmExternals: false,
    },
});
