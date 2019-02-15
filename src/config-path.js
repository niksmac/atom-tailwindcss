/* global atom */
'use strict';

const fs = require('fs');
const readPkg = require('read-pkg');

const isInstalled = async (path) => {
  const pkg = await readPkg({
    cwd: path
  });

  if (pkg) {
    const dependencies = pkg.dependencies || [];
    const devDependencies = pkg.devDependencies || [];

    const packages = [
      ...Object.keys(dependencies),
      ...Object.keys(devDependencies)
    ];

    if (packages.includes('tailwindcss')) {
      return true;
    }
  }

  return false;
};

module.exports = async () => {
  const [path] = atom.project.getPaths();

  await isInstalled(path);

  const files = fs.readdirSync(path);
  const configFile = files.find(file => file === 'tailwind.js');

  if (configFile) {
    return `${path}/${configFile}`;
  }
};
