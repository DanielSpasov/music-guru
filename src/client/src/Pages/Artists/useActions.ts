import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Components/Common/Actions/helpers';
import { AuthContext } from '../../Contexts/Auth';
import { UseActionsProps } from './helpers';

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
          icon: { model: 'plus', type: 'solid' },
          type: 'menu',
          subActions: [
            {
              label: 'Album',
              perform: () => navigate('add-album'),
              disabled: !isAuthenticated
            },
            {
              label: 'Mixtape',
              perform: () => navigate('add-mixtape'),
              disabled: !isAuthenticated
            },
            {
              label: 'Single',
              perform: () => navigate('add-single'),
              disabled: !isAuthenticated
            }
          ],
          perform: () => navigate('edit'),
          disabled: !isAuthenticated
        },
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
