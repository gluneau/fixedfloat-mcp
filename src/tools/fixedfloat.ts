// FixedFloat tools implementation
import client from '../config/client';
import { handleError } from '../utils/error';
import { Response } from '../utils/response';
import { successJson, errorResponse } from '../utils/response';

// Get available currencies
export async function getCurrencies(_params: Record<string, never>): Promise<Response> {
  try {
    const currencies = await client.getCurrencies();
    return successJson(currencies);
  } catch (error) {
    return errorResponse(handleError(error, 'get_currencies'));
  }
}

// Get exchange rate for a currency pair
export async function getPrice(params: {
  type: 'fixed' | 'float';
  fromCcy: string;
  toCcy: string;
  direction: 'from' | 'to';
  amount: number;
  ccies?: boolean;
  usd?: boolean;
  refcode?: string;
  afftax?: number;
}): Promise<Response> {
  try {
    const priceData = await client.getPrice(params);
    return successJson(priceData);
  } catch (error) {
    return errorResponse(handleError(error, 'get_price'));
  }
}

// Create an exchange order
export async function createOrder(params: {
  type: 'fixed' | 'float';
  fromCcy: string;
  toCcy: string;
  direction: 'from' | 'to';
  amount: number;
  toAddress: string;
  tag?: string;
  refcode?: string;
  afftax?: number;
}): Promise<Response> {
  try {
    const orderData = await client.createOrder(params);
    return successJson(orderData);
  } catch (error) {
    return errorResponse(handleError(error, 'create_order'));
  }
}

// Get order details
export async function getOrder(params: { id: string; token: string }): Promise<Response> {
  try {
    const orderData = await client.getOrder(params);
    return successJson(orderData);
  } catch (error) {
    return errorResponse(handleError(error, 'get_order'));
  }
}

// Set emergency action for an order
export async function setEmergencyAction(params: {
  id: string;
  token: string;
  choice: 'EXCHANGE' | 'REFUND';
  address?: string;
  tag?: string;
}): Promise<Response> {
  try {
    const result = await client.setEmergencyAction(params);
    return successJson(result);
  } catch (error) {
    return errorResponse(handleError(error, 'set_emergency_action'));
  }
}

// Set email for order notifications
export async function setEmail(params: {
  id: string;
  token: string;
  email: string;
}): Promise<Response> {
  try {
    const result = await client.setEmail(params);
    return successJson(result);
  } catch (error) {
    return errorResponse(handleError(error, 'set_email'));
  }
}

// Get QR codes for an order
export async function getQrCodes(params: { id: string; token: string }): Promise<Response> {
  try {
    const qrCodes = await client.getQrCodes(params);
    return successJson(qrCodes);
  } catch (error) {
    return errorResponse(handleError(error, 'get_qr_codes'));
  }
}
