import axios from 'axios';

const API_KEY = '3e736dba7151eb8de28a065916dc9d70';
const BASE_URL = 'https://api.unleashnfts.com/api/v2/nft';

const nftApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'accept': 'application/json',
    'x-api-key': API_KEY
  }
});

export const fetchNFTBrandMetadata = async (params = {}) => {
  const defaultParams = {
    blockchain: 'ethereum',
    offset: '0',
    limit: '30'
  };

  try {
    const response = await nftApi.get('/brand/metadata', {
      params: { ...defaultParams, ...params }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching NFT brand metadata:', error);
    throw error;
  }
};
