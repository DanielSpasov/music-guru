import { Icon, IconModel } from '../../';

type ControlsProps = {
  onClear: (props: any) => void;
  onClick: (props: any) => void;
  iconModel: IconModel;
  value: any;
};

const iconLightHoverProps = `[&>svg>path]:hover:fill-secondary`;
const iconDarkHoverProps = `dark:[&>svg>path]:hover:fill-primary-dark`;
const iconHoverProps = `${iconLightHoverProps} ${iconDarkHoverProps}`;

export default function Controls({
  iconModel,
  onClick,
  onClear,
  value
}: ControlsProps) {
  return (
    <div className="absolute top-0 right-0 p-1 flex items-center">
      <div className={`p-2 cursor-pointer ${iconHoverProps}`} onClick={onClear}>
        {value && <Icon model="close" className="w-5 h-5" />}
      </div>
      <span className="bg-neutral-200 dark:bg-neutral-600 my-2 w-px self-stretch" />
      <div className={`p-2 cursor-pointer ${iconHoverProps}`} onClick={onClick}>
        <Icon model={iconModel} className="w-5 h-5" />
      </div>
    </div>
  );
}
