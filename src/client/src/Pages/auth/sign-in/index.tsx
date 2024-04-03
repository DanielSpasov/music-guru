import { useContext } from 'react';

import { AuthContext } from '../../../Contexts/Auth';
import { PageForm } from '../../../Components';
import { schema } from './schema';

export default function SignIn() {
  const { dispatch } = useContext(AuthContext);
  return <PageForm schema={schema} ctx={{ dispatch }} />;
}
