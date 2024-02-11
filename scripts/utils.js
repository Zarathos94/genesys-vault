const fs = require('fs');
const childProcess = require('child_process');
const path = require('path');

const baseDir = path.join(__dirname, '..');

const npmScripts = ['install', 'start', 'pack', 'publish'];

const npmRun = (project, command) => {
  return new Promise((resolve, reject) => {
    const projectPath = `${baseDir}/projects/${project}`;
    const packageJson = JSON.parse(fs.readFileSync(`${projectPath}/package.json`));
    if (!npmScripts.includes(command) && !packageJson.scripts[command]) {
      warnLogger`${command} is not a valid npm script for ${project} project.`;
      reject();
      return;
    }
    command = npmScripts.includes(command) ? [command] : ['run', command];
    const newNpm = childProcess.spawn('npm', command, { stdio: 'inherit', cwd: projectPath });
    newNpm.on('close', resolve);
    newNpm.on('error', reject);
  });
};

const createLogger = (color) => (...args) => {
  const messages = ['\n']
  args[0].forEach((arg, index) => {
    messages.push(color);
    messages.push(arg);
    messages.push('\x1b[0m');
    messages.push('\x1b[4m');
    messages.push(args[index + 1] ? args[index + 1] : '');
    messages.push('\x1b[0m');
  });
  messages.push('\n');
  console.log(messages.join(''));
};

const getFolders = (relPath) => fs.readdirSync(`${baseDir}/${relPath}`, { withFileTypes: true }).filter(file => file.isDirectory()).map(dir => dir.name);

const warnLogger = createLogger('\x1b[33m');
const errLogger = createLogger('\x1b[31m');
const succLogger = createLogger('\x1b[32m');

exports.warnLogger = warnLogger;
exports.errLogger = errLogger;
exports.succLogger = succLogger;
exports.npmRun = npmRun;
exports.getFolders = getFolders;
exports.baseDir = baseDir;
