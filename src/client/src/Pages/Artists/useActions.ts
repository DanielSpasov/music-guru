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
          icon: 'add',
          perform: () => navigate('add'),
          disabled: !isAuthenticated
        }
      ];
    case 'artist-details':
      return [
        {
          icon: 'edit',
          perform: () => navigate('edit'),
          disabled: uid !== data?.created_by
        }
      ];
    default:
      return [];
  }
}
