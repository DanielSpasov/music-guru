import { z } from 'zod';

import { FileSchema } from '../Schemas';

export type File = z.infer<typeof FileSchema>;
