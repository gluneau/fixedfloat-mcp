// Configuration for the FixedFloat MCP server
interface FixedFloatConfig {
  apiKey: string;
  apiSecret: string;
}

interface LogConfig {
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

interface ServerConfig {
  name: string;
  version: string;
}

interface AppConfig {
  fixedFloat: FixedFloatConfig;
  server: ServerConfig;
  log: LogConfig;
}

// Default configuration
const defaultConfig: AppConfig = {
  fixedFloat: {
    apiKey: 'YOUR_API_KEY',
    apiSecret: 'YOUR_API_SECRET',
  },
  server: {
    name: 'fixedfloat-mcp',
    version: '1.0.0',
  },
  log: {
    logLevel: 'info',
  },
};

// Get the configuration
export const getConfig = (): AppConfig => {
  return defaultConfig;
};

export default defaultConfig;
