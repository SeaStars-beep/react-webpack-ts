import { ScreenConfig } from '@src/meta';

const exportKeys = ['ScreenGasStation'];

const configs: { [key: string]: ScreenConfig } = {};
for (const key of exportKeys) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  configs[key] = require(`./${key}`).default;
}

export default configs;
