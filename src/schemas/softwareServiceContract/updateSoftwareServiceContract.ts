import { z } from 'zod';
import { createSoftwareServiceContractSchema } from './createSoftwareServiceContract';

export const updateSoftwareServiceContractSchema = () =>
  createSoftwareServiceContractSchema().extend({
    id: z.number(),
  });

export type UpdateSoftwareServiceContractSchema = z.infer<
  ReturnType<typeof updateSoftwareServiceContractSchema>
>;
