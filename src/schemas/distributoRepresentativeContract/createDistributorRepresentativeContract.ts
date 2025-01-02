import { z } from 'zod';
import { RequestStatusEnum } from '@/types/requests/enums'; // Adjust the path if necessary

export const createDistributorRepresentativeContractSchema = () =>
  z.object({
    // requesterId: z
    //   .string()
    //   .min(1, { message: 'Requester ID is required.' })
    //   .refine((val) => !isNaN(parseInt(val)), {
    //     message: 'Requester ID must be a number.',
    //   }),
    clmHeaderNumber: z
      .string()
      .min(1, { message: 'CLM header number is required.' }),
    clmLineNumber: z.string().optional(),
    typeContract: z.string().min(1, { message: 'Contract type is required.' }),
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
    nameRepresentativeDistributor: z
      .string()
      .min(1, { message: 'Representative name is required.' }),
    vendor: z.string().optional(),
    commissionPercentage: z.string().optional(),
    manager: z.string().optional(),
    activity: z.string().optional(),
    justify: z.string().min(1, { message: 'Justification is required.' }),
    requestId: z.string().optional(),
    approvalDate: z
      .string()
      .optional()
      .refine((date) => !isNaN(Date.parse(date as string)), {
        message: 'Invalid date.',
      }),
    approvalLevel: z
      .string()
      .min(1, { message: 'Approval level is required.' }),
    phone: z.string().optional(),
    contact: z
      .string()
      .email({ message: 'Invalid email for contact.' })
      .optional(),
    antiCorruption: z.string().optional(),
    uf: z.string().optional(),
    sap: z.string().optional(),
    filesName: z.string().optional(),
    typeRequestOrder: z
      .string()
      .min(1, { message: 'Type of request order is required.' }),
  });

export type CreateDistributorRepresentativeContractSchema = z.infer<
  ReturnType<typeof createDistributorRepresentativeContractSchema>
>;
