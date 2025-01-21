import axios from 'axios';

const generateContractMetricsPrompt = (metrics) => {
  return `You are an expert NFT contract analyst. Analyze this NFT contract metrics data and provide insights:

Collection: ${metrics.collection}
Blockchain: ${metrics.blockchain}
Growth Rate: ${metrics.growth_rate}%
Total Revenue: $${metrics.total_revenue}
Market Cap: $${metrics.mcap}
Holders: ${metrics.holders}

Trading Activity:
- Total Volume: $${metrics.total_volume}
- Total Traders: ${metrics.traders}
- Retained Traders: ${metrics.retained_traders}
- Interactions: ${metrics.interactions}

Revenue Breakdown:
- Mint Revenue: $${metrics.mint_revenue}
- Primary Sales: $${metrics.primary_sale_revenue}
- Secondary Sales: $${metrics.secondary_sale_revenue}
- Royalty Revenue: $${metrics.royalty_revenue}

Provide a concise analysis covering:
1. Overall contract performance
2. Trading activity and liquidity
3. Revenue generation and distribution
4. Holder engagement and retention
5. Growth indicators and risks

Keep the analysis professional, data-driven, and focused on key performance indicators and market trends. Make it brief but insightful.`;
};

export const analyzeContractMetrics = async (metrics, apiKey) => {
  try {
    const requestData = {
      contents: [{
        parts: [{
          text: generateContractMetricsPrompt(metrics)
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
    console.error('Contract Metrics Analysis Error:', error);
    throw error;
  }
};
