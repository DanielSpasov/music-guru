import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Types';
import { AuthContext } from '../../Contexts/Auth';

export default function useActions(): Action[] {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  return [
    {
      icon: { model: 'plus', type: 'solid' },
      perform: () => navigate('add'),
      disabled: !auth.isAuthenticated
    }
  ];
}
