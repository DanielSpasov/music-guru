import { z } from 'zod';

import { FileSchema } from '../Validations';

export type File = z.infer<typeof FileSchema>;
