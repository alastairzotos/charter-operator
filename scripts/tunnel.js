const lt = require('localtunnel');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const outputDir = path.resolve(__dirname, '..', 'tmp');
const outputPath = path.resolve(outputDir, 'tunnel');

const start = async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  process.on('SIGINT', () => {
    fs.rmSync(outputPath);
  })

  const tunnel = await lt({ port: 3001 });
  console.log(tunnel.url);
  fs.writeFileSync(outputPath, tunnel.url, 'utf-8');
}

start();
