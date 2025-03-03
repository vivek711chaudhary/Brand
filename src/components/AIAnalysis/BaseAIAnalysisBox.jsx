import { useState } from 'react';

const BaseAIAnalysisBox = ({ metrics, onAnalyze, className = '' }) => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await onAnalyze(metrics);
      setAnalysis(result);
    } catch (error) {
      console.error('Error generating analysis:', error);
      setError(error.message || 'Failed to generate analysis. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex-grow overflow-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-400">
            {error}
            <button 
              onClick={handleAnalyze}
              className="ml-2 text-indigo-400 hover:text-indigo-300 underline"
            >
              Try again
            </button>
          </div>
        ) : analysis ? (
          <div className="text-sm leading-relaxed space-y-4 text-gray-300">
            {analysis.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-sm font-semibold text-indigo-400 mt-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-sm text-gray-300">
                  {paragraph}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Click "Generate Analysis" to get AI-powered insights about the market performance.
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${loading
              ? 'bg-indigo-500/50 text-white cursor-wait'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
            }
          `}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Generate Analysis'
          )}
        </button>
      </div>
    </div>
  );
};

export default BaseAIAnalysisBox;
