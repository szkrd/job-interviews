// DO NOT TRY TO RUN IN A MINGW32 ENVIRONMENT
// sh.exe will be fork bombed!!
var shell = require('shelljs');
process.env.NODE_PATH = 'src'; // no go for package.json on windows :P
process.env.NODE_ENV = 'TEST'; // this smells (a bit)

// no colors, though one would be able to access the on data events
shell.exec('mocha --harmony ' + process.argv.splice(2).join(' '));

// raw fallthrough - dies on windows, as usual
//var spawn = require('child_process').spawn;
//var child = spawn('mocha', ['--harmony'].concat(process.argv.splice(2)), {stdio: "inherit"});
