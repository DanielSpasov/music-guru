import { AuthContextType } from '../../../../../Contexts/Auth/helpers';

export type UpdateDataProps = Pick<AuthContextType, 'data' | 'dispatch'>;
