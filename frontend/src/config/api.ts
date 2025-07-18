// API Configuration
export const API_CONFIG = {
  // OpenAI API Key - Loaded from environment variables
  // Set VITE_OPENAI_API_KEY in your .env file
  // In production, this should be moved to backend for security
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  
  // Backend API URL - Use environment variable with fallback
  // Set VITE_API_BASE_URL in your .env file or environment
  // Production: https://smart-health-care-8isu.onrender.com/api
  // Development: http://localhost:5000/api
  BACKEND_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // OpenAI API settings
  OPENAI: {
    MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 2000,
    TEMPERATURE: 0.7,
  }
};

// Helper function to get the API base URL
export const getAPIBaseURL = (): string => {
  return API_CONFIG.BACKEND_URL;
};

// Helper function to check if OpenAI API key is configured
export const isOpenAIConfigured = (): boolean => {
  return !!API_CONFIG.OPENAI_API_KEY;
};

// Helper function to get API key with multiple fallbacks
export const getOpenAIKey = (): string => {
  // Priority: 1. Environment variable, 2. localStorage, 3. empty string
  const envKey = API_CONFIG.OPENAI_API_KEY;
  const localKey = localStorage.getItem('openai_api_key');
  
  if (envKey && envKey.trim()) {
    return envKey.trim();
  }
  
  if (localKey && localKey.trim()) {
    return localKey.trim();
  }
  
  return '';
};

// Helper function to validate API key format
export const isValidOpenAIKey = (apiKey: string): boolean => {
  return apiKey.startsWith('sk-') && apiKey.length > 20;
};

// Helper function to set API key in localStorage
export const setOpenAIKey = (apiKey: string): void => {
  localStorage.setItem('openai_api_key', apiKey);
}; 