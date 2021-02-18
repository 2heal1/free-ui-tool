#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();

program
  .version(require('../package.json').version)
  .usage("<command> [options] ")

  program
  .command('config get')
  .description('获取配置文件')
  .option('-c,--component ', '获取组件配置')
  .option('-d,--detail component ', '获取详细组件配置')
  .action((...args) => require('../lib/commands/config')(...args));


program
  .command('migrate')
  .description('迁移UI库')
  .action((...args) => require('../lib/commands/migrate')(...args));


program.parse(process.argv);


