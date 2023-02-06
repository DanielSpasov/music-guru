import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Types';
import { AuthContext } from '../../Contexts/Auth';

export default function useActions(): Action[] {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  switch (location.pathname) {
    case '/artists':
      return [
        {
          icon: { model: 'plus', type: 'solid' },
          perform: () => navigate('add'),
          disabled: !isAuthenticated
        }
      ];
    default:
      return [];
  }
}
