/* eslint-disable global-require */
const path = require('path');
const {isProduction,assetRoots,assetExtensions} = require('./build-constants')

const smartAssetsCfg = assetRoots.map(root => ({
    include:  `${root}/**/*.(${assetExtensions.join('|')})`,
    url: 'copy',
    assetsPath: '.',
    basePath:path.resolve(__dirname),
    useHash: isProduction,
    keepName: true,
    hashOptions: {
        hash: 'metrohash128',
        encoding: 'base52',
        maxLength: 8
    }
}))

module.exports = {
        plugins: [
            require("postcss-import"),
            require("postcss-smart-asset")(smartAssetsCfg),
            require("tailwindcss")("./tailwind.config.js"),
            require("postcss-preset-env")({stage:1}),
            isProduction && require("cssnano")({
                preset: [
                    "default",
                    { discardComments: { removeAll: true } },
                ],
            }),
        ],
    smartAssetsCfg
};