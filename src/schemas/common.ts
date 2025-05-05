// Common schema components that can be reused across multiple tools
import { z } from 'zod';

export const exchangeTypeSchema = z.enum(['fixed', 'float']);

export const directionSchema = z.enum(['from', 'to']);

export const emergencyChoiceSchema = z.enum(['EXCHANGE', 'REFUND']);
