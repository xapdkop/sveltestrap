import { withKnobs } from '@storybook/addon-knobs';
import pkg from '../package.json';

// Option defaults:
export const parameters = {
  options: {
    name: `sveltestrap ${pkg.version}`,
    url: 'https://github.com/bestguy/sveltestrap',
    panelPosition: 'right',
    showPanel: false
  }
};

export const decorators = [withKnobs];