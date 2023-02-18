import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';

import { Action } from '../../Components/Common/Actions/helpers';
import { AuthContext } from '../../Contexts/Auth';
import { UseActionsProps } from './helpers';
import Api from '../../Api';

export default function useActions({ model, data }: UseActionsProps): Action[] {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteSingle = useCallback(async () => {
    if (!data?.uid) return;
    await Api.singles.del({ id: data.uid });
    navigate('/singles');
  }, [data, navigate]);

  switch (model) {
    case 'singles-list':
      return [
        {
          icon: { model: 'plus', type: 'solid' },
          perform: () => navigate('add'),
          disabled: !isAuthenticated
        }
      ];
    case 'single-single':
      return [
        {
          icon: { model: 'pen-to-square', type: 'regular' },
          perform: () => navigate('edit'),
          disabled: !isAuthenticated
        },
        {
          icon: { model: 'trash', type: 'solid' },
          perform: deleteSingle,
          disabled: !isAuthenticated
        }
      ];
    default:
      return [];
  }
}
