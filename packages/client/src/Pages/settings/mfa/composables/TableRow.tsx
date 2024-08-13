import { FC, memo } from 'react';

import { Button, ICheck, IX, Loader } from '../../../../Components';
import { TableRowProps } from './types';

const TableRow: FC<TableRowProps> = ({ Icon, value, label, action }) => {
  return (
    <tr>
      <td className="p-2 w-10">
        <Icon className="w-6 h-6" />
      </td>

      <td className="p-2">{label}</td>

      <td className="p-2">
        {value ? (
          <ICheck color="[&>path]:fill-green-400" />
        ) : (
          <IX color="[&>path]:fill-red-400" />
        )}
      </td>

      <td className="p-2">
        {action && (
          <Button
            onClick={action.onClick}
            disabled={action?.disabled || action?.loading}
            variant="outline"
          >
            {action.label}
          </Button>
        )}
      </td>

      <td className="p-2 w-10">{action?.loading && <Loader />}</td>
    </tr>
  );
};

export default memo(TableRow);
