import { z } from 'zod';

export const createMaintenanceContractSchema = () =>
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
    company: z.string().min(1, { message: 'Company is required.' }),
    renewStartDate: z
      .string()
      .min(1, { message: 'Renew start date is required.' })
      .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date.' }),
    renewEndDate: z
      .string()
      .min(1, { message: 'Renew end date is required.' })
      .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date.' }),
    contractRenewQtd: z
      .string()
      .regex(/^\d+$/, { message: 'Contract renew quantity must be a number.' })
      .min(1, { message: 'Contract renew quantity is required.' }),
    frequency: z.string().min(1, { message: 'Frequency is required.' }),
    scope: z.string().min(1, { message: 'Scope is required.' }),
    contractTotalValue: z
      .string()
      .regex(/^\d+(\.\d+)?$/, {
        message: 'Contract total value must be a number.',
      })
      .min(1, { message: 'Contract total value is required.' }),
    dollarExchangeRate: z
      .string()
      .regex(/^\d+(\.\d+)?$/, {
        message: 'Dollar exchange rate must be a number.',
      })
      .min(1, { message: 'Dollar exchange rate is required.' }),
    totalValueUSD: z
      .string()
      .regex(/^\d+(\.\d+)?$/, {
        message: 'Total value in USD must be a number.',
      })
      .min(1, { message: 'Total value in USD is required.' }),
    gm: z
      .string()
      .regex(/^\d+(\.\d+)?$/, { message: 'GM must be a number.' })
      .min(1, { message: 'GM is required.' }),
    renewIndexPercentage: z
      .string()
      .regex(/^\d+(\.\d+)?$/, {
        message: 'Renew index percentage must be a number.',
      })
      .min(1, { message: 'Renew index percentage is required.' }),
    index: z.string().optional(),
    paymentCondition: z.string().optional(),
    inclusionClauses: z
      .string()
      .min(1, { message: 'Inclusion clauses are required.' }),
    inclusionDescription: z.string().optional(),
    legalIndemnificationObligations: z.string().optional(),
    legalWarrantyObligations: z.string().optional(),
    legalDamageCap: z.string().optional(),
    legalDamageCave: z.string().optional(),
    legalLiquidatedDamages: z.string().optional(),
    justify: z.string().optional(),
    phone: z.string().optional(),
    antiCorruption: z.string().optional(),
    uf: z.string().optional(),
    sap: z.string().optional(),
    contact: z
      .string()
      .email({ message: 'Invalid email for contact.' })
      .optional(),
    approvalLevel: z
      .string()
      .min(1, { message: 'Approval level is required.' }),
    files: z.any().optional(),
    status: z.string().optional(),
  });

export type CreateMaintenanceContractSchema = z.infer<
  ReturnType<typeof createMaintenanceContractSchema>
>;
