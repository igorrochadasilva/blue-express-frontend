import {
  RequestCompanyEnum,
  RequestOfficeEnum,
  RequestsKeyEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { z } from 'zod';

export const createApproverSchema = z.object({
  title: z.nativeEnum(RequestsTitleEnum, {
    required_error: 'Title is required.',
  }),
  company: z.nativeEnum(RequestCompanyEnum, {
    required_error: 'Company is required.',
  }),
  competence: z
    .number()
    .min(0, { message: 'Competence must be a non-negative number.' }),
  key: z.nativeEnum(RequestsKeyEnum, {
    required_error: 'Key is required.',
  }),
  level: z.number().min(0, { message: 'Level must be a non-negative number.' }),
  office: z.nativeEnum(RequestOfficeEnum, {
    required_error: 'Office is required.',
  }),
  userId: z
    .string()
    .min(1, { message: 'User ID is required and must be greater than 0.' }),
});

export type CreateApproverSchema = z.infer<typeof createApproverSchema>;
