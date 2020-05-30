
import { readFileSync } from 'fs';

import ejs from 'ejs';


function mapEntriesAndAssetsByType(bundle) {
  const items = Object.values(bundle);
  const js = items.filter(item => (item.isEntry && item.fileName.endsWith('.js') && item.facadeModuleId.endsWith('.js')));
  const css = items.filter( item => (item.type === 'asset' || item.isAsset) && item.fileName.endsWith('.css'));
  const faviconEntry = items.find(item => item.facadeModuleId.endsWith('favicon.svg'));

  const result = {
    js,
    css
  };
  if(faviconEntry) {
    const match = faviconEntry.code.match(/"([^"]*favicon(?:~[^.]+)?.svg)"/m);
    if(match && match.length > 1) {
      const fileName = match[1].startsWith('./') ? match[1].substring(2) : match[1];
      result.favicon = {fileName};
    }
  }
  return result;
}

function generateHtml(bundle, templatePath,templateData) {
  const template = readFileSync(templatePath, { encoding: 'utf8' });
  const files = mapEntriesAndAssetsByType(bundle);

  return ejs.render(template, {
    ...templateData,
    files
  },{
    rmWhitespace: true
  });
}

const defaultOpts = {
  templatePath: 'src/index.ejs' ,
  fileName: 'index.html',
  title: '',
  favicon: '',
  templateData:{}
};

export default function createHTMLPlugin(opts = {}) {
  const { templatePath, fileName, templateData} = {...defaultOpts, ...opts};
  return {
    name: 'create-html-plugin',
    buildStart() {
      this.addWatchFile(templatePath);
    },
    async generateBundle(options, bundle) {
      const source = await generateHtml(bundle, templatePath,templateData);
      this.emitFile({
        type: 'asset',
        fileName,
        source
      });
    }
  };
}
