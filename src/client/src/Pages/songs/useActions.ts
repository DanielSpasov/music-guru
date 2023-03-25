import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Components/Common/Actions/helpers';
import { AuthContext } from '../../Contexts/Auth';
import { UseActionsProps } from './helpers';

export default function useActions({
  model,
  data,
  deleteSong
}: UseActionsProps): Action[] {
  const { isAuthenticated, uid } = useContext(AuthContext);
  const navigate = useNavigate();

  switch (model) {
    case 'song-list':
      return [
        {
          icon: { model: 'plus', type: 'solid' },
          perform: () => navigate('add'),
          disabled: !isAuthenticated
        }
      ];
    case 'song-details':
      return [
        {
          icon: { model: 'pen-to-square', type: 'regular' },
          perform: () => navigate('edit'),
          disabled: uid !== data?.created_by.uid
        },
        {
          icon: { model: 'trash', type: 'solid' },
          perform: deleteSong ? deleteSong : () => null,
          disabled: uid !== data?.created_by.uid
        }
      ];
    default:
      return [];
  }
}
