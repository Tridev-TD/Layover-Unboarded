import { spawn } from 'node:child_process';

const isWindows = process.platform === 'win32';
const child = command => spawn(command, { shell:true, stdio:'inherit' });
const server = child('node server.js');
const client = child('vite');
const stop = () => { server.kill(); client.kill(); process.exit(); };
process.on('SIGINT', stop); process.on('SIGTERM', stop);
