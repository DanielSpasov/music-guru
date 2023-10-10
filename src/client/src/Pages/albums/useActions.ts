import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Components/Common/Actions/helpers';
import { AuthContext } from '../../Contexts/Auth';
import { UseActionsProps } from './helpers';

export default function useActions({
  model,
  deleteAlbum,
  data
}: UseActionsProps): Action[] {
  const navigate = useNavigate();
  const { isAuthenticated, uid } = useContext(AuthContext);

  switch (model) {
    case 'albums-list':
      return [
        {
          icon: 'add',
          perform: () => navigate('add'),
          disabled: !isAuthenticated
        }
      ];
    case 'album-details':
      return [
        {
          icon: 'edit',
          perform: () => navigate('edit'),
          disabled: uid !== data?.created_by
        },
        {
          icon: 'trash',
          perform: deleteAlbum ? deleteAlbum : () => null,
          disabled: uid !== data?.created_by
        }
      ];
    default:
      return [];
  }
}
