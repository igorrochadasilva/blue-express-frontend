import { z } from 'zod';
import {
  RequestOfficeEnum,
  RequestCompanyEnum,
  RequestStatusEnum,
  ContractTypeEnum,
  FrequencyEnum,
  UFEnum,
} from '@/types/requests/enums';

export const createMaintenanceContractSchema = () =>
  z
    .object({
      requesterName: z
        .string()
        .min(1, { message: 'Requester name is required' })
        .max(100, {
          message: 'Requester name must be less than 100 characters',
        }),
      clientName: z
        .string()
        .min(1, { message: 'Client name is required' })
        .max(100, { message: 'Client name must be less than 100 characters' }),
      clmHeaderNumber: z
        .string()
        .min(1, { message: 'CLM Header Number is required' })
        .regex(/^[0-9]+$/, {
          message: 'CLM Header Number must contain only numbers',
        }),
      clmLineNumber: z
        .string()
        .min(1, { message: 'CLM Line Number is required' })
        .regex(/^[0-9]+$/, {
          message: 'CLM Line Number must contain only numbers',
        }),
      typeContract: z.nativeEnum(ContractTypeEnum, {
        errorMap: () => ({ message: 'Please select a valid contract type' }),
      }),
      company: z.nativeEnum(RequestCompanyEnum, {
        errorMap: () => ({ message: 'Please select a valid company' }),
      }),
      status: z
        .nativeEnum(RequestStatusEnum, {
          errorMap: () => ({ message: 'Please select a valid status' }),
        })
        .optional(),
      renewStartDate: z
        .string()
        .min(1, { message: 'Renew start date is required' })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Date must be in YYYY-MM-DD format',
        }),
      renewEndDate: z
        .string()
        .min(1, { message: 'Renew end date is required' })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Date must be in YYYY-MM-DD format',
        }),
      contractRenewQtd: z
        .string()
        .min(1, { message: 'Contract renew quantity is required' })
        .regex(/^[0-9]+$/, {
          message: 'Contract renew quantity must contain only numbers',
        }),
      frequency: z.nativeEnum(FrequencyEnum, {
        errorMap: () => ({ message: 'Please select a valid frequency' }),
      }),
      scope: z
        .string()
        .min(1, { message: 'Scope is required' })
        .max(1000, { message: 'Scope must be less than 1000 characters' }),
      contractTotalValue: z
        .string()
        .min(1, { message: 'Contract total value is required' })
        .regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
          message: 'Contract total value must be a valid number',
        }),
      dollarExchangeRate: z
        .string()
        .min(1, { message: 'Dollar exchange rate is required' })
        .regex(/^[0-9]+(\.[0-9]{1,4})?$/, {
          message: 'Dollar exchange rate must be a valid number',
        }),
      totalValueUSD: z
        .string()
        .min(1, { message: 'Total value USD is required' })
        .regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
          message: 'Total value USD must be a valid number',
        }),
      gm: z
        .string()
        .min(1, { message: 'GM is required' })
        .regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
          message: 'GM must be a valid number',
        }),
      renewIndexPercentage: z
        .string()
        .min(1, { message: 'Renew index percentage is required' })
        .regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
          message: 'Renew index percentage must be a valid number',
        }),
      index: z
        .string()
        .min(1, { message: 'Index is required' })
        .max(100, { message: 'Index must be less than 100 characters' }),
      paymentCondition: z
        .string()
        .min(1, { message: 'Payment condition is required' })
        .max(500, {
          message: 'Payment condition must be less than 500 characters',
        }),
      inclusionClauses: z
        .string()
        .min(1, { message: 'Inclusion clauses is required' })
        .max(1000, {
          message: 'Inclusion clauses must be less than 1000 characters',
        }),
      inclusionDescription: z
        .string()
        .min(1, { message: 'Inclusion description is required' })
        .max(1000, {
          message: 'Inclusion description must be less than 1000 characters',
        }),
      legalIndemnificationObligations: z
        .string()
        .min(1, { message: 'Legal indemnification obligations is required' })
        .max(1000, {
          message:
            'Legal indemnification obligations must be less than 1000 characters',
        }),
      legalWarrantyObligations: z
        .string()
        .min(1, { message: 'Legal warranty obligations is required' })
        .max(1000, {
          message:
            'Legal warranty obligations must be less than 1000 characters',
        }),
      legalDamageCap: z
        .string()
        .min(1, { message: 'Legal damage cap is required' })
        .max(1000, {
          message: 'Legal damage cap must be less than 1000 characters',
        }),
      legalDamageCave: z
        .string()
        .min(1, { message: 'Legal damage cave is required' })
        .max(1000, {
          message: 'Legal damage cave must be less than 1000 characters',
        }),
      legalLiquidatedDamages: z
        .string()
        .min(1, { message: 'Legal liquidated damages is required' })
        .max(1000, {
          message: 'Legal liquidated damages must be less than 1000 characters',
        }),
      justify: z
        .string()
        .min(1, { message: 'Justify is required' })
        .max(1000, { message: 'Justify must be less than 1000 characters' }),
      phone: z
        .string()
        .min(1, { message: 'Phone is required' })
        .regex(/^[0-9+\-\s()]+$/, {
          message: 'Please enter a valid phone number',
        }),
      contact: z
        .string()
        .min(1, { message: 'Contact is required' })
        .email({ message: 'Please enter a valid email address' }),
      antiCorruption: z
        .string()
        .min(1, { message: 'Anti corruption is required' })
        .max(1000, {
          message: 'Anti corruption must be less than 1000 characters',
        }),
      uf: z.nativeEnum(UFEnum, {
        errorMap: () => ({ message: 'Please select a valid UF' }),
      }),
      sap: z
        .string()
        .min(1, { message: 'SAP is required' })
        .max(100, { message: 'SAP must be less than 100 characters' }),
      files: z.array(z.any()).optional(),
      approvalLevel: z.nativeEnum(RequestOfficeEnum, {
        errorMap: () => ({ message: 'Please select a valid approval level' }),
      }),
    })
    .refine(
      (data) => {
        const startDate = new Date(data.renewStartDate);
        const endDate = new Date(data.renewEndDate);
        return endDate > startDate;
      },
      {
        message: 'End date must be after start date',
        path: ['renewEndDate'],
      }
    );

export type CreateMaintenanceContractSchema = z.infer<
  ReturnType<typeof createMaintenanceContractSchema>
>;
