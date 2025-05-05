#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import config from './config';
import { registerTools } from './tools';
import logger from './utils/logger';

const startServer = async () => {
  // Set log level
  logger.setLogLevel(config.log.logLevel);

  // Check if API key and secret are set
  if (!config.fixedFloat.apiKey || !config.fixedFloat.apiSecret) {
    logger.warn('Warning: API_KEY or API_SECRET is not set or is using default values');
  } else {
    logger.info('Info: FixedFloat API configuration is set');
  }

  // Create and configure the server
  const server = new McpServer({
    name: config.server.name,
    version: config.server.version,
  });

  // Register tools
  registerTools(server);

  // Connect to the transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info('FixedFloat MCP Server started');
};

// Start the server and handle any errors
startServer().catch((err) => {
  logger.error(`Server failed to start: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
