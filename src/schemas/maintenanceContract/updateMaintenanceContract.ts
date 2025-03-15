import { z } from 'zod';
import { createMaintenanceContractSchema } from './createMaintenanceContract';

export const updateMaintenanceContractSchema = () => {
  // Get the base schema without calling it
  const baseSchemaFn = createMaintenanceContractSchema;

  // Create a schema that merges the base schema with the id field
  return z.preprocess(
    (data) => data,
    z
      .object({
        id: z.string(),
      })
      .and(baseSchemaFn())
  );
};

export type UpdateMaintenanceContractSchema = z.infer<
  ReturnType<typeof updateMaintenanceContractSchema>
>;
