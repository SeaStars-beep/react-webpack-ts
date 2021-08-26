import { WXConfigArgs } from './meta';

export const config = (args: WXConfigArgs): Promise<void> => Promise.resolve();
export const openLocation = (args: {
  latitude: string;
  longitude: string;
  name: string;
  address: string;
  scale?: number;
  infoUrl: string;
}) => Promise.resolve();
export const getLocation = (args: { type?: 'wgs84' | 'gcj02' }) =>
  Promise.resolve({
    latitude: 39.914599, //30,
    longitude: 116.479459, //120,
  });
