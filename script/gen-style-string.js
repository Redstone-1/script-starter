const less = require('less');
const fs = require('fs');
const path = require('path');

const styleContent = fs.readFileSync(path.resolve(__dirname, '../style/index.less'), 'utf-8');

less.render(styleContent).then((output) => {
  if(output.css) {
    const code = `export default \`\n${output.css}\`;`;

    const relativePath = '../style/index.ts';
    const filePath = path.resolve(__dirname, relativePath);

    if(fs.existsSync(filePath)) {
      fs.rm(filePath, () => {
        fs.writeFileSync(path.resolve(__dirname, relativePath), code);
      })
    } else {
      fs.writeFileSync(path.resolve(__dirname, relativePath), code);
    }
  }
});
