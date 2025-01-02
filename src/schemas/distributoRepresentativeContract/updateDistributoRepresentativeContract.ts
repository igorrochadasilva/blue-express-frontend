import { z } from 'zod';
import { createDistributorRepresentativeContractSchema } from './createDistributorRepresentativeContract';

export const updateDistributorRepresentativeContractSchema = () =>
  createDistributorRepresentativeContractSchema().extend({
    id: z.number(),
  });

export type UpdateDistributorRepresentativeContractSchema = z.infer<
  ReturnType<typeof updateDistributorRepresentativeContractSchema>
>;
