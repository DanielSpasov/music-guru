import { NavigateFunction } from 'react-router-dom';
import { Action } from '../../Types';

type Args = {
  navigate: NavigateFunction;
};

export const getActions = (args: Args): Action[] => {
  return [
    {
      label: 'Add',
      icon: { model: 'plus', type: 'solid' },
      perform: () => args.navigate('add')
    }
  ];
};
