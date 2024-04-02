import { Icon, IconModel } from '../../';

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
      <div className="p-2 cursor-pointer" onClick={onClear}>
        {value && <Icon model="close" className="w-5 h-5" onClick={onClear} />}
      </div>
      <span className="bg-neutral-200 dark:bg-neutral-600 my-2 w-px self-stretch" />
      <div className="p-2 cursor-pointer" onClick={onClick}>
        <Icon model={iconModel} className="w-5 h-5" onClick={onClick} />
      </div>
    </div>
  );
}
