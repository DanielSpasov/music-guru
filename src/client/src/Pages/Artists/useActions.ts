import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Components/Core/BreadCrumb/helpers';
import { AuthContext } from '../../Contexts/Auth';

type UseActionsProps = {
  model: string;
};

export default function useActions({ model }: UseActionsProps): Action[] {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  switch (model) {
    case 'artists-list':
      return [
        {
          icon: { model: 'plus', type: 'solid' },
          perform: () => navigate('add'),
          disabled: !isAuthenticated
        }
      ];
    case 'single-artist':
      return [
        {
          icon: { model: 'pen-to-square', type: 'regular' },
          perform: () => navigate('edit'),
          disabled: !isAuthenticated
        }
      ];
    default:
      return [];
  }
}
