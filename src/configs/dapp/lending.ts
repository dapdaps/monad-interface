import Config from '@/configs/lending';

const ROUTE_CONFIG = {
  timeswap: {
    type: 'lending',
    theme: {
      '--button-color': '#68B04D',
      '--switch-color': '#68B04D',
      '--button-text-color': '#FFFFFF',
      '--supply-color': '#68B04D',
      '--yours-table-title': '#FFFFFF',
      '--borrow-color': '#FFFFFF',
      '--withdraw-bg-color': '#68B04D',
      '--withdraw-border-color': '#68B04D',
      '--withdraw-bg-hover-color': '#68B04D',
      '--repay-bg-color': '#68B04D',
      '--repay-border-color': '#68B04D',
      '--repay-bg-hover-color': '#68B04D',
      '--claim-bg-hover-color': '#68B04D',
      '--claim-bg-color': '#68B04D',
      '--claim-border-color': '#68B04D',
      '--withdraw-color': '#FFFFFF',
      '--replay-color': '#FFFFFF',
      '--claim-color': '#FFFFFF'
    },
    icon: '/images/dapps/dolomite.svg',
    config: Config.Dolomite,
  },
};

export default ROUTE_CONFIG;
