import { z } from 'zod';
import { createMaintenanceContractSchema } from './createMaintenanceContract';

export const updateMaintenanceContractSchema = () =>
  createMaintenanceContractSchema().extend({
    id: z.number(),
  });

export type UpdateMaintenanceContractSchema = z.infer<
  ReturnType<typeof updateMaintenanceContractSchema>
>;
