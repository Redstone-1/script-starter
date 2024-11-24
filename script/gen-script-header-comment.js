const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const codeFilePath = '../dist/script.iife.js';
const configFilePath = '../tampermonkey.config';
const codeContent = fs.readFileSync(path.resolve(__dirname, codeFilePath), 'utf-8');
const tampermonkeyConfig = fs.readFileSync(path.resolve(__dirname, configFilePath), 'utf-8');

if (codeContent) {
  const code = `${tampermonkeyConfig}\n${codeContent}`;

  prettier.format(code, { parser: 'babel' }).then((formatted) => {
    fs.writeFileSync(path.resolve(__dirname, codeFilePath), formatted);
  });
}
