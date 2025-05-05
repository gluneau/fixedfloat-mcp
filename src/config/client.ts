// FixedFloat API client
import crypto from 'crypto';

import fetch from 'node-fetch';

import config from './index';

const API_BASE_URL = 'https://ff.io/api/v2/';

class FixedFloatClient {
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  private sign(data: string): string {
    return crypto.createHmac('sha256', this.apiSecret).update(data).digest('hex');
  }

  async request<T>(method: string, data: Record<string, any> = {}): Promise<T> {
    const url = `${API_BASE_URL}${method}`;
    const jsonData = JSON.stringify(data);
    const signature = this.sign(jsonData);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-API-KEY': this.apiKey,
          'X-API-SIGN': signature,
        },
        body: jsonData,
      });

      const result = (await response.json()) as any;

      if (result.code === 0) {
        return result.data as T;
      } else {
        throw new Error(result.msg || 'Unknown error');
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrencies() {
    return this.request('ccies');
  }

  async getPrice(data: {
    type: 'fixed' | 'float';
    fromCcy: string;
    toCcy: string;
    direction: 'from' | 'to';
    amount: number;
    ccies?: boolean;
    usd?: boolean;
    refcode?: string;
    afftax?: number;
  }) {
    return this.request('price', data);
  }

  async createOrder(data: {
    type: 'fixed' | 'float';
    fromCcy: string;
    toCcy: string;
    direction: 'from' | 'to';
    amount: number;
    toAddress: string;
    tag?: string;
    refcode?: string;
    afftax?: number;
  }) {
    return this.request('create', data);
  }

  async getOrder(data: { id: string; token: string }) {
    return this.request('order', data);
  }

  async setEmergencyAction(data: {
    id: string;
    token: string;
    choice: 'EXCHANGE' | 'REFUND';
    address?: string;
    tag?: string;
  }) {
    return this.request('emergency', data);
  }

  async setEmail(data: { id: string; token: string; email: string }) {
    return this.request('setEmail', data);
  }

  async getQrCodes(data: { id: string; token: string }) {
    return this.request('qr', data);
  }
}

// Create a client instance using the config
const client = new FixedFloatClient(config.fixedFloat.apiKey, config.fixedFloat.apiSecret);

export default client;
