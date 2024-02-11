const fs = require('fs');
const { errLogger, npmRun, getFolders } = require("./utils");


const [command, project] = process.argv.slice(2);
const projects = getFolders('projects');
if (!project) {
  Promise.allSettled(projects.map(pr => npmRun(pr, command))).then(process.exit).catch(process.exit);
} else if (projects.includes(project)) {
  npmRun(project, command).then(process.exit).catch(process.exit);
} else {
  errLogger`${project} is not a valid project`;
}
