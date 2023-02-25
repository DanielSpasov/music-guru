import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Components/Common/Actions/helpers';
import { AuthContext } from '../../Contexts/Auth';
import { UseActionsProps } from './helpers';

export default function useActions({ model }: UseActionsProps): Action[] {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  switch (model) {
    case 'albums-list':
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
