import { z } from 'zod';
import { RequestStatusEnum } from '@/types/requests/enums';

export const createSoftwareServiceContractSchema = () =>
  z.object({
    requesterName: z
      .string()
      .min(1, { message: 'Requester name is required.' }),
    clientName: z.string().min(1, { message: 'Client name is required.' }),
    clmHeaderNumber: z
      .string()
      .min(1, { message: 'CLM header number is required.' }),
    clmLineNumber: z.string().optional(),
    typeContract: z.string().min(1, { message: 'Contract type is required.' }),
    companyType: z.string().min(1, { message: 'Company type is required.' }),
    company: z.string().min(1, { message: 'Company is required.' }),
    status: z.nativeEnum(RequestStatusEnum, {
      errorMap: () => ({ message: 'Invalid status.' }),
    }),
    renewStartDate: z
      .string()
      .min(1, { message: 'Renew start date is required.' })
      .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date.' }),
    renewEndDate: z
      .string()
      .min(1, { message: 'Renew end date is required.' })
      .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date.' }),
    scope: z.string().min(1, { message: 'Scope is required.' }),
    contractTotalValue: z
      .string()
      .min(1, { message: 'Contract total value is required.' })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: 'Contract total value must be a number.',
      }),
    dollarExchangeRate: z
      .string()
      .min(1, { message: 'Dollar exchange rate is required.' })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: 'Dollar exchange rate must be a number.',
      }),
    totalValueUSD: z
      .string()
      .min(1, { message: 'Total value USD is required.' })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: 'Total value USD must be a number.',
      }),
    gm: z
      .string()
      .min(1, { message: 'GM is required.' })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: 'GM must be a number.',
      }),
    paymentCondition: z
      .string()
      .min(1, { message: 'Payment condition is required.' }),
    inclusionClauses: z
      .string()
      .min(1, { message: 'Inclusion clauses are required.' }),
    inclusionDescription: z.string().optional(),
    legalIndemnificationObligations: z.string().optional(),
    legalWarrantyObligations: z.string().optional(),
    legalDamageCap: z.string().optional(),
    legalDamageCave: z.string().optional(),
    legalLiquidatedDamages: z.string().optional(),
    justify: z.string().min(1, { message: 'Justification is required.' }),
    requestId: z.string().optional(),
    approvalLevel: z
      .string()
      .min(1, { message: 'Approval level is required.' }),
    phone: z.string().min(1, { message: 'Phone number is required.' }),
    contact: z
      .string()
      .email({ message: 'Invalid contact email address.' })
      .optional(),
    antiCorruption: z.string().optional(),
    uf: z.string().optional(),
    sap: z.string().optional(),
  });

export type CreateSoftwareServiceContractSchema = z.infer<
  ReturnType<typeof createSoftwareServiceContractSchema>
>;
