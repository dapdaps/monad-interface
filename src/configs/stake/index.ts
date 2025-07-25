import apriori from './dapps/apriori';
import magma from './dapps/magma';

export default {
  apriori: apriori,
  magma: magma,
} as Record<string, { basic: any; networks: Record<number, any> }>;
