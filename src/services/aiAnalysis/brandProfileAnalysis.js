import axios from 'axios';

const generateBrandProfilePrompt = (profile) => {
  return `You are an expert NFT brand analyst. Analyze this NFT brand profile data and provide insights:

Brand Profile:
- Brand Name: ${profile.name}
- Category: ${profile.category}
- Established: ${profile.established_date}
- Total Collections: ${profile.total_collections}
- Total Volume: $${profile.total_volume}

Market Performance:
- Market Cap: $${profile.market_cap}
- Growth Rate: ${profile.growth_rate}%
- Market Share: ${profile.market_share}%
- Ranking: ${profile.ranking}

Community Metrics:
- Total Holders: ${profile.total_holders}
- Active Users: ${profile.active_users}
- Social Engagement: ${profile.social_engagement}
- Community Score: ${profile.community_score}

Development Activity:
- Update Frequency: ${profile.update_frequency}
- Developer Count: ${profile.developer_count}
- Recent Updates: ${profile.recent_updates}

Provide a concise analysis covering:
1. Brand positioning and market presence
2. Community health and engagement
3. Development activity and innovation
4. Market performance and growth
5. Key strengths and opportunities

Keep the analysis professional, data-driven, and focused on key performance indicators and market trends. Make it brief but insightful.`;
};

export const analyzeBrandProfile = async (profile, apiKey) => {
  try {
    const requestData = {
      contents: [{
        parts: [{
          text: generateBrandProfilePrompt(profile)
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
    console.error('Brand Profile Analysis Error:', error);
    throw error;
  }
};
