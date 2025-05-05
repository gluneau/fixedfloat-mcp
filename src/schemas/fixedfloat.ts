// FixedFloat-specific schemas
import { z } from 'zod';

import { exchangeTypeSchema, directionSchema, emergencyChoiceSchema } from './common';

// Schema for get_currencies tool
export const getCurrenciesSchema = z.object({});

// Schema for get_price tool
export const getPriceSchema = z.object({
  type: exchangeTypeSchema.describe('Order type (fixed/float)'),
  fromCcy: z.string().describe('Code of currency to send'),
  toCcy: z.string().describe('Code of currency to receive'),
  direction: directionSchema.describe('Exchange direction (from: send amount, to: receive amount)'),
  amount: z.number().positive().describe('Amount to send (from) or receive (to)'),
  ccies: z.boolean().optional().describe('Include currency availability list in response'),
  usd: z.boolean().optional().describe('Adjust amount in USD if limits exceeded'),
  refcode: z.string().optional().describe('Affiliate program code for earnings'),
  afftax: z
    .number()
    .optional()
    .describe('Desired affiliate earnings as percentage of exchange amount'),
});

// Schema for create_order tool
export const createOrderSchema = z.object({
  type: exchangeTypeSchema.describe('Order type (fixed/float)'),
  fromCcy: z.string().describe('Code of currency to send'),
  toCcy: z.string().describe('Code of currency to receive'),
  direction: directionSchema.describe('Exchange direction (from: send amount, to: receive amount)'),
  amount: z.number().positive().describe('Amount to send (from) or receive (to)'),
  toAddress: z.string().describe('Destination address for funds'),
  tag: z.string().optional().describe('Memo or Destination Tag (if required)'),
  refcode: z.string().optional().describe('Affiliate program code for earnings'),
  afftax: z
    .number()
    .optional()
    .describe('Desired affiliate earnings as percentage of exchange amount'),
});

// Schema for get_order tool
export const getOrderSchema = z.object({
  id: z.string().describe('Order ID'),
  token: z.string().describe('Order security token from data.token'),
});

// Schema for set_emergency_action tool
export const setEmergencyActionSchema = z.object({
  id: z.string().describe('Order ID'),
  token: z.string().describe('Order security token from data.token'),
  choice: emergencyChoiceSchema.describe(
    'Action: EXCHANGE (continue at market rate) or REFUND (refund minus fee)',
  ),
  address: z.string().optional().describe('Refund address (required if choice="REFUND")'),
  tag: z.string().optional().describe('Memo or Destination Tag (if required)'),
});

// Schema for set_email tool
export const setEmailSchema = z.object({
  id: z.string().describe('Order ID'),
  token: z.string().describe('Order security token from data.token'),
  email: z.string().email().describe('Email for notifications'),
});

// Schema for get_qr_codes tool
export const getQrCodesSchema = z.object({
  id: z.string().describe('Order ID'),
  token: z.string().describe('Order security token from data.token'),
});
