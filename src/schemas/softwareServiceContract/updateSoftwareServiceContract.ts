import { z } from 'zod';
import { createSoftwareServiceContractSchema } from './createSoftwareServiceContract';

export const updateSoftwareServiceContractSchema = () => {
  // Get the base schema without calling it
  const baseSchemaFn = createSoftwareServiceContractSchema;

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

export type UpdateSoftwareServiceContractSchema = z.infer<
  ReturnType<typeof updateSoftwareServiceContractSchema>
>;
