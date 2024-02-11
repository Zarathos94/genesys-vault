const fs = require('fs');
const { baseDir, getFolders, npmRun, succLogger } = require('./utils');

const projectToInstall = getFolders('projects').filter(folder => fs.readdirSync(`${baseDir}/projects/${folder}`).find(file => file === 'package.json'));

succLogger`Installing subprojects dependencies`;

if (projectToInstall.length) {
  Promise.allSettled(projectToInstall.map(connFolder => npmRun(connFolder, 'install'))).then(process.exit).catch(process.exit);
}