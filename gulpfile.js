var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;
var shell = require('shelljs');
var touch = require('touch');

process.env.NODE_PATH = 'src';

// gulp-exec is more robust, but this will do for now
// (don't forget that eventually this will trigger a buffer overflow)
function runCommand(command) {
    return function (cb) {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    };
}

gulp.task('mongo-start', runCommand('mongod --port 27019 --dbpath ./data/')); // no fork
gulp.task('mongo-stop', runCommand('mongo admin --port 27019 --eval "printjson(db.shutdownServer())"'));

// reset data and smtp queue directories
gulp.task('flush', function() {
    shell.rm('-rf', './data/*');
    touch('./data/.gitkeep');
    shell.rm('-rf', './smtpPickup/*');
    touch('./smtpPickup/.gitkeep');
});

gulp.task('default', function() {
    nodemon({script : './index.js', ext : 'js'});
});
