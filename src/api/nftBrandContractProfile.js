import axios from 'axios';

const API_KEY = '061f601476ddbedd3633d79b4ec3904c';

export const fetchNFTBrandContractProfile = async () => {
  const options = {
    method: 'GET',
    url: 'https://api.unleashnfts.com/api/v2/nft/brand/contract_profile',
    params: {
      blockchain: 'ethereum',
      time_range: '24h',
      offset: '0',
      limit: '30',
      sort_by: 'diamond_hands',
      sort_order: 'desc'
    },
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching NFT brand contract profile:', error);
    throw error;
  }
};
