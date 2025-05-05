// Export all schemas in the format needed by the McpServer.tool() method
import { z } from 'zod';

// Import all the schema objects
import * as fixedFloatSchemas from './fixedfloat';

// Helper function to extract the shape from a ZodObject
function getZodShape<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema._def.shape();
}

// FixedFloat schemas
export const getCurrenciesSchema = getZodShape(fixedFloatSchemas.getCurrenciesSchema);
export const getPriceSchema = getZodShape(fixedFloatSchemas.getPriceSchema);
export const createOrderSchema = getZodShape(fixedFloatSchemas.createOrderSchema);
export const getOrderSchema = getZodShape(fixedFloatSchemas.getOrderSchema);
export const setEmergencyActionSchema = getZodShape(fixedFloatSchemas.setEmergencyActionSchema);
export const setEmailSchema = getZodShape(fixedFloatSchemas.setEmailSchema);
export const getQrCodesSchema = getZodShape(fixedFloatSchemas.getQrCodesSchema);
