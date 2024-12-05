const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const viteConfig = require('../vite.config');

const codeFilePath = '../tampermonkey.js';
const tampermonkeyConfig = fs.readFileSync(path.resolve(__dirname, '../tampermonkey.config'), 'utf-8');
const hostPort = `${viteConfig.server.host}:${viteConfig.server.port}`;
const codeContent = `
  // ==UserScript==
  ${tampermonkeyConfig}
  // ==/UserScript==

  (function () {
    'use strict';
    
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://${hostPort}/dist/${viteConfig.build.lib.name}.iife.js',
      onload: function(res) {
        if (res && (res.status === 200)) {
          const text = res.responseText;
          
          if (typeof text === 'string') {
            eval(text);
          }
        }
      }
    });
  })()
`;

prettier.format(codeContent, { parser: 'babel' }).then((formatted) => {
  if(fs.existsSync(path.resolve(__dirname, codeFilePath))) {
    fs.rm(path.resolve(__dirname, codeFilePath), () => {
      fs.writeFileSync(path.resolve(__dirname, codeFilePath), formatted);
    });
  }
  else {
    fs.writeFileSync(path.resolve(__dirname, codeFilePath), formatted);
  }
});
