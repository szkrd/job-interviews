// renders README.ejs to README.md using package.json from the project subdirectories
import ejs from 'ejs';
import shell from 'shelljs';
import { writeFileSync } from 'fs';
import path from 'path';
const templateData = {};
const assocMap = {};
const files = (templateData.files = shell
  .ls('-d', 'src/*/**.ts')
  .map((fn) => {
    const data = (assocMap[fn] = {
      fullPath: fn,
      dirs: path.dirname(fn).replace('src/', ''),
      name: path.basename(fn).replace(/\.ts$/, ''),
      isTs: fn.endsWith('.ts'),
      isJs: fn.endsWith('.js'),
      hasSpec: false,
      hasAny: false,
      isSpec: fn.endsWith('.spec.ts'),
    });
    return data;
  })
  .filter((data) => {
    const tsPair = data.fullPath.replace(/\.spec\.ts$/, '.ts');
    if (data.isSpec && assocMap[tsPair]) assocMap[tsPair].hasSpec = true;
    return !data.isSpec;
  }));
files.forEach((data) => {
  data.hasAny = (shell.cat(data.fullPath) + '').includes('@typescript-eslint/no-explicit-an');
});
const rendered = ejs.render(shell.cat('README.ejs') + '', templateData);
writeFileSync('README.md', rendered, 'utf-8');
