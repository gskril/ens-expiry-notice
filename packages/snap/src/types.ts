export type SubgraphResponse = {
  data: {
    domains: {
      name: string;
      registration: {
        expiryDate: string;
      };
    }[];
  };
};
