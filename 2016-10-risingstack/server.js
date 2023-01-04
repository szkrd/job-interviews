// DO NOT TRY TO RUN IN A MINGW32 ENVIRONMENT
// sh.exe will be fork bombed!!
var shell = require('shelljs');
process.env.NODE_PATH = 'src'; // no go for package.json on windows :P
shell.exec('node --harmony index.js'); // which is node execSync actually
