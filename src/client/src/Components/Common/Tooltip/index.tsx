import { TooltipProps } from './helpers';

const darkProps = 'dark:bg-neutral-900';
const shownProps = 'right-24 opacity-100';
const hiddenProps = 'right-20 opacity-0';

export default function Tooltip({ text, shown }: TooltipProps) {
  return (
    <div
      className={`absolute h-14 bg-neutral-300 p-4 rounded-lg pointer-events-none ${
        shown ? shownProps : hiddenProps
      } ${darkProps}`}
    >
      <div
        className={`absolute -right-2 top-5 bg-neutral-300 w-4 h-4 rotate-45 ${darkProps}`}
      />
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
}
