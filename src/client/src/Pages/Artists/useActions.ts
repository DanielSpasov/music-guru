import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Components/Common/Actions/helpers';
import { AuthContext } from '../../Contexts/Auth';
import { UseActionsProps } from './helpers';

export default function useActions({ model, data }: UseActionsProps): Action[] {
  const navigate = useNavigate();
  const { isAuthenticated, uid } = useContext(AuthContext);

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
          perform: () => null,
          disabled: uid !== data?.created_by.uid,
          subActions: [
            {
              label: 'Album',
              perform: () => navigate('add-album'),
              disabled: uid !== data?.created_by.uid
            },
            {
              label: 'Mixtape',
              perform: () => navigate('add-mixtape'),
              disabled: uid !== data?.created_by.uid
            },
            {
              label: 'Single',
              perform: () => navigate('add-single'),
              disabled: uid !== data?.created_by.uid
            }
          ]
        },
        {
          icon: { model: 'pen-to-square', type: 'regular' },
          perform: () => navigate('edit'),
          disabled: uid !== data?.created_by.uid
        }
      ];
    default:
      return [];
  }
}
