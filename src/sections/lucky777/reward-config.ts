export interface RewardConfig {
  code: string;
  icon: string;
  alt: string;
  stateKey: string; 
  displayName: string;
}

export const REWARD_CONFIGS: RewardConfig[] = [
  {
    code: '666',
    icon: '/images/lucky777/chogstarrr-icon.png',
    alt: 'ML',
    stateKey: 'chogStarrr',
    displayName: 'ChogStarrr',
  },
  {
    code: '777',
    icon: '/images/lucky777/monadverse-icon.png',
    alt: 'ML',
    stateKey: 'monadverse',
    displayName: 'GTD',
  },
  {
    code: '888',
    icon: '/images/lucky777/monadoon-icon.png',
    alt: 'ML',
    stateKey: 'monadoon',
    displayName: 'Monadoon',
  },
  {
    code: '999',
    icon: '/images/lucky777/smlmonad-icon.png',
    alt: 'ML',
    stateKey: 'slmnd',
    displayName: 'SLMND',
  },
  {
    code: '101010',
    icon: '/images/lucky777/lamouch.png',
    alt: 'ML',
    stateKey: 'lamouch',
    displayName: 'LaMouch',
  },
  {
    code: '111111',
    icon: '/images/lucky777/overnads.png',
    alt: 'ML',
    stateKey: 'overnads',
    displayName: 'Overnads',
  },
  {
    code: '121212',
    icon: '/images/lucky777/deadnads-icon.png',
    alt: 'ML',
    stateKey: 'deadnads',
    displayName: 'Deadnads',
  },
  {
    code: '131313',
    icon: '/images/lucky777/logo/coronad-icon.png',
    alt: 'ML',
    stateKey: 'coronad',
    displayName: 'Coronads',
  },
  {
    code: '141414',
    icon: '/images/lucky777/logo/monshape-icon.png',
    alt: 'ML',
    stateKey: 'monshape',
    displayName: 'Monshape',
  },
  {
    code: '151515',
    icon: '/images/lucky777/logo/liamao-icon.png',
    alt: 'ML',
    stateKey: 'llamao',
    displayName: 'Llamao',
  },
  {
    code: '161616',
    icon: '/images/lucky777/logo/skrumpeys-icon.png',
    alt: 'ML',
    stateKey: 'skrumpeys',
    displayName: 'Skrumpeys',
  },
  {
    code: '171717',
    icon: '/images/lucky777/logo/moana-icon.png',
    alt: 'ML',
    stateKey: 'moana',
    displayName: 'Moana',
  },
  {
    code: '181818',
    icon: '/images/lucky777/logo/spikynads-icon.png',
    alt: 'ML',
    stateKey: 'spikynads',
    displayName: 'Spikynads',
  },
  {
    code: '191919',
    icon: '/images/lucky777/logo/mop-icon.png',
    alt: 'ML',
    stateKey: 'mop',
    displayName: 'Mop',
  },
  {
    code: '202020',
    icon: '/images/lucky777/logo/mondies-icon.png',
    alt: 'ML',
    stateKey: 'mondies',
    displayName: 'Mondies',
  },
  {
    code: '212121',
    icon: '/images/lucky777/logo/nns-icon.png',
    alt: 'ML',
    stateKey: 'nns',
    displayName: 'NNS',
  },
  {
    code: '222222',
    icon: '/images/lucky777/logo/baldnads-icon.png',
    alt: 'ML',
    stateKey: 'baldnads',
    displayName: 'Baldnads',
  },
  {
    code: '232323',
    icon: '/images/lucky777/logo/owlsmonad-icon.png',
    alt: 'ML',
    stateKey: 'owlsmonad',
    displayName: 'OwlsMonad',
  }
];

export const getRewardConfigByCode = (code: string): RewardConfig | undefined => {
  return REWARD_CONFIGS.find(config => config.code === code);
};

export const getAllRewardCodes = (): string[] => {
  return REWARD_CONFIGS.map(config => config.code);
};
