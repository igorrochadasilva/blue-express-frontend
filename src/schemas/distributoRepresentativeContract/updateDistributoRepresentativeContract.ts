import { z } from 'zod';
import { createDistributorRepresentativeContractSchema } from './createDistributorRepresentativeContract';

export const updateDistributorRepresentativeContractSchema = () => {
  // Get the base schema without calling it
  const baseSchemaFn = createDistributorRepresentativeContractSchema;

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

export type UpdateDistributorRepresentativeContractSchema = z.infer<
  ReturnType<typeof updateDistributorRepresentativeContractSchema>
>;
