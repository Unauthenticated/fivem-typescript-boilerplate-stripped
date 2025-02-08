//@ts-check

import { exists, exec, getFiles } from './utils.js';
import { createBuilder, createFxmanifest } from '@overextended/fx-utils';

const watch = process.argv.includes('--watch');

createBuilder(
  watch,
  {
    dropLabels: !watch ? ['DEV'] : undefined,
  },
  [
    {
      name: 'server',
      options: {
        platform: 'node',
        target: ['node16'],
        format: 'cjs',
      },
    },
    {
      name: 'client',
      options: {
        platform: 'browser',
        target: ['es2021'],
        format: 'iife',
      },
    },
  ],
  async (outfiles) => {
    const files = await getFiles('static', 'locales');
    await createFxmanifest({
      client_scripts: [outfiles.client],
      server_scripts: [outfiles.server],
      files: ['lib/init.lua', 'lib/client/**.lua', 'locales/*.json', 'common/data/*.json', ...files],
      dependencies: ['/server:7290', '/onesync'],
      metadata: {
        
      },
    });
  }
);
