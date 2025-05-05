# FixedFloat MCP Server

An MCP server that enables AI assistants to interact with the FixedFloat cryptocurrency exchange through the Model Context Protocol.

## Overview

This server provides a bridge between AI assistants (like Claude) and the FixedFloat cryptocurrency exchange API, allowing AI models to:

- Retrieve information about supported currencies
- Get exchange rates for cryptocurrency pairs
- Create and manage exchange orders
- Handle emergency situations during an exchange
- Set up email notifications for order updates
- Get QR codes for deposit addresses

## Features

### Tools

#### Information Retrieval

- `get_currencies` - Get a list of supported cryptocurrencies including display data and send/receive availability
- `get_price` - Get the exchange rate for a cryptocurrency pair with specified direction and rate type

#### Order Management

- `create_order` - Create a new cryptocurrency exchange order
- `get_order` - Retrieve order details and status updates
- `set_emergency_action` - Handle orders in emergency status by choosing to continue at market rate or request a refund
- `set_email` - Subscribe to email notifications for order status changes
- `get_qr_codes` - Get QR code images for deposit addresses

## Installation

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

## Usage

### Debugging with MCP Inspector

The MCP Inspector provides an interactive interface for testing and debugging:

```bash
npm run inspector
```

### Integration with Claude Desktop

To use this server with Claude Desktop:

1. Ensure you have Claude Desktop installed
2. Create or edit the Claude configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

3. Add this server to your configuration:

```json
{
  "mcpServers": {
    "fixedfloat": {
      "command": "npx",
      "args": ["-y", "fixedfloat-mcp"]
    }
  }
}
```

## Tool Documentation

### `get_currencies`

Retrieves a list of supported cryptocurrencies, including display data and availability for sending/receiving.

- Parameters: None

### `get_price`

Retrieves the exchange rate for a currency pair with the specified direction and rate type.

- Parameters:
  - `type`: Order type (`fixed` or `float`)
  - `fromCcy`: Code of currency to send
  - `toCcy`: Code of currency to receive
  - `direction`: Exchange direction (`from` for send amount, `to` for receive amount)
  - `amount`: Amount to send (`from`) or receive (`to`)
  - `ccies` (optional): Include currency availability list in response
  - `usd` (optional): Adjust amount in USD if limits exceeded
  - `refcode` (optional): Affiliate program code
  - `afftax` (optional): Affiliate earnings percentage

### `create_order`

Creates an order for exchanging cryptocurrencies with specified amount and destination address.

- Parameters:
  - `type`: Order type (`fixed` or `float`)
  - `fromCcy`: Code of currency to send
  - `toCcy`: Code of currency to receive
  - `direction`: Exchange direction (`from` for send amount, `to` for receive amount)
  - `amount`: Amount to send (`from`) or receive (`to`)
  - `toAddress`: Destination address for funds
  - `tag` (optional): Memo or Destination Tag (if required)
  - `refcode` (optional): Affiliate program code
  - `afftax` (optional): Affiliate earnings percentage

### `get_order`

Retrieves updated order data and status.

- Parameters:
  - `id`: Order ID
  - `token`: Order security token from `data.token`

### `set_emergency_action`

Selects an action for orders in EMERGENCY status.

- Parameters:
  - `id`: Order ID
  - `token`: Order security token from `data.token`
  - `choice`: Action: `EXCHANGE` (continue at market rate) or `REFUND` (refund minus fee)
  - `address` (optional): Refund address (required if `choice="REFUND"`)
  - `tag` (optional): Memo or Destination Tag (if required)

### `set_email`

Subscribes to email notifications for order status changes.

- Parameters:
  - `id`: Order ID
  - `token`: Order security token from `data.token`
  - `email`: Email for notifications

### `get_qr_codes`

Retrieves QR code images for an order deposit address.

- Parameters:
  - `id`: Order ID
  - `token`: Order security token from `data.token`

## Examples

Once connected to an MCP client, you can ask questions like:

- "What cryptocurrencies are supported on FixedFloat?"
- "Get the exchange rate for exchanging 0.1 BTC to ETH"
- "Create an order to exchange 0.05 BTC for USDT to address 0x1234..."
- "Check the status of my order with ID ABC123 and token XYZ789"

## Development

### Project Structure

- `src/config/` - Configuration files
- `src/schemas/` - Zod schemas for request/response validation
- `src/tools/` - Implementation of MCP tools
- `src/utils/` - Utility functions
- `src/index.ts` - Main entry point

### Commands

- `npm run build` - Build the TypeScript project
- `npm run start` - Start the server
- `npm run inspector` - Launch with MCP Inspector for debugging
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## License

ISC
