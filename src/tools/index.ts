// Tool registration module
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import * as schemas from '../schemas';
import * as fixedFloatTools from './fixedfloat';
import { adaptHandler } from '../utils/response';

// Register tools with the server
export function registerTools(server: McpServer): void {
  // FixedFloat tools
  server.tool(
    'get_currencies',
    'Retrieves a list of supported cryptocurrencies on FixedFloat, including which ones can be sent and received.',
    schemas.getCurrenciesSchema,
    adaptHandler(fixedFloatTools.getCurrencies),
  );

  server.tool(
    'get_price',
    'Retrieves the exchange rate for a currency pair on FixedFloat with the specified direction and rate type.',
    schemas.getPriceSchema,
    adaptHandler(fixedFloatTools.getPrice),
  );

  server.tool(
    'create_order',
    'Creates an order for exchanging cryptocurrencies on FixedFloat with the specified amount and destination address.',
    schemas.createOrderSchema,
    adaptHandler(fixedFloatTools.createOrder),
  );

  server.tool(
    'get_order',
    'Retrieves updated order data for a FixedFloat exchange order.',
    schemas.getOrderSchema,
    adaptHandler(fixedFloatTools.getOrder),
  );

  server.tool(
    'set_emergency_action',
    'Selects an action (continue at market rate or refund) for orders in EMERGENCY status on FixedFloat.',
    schemas.setEmergencyActionSchema,
    adaptHandler(fixedFloatTools.setEmergencyAction),
  );

  server.tool(
    'set_email',
    'Subscribes to email notifications for status changes of a FixedFloat exchange order.',
    schemas.setEmailSchema,
    adaptHandler(fixedFloatTools.setEmail),
  );

  server.tool(
    'get_qr_codes',
    'Retrieves QR code images for a FixedFloat exchange order.',
    schemas.getQrCodesSchema,
    adaptHandler(fixedFloatTools.getQrCodes),
  );
}
