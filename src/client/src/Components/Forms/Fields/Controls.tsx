import { IconModel } from '../../HTML/Icon/Icons';
import { Icon } from '../../HTML';

type ControlsProps = {
  onClear: (props: any) => void;
  onClick: (props: any) => void;
  iconModel: IconModel;
  value: any;
};

export default function Controls({
  iconModel,
  onClick,
  onClear,
  value
}: ControlsProps) {
  return (
    <div className="absolute top-0 right-0 p-1 flex items-center">
      <div className="p-2">
        {value && <Icon model="close" size="20px" onClick={onClear} />}
      </div>
      <span className="bg-neutral-600 my-2 w-px self-stretch" />
      <div className="p-2">
        <Icon model={iconModel} size="20px" onClick={onClick} />
      </div>
    </div>
  );
}
