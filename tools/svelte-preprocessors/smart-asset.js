const svelte = require('svelte/compiler');
const postcss = require('postcss');
const path = require('path');
const postcssCfg = require(path.resolve(__dirname,'postcss.config.js')); // why does it work this way
const smartAssetPlugin =postcssCfg.plugins.find(plugin => plugin.postcssPlugin === "postcss-smart-asset");
const smartAssetsCfg = postcssCfg.smartAssetsCfg;
const micromatch = require('micromatch');
const cssProcessor = postcss(smartAssetPlugin);


async function smartAssetMarkup(content, options) {
  const assets = await collectAssets(content);
  await process(assets,options);
  return update(content,assets);
}

async function collectAssets(content) {
  const assetPaths = [];
  const ast = svelte.parse(content);
  await svelte.walk(ast,{enter:(node) => {
      if (!node.attributes
        || node.attributes.length === 0
        || !["Element", "Fragment", "InlineComponent"].includes(node.type)) {
        return;
      }
      const candidates = node.attributes.filter(attribute => ['src','href','xlink:href'].includes(attribute.name)
        && attribute.value.length === 1 && attribute.value[0].type === 'Text'
      );
      if(candidates.length === 0) {
        return;
      }
      const paths = candidates.map(attribute => attribute.value[0]).filter(attributeValue => {
        if (isRelative(attributeValue.data)) {
          const {path,queryAndHash} = splitQueryAndHash(attributeValue.data);
          if(isHandledBySmartAsset(path)) {
            attributeValue.path = path;
            attributeValue.queryAndHash = queryAndHash;
            return true;
          }
        }
        return false;
      });
      if(paths.length === 0) {
        return;
      }
      assetPaths.push(...paths)
    }
  });
  return assetPaths;
}


function isHandledBySmartAsset(path) {
  for(const cfg of [].concat(smartAssetsCfg)) {
    if(isHandledBySmartAssetCfg(cfg, path)) {
      return true;
    }
  }
  return false;
}

function isHandledBySmartAssetCfg(cfg,path) {
  if(cfg.exclude) {
    if(micromatch.isMatch(path,cfg.exclude)) {
      return false;
    }
  }
  if(cfg.include) {
    if(micromatch.isMatch(path,cfg.include)) {
      return true;
    }
  }
  if(cfg.extensions) {
    for(const ext of cfg.extensions){
      if(path.endsWith(ext)) {
        return true;
      }
    }
  }
  return false;
}

function isRelative(url) {
  return !url.match(/(https?:)?\/\//)
}

function splitQueryAndHash(path) {
  const match = path.match(/^([^\?#]*)([\?#].*)?$/);
  return {path: match[1],queryAndHash: match[2]}
}

async function process(assets,options) {
  const processes = assets.map(
    asset => cssProcessor.process(`a{background-image:url('${asset.path}')}`,{from:'src/fake.css',to:`${options.outputDir}/fake.css`,sourceMap: false}
    ).then(result => asset.updatedPath=result.css.substring(24,result.css.length-3)));
  await Promise.all(processes);
}

async function update(content,assets) {
  const dependencies = assets.map(asset => asset.path);
  const code = replacePaths(content,assets);
  return {
    code,
    dependencies
  }
}

function replacePaths(content,assets) {
  let pos = 0;
  let result = '';
  for(let {start,end,updatedPath,queryAndHash} of assets) {
    result += content.slice(pos,start);
    result += updatedPath+(queryAndHash||'');
    pos = end;
  }
  result+=content.slice(pos)
  return result;
}

const defaultOpts = {
  outputDir: 'build'
}

function smartAssetPreprocessor(opts = {}) {
  const options = {
    ...defaultOpts,
    ...opts
  };

  return {
    markup: async ({ content }) => smartAssetMarkup(content,options)
  };
}

export default smartAssetPreprocessor;