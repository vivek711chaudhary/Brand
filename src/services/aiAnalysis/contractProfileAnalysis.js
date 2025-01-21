import axios from 'axios';

const generateContractProfilePrompt = (profile) => {
  return `You are an expert NFT contract analyst. Analyze this NFT contract profile data and provide insights:

Contract Overview:
- Collection Name: ${profile.name}
- Contract Address: ${profile.contract_address}
- Blockchain: ${profile.blockchain}
- Token Standard: ${profile.token_standard}
- Launch Date: ${profile.launch_date}

Performance Metrics:
- Total Supply: ${profile.total_supply}
- Holders: ${profile.holders}
- Floor Price: ${profile.floor_price}
- Market Cap: $${profile.market_cap}
- Volume (24h): $${profile.volume_24h}

Contract Activity:
- Total Transactions: ${profile.total_transactions}
- Active Wallets: ${profile.active_wallets}
- Mint Status: ${profile.mint_status}
- Last Activity: ${profile.last_activity}

Security & Compliance:
- Verified Status: ${profile.verified}
- Audit Status: ${profile.audit_status}
- License Type: ${profile.license_type}
- Ownership: ${profile.ownership_type}

Provide a concise analysis covering:
1. Contract health and security
2. Market performance and liquidity
3. Community engagement and activity
4. Technical implementation quality
5. Risk assessment and compliance

Keep the analysis professional, data-driven, and focused on key performance indicators and market trends. Make it brief but insightful.`;
};

export const analyzeContractProfile = async (profile, apiKey) => {
  try {
    const requestData = {
      contents: [{
        parts: [{
          text: generateContractProfilePrompt(profile)
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    };
    
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        }
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Contract Profile Analysis Error:', error);
    throw error;
  }
};
