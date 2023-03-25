export type DotSize = 'b' | 's';

export type LoaderProps = {
  fullscreen?: boolean;
  dim?: boolean;
  rainbow?: boolean;
  color?: string;
  size?: DotSize;
};

export type DotProps = {
  delay: string;
  color: string;
  top: string;
  left: string;
  size: string;
};

const rainbowColors = [
  '#fc0303',
  '#fc4a03',
  '#fc9803',
  '#fcdf03',
  '#cefc03',
  '#5efc03',
  '#039dfc',
  '#0352fc',
  '#4e03fc',
  '#c603fc',
  '#fc03c2',
  '#fc036f'
];

const delays = [
  '0s',
  '-0.1s',
  '-0.2s',
  '-0.3s',
  '-0.4s',
  '-0.5s',
  '-0.6s',
  '-0.7s',
  '-0.8s',
  '-0.9s',
  '-1s',
  '-1.1s'
];

const getSize = (size: DotSize) => {
  return size === 's'
    ? [
        { top: '19px', left: '39px' }, // Right
        { top: '10px', left: '36px' },
        { top: '3px', left: '28px' },
        { top: '0', left: '19px' }, // Top
        { top: '3px', left: '10px' },
        { top: '10px', left: '3px' },
        { top: '19px', left: '0px' }, // Left
        { top: '28px', left: '3px' },
        { top: '36px', left: '10px' },
        { top: '39px', left: '19px' }, // Bottom
        { top: '36px', left: '28px' },
        { top: '28px', left: '36px' }
      ]
    : [
        { top: '37px', left: '66px' }, // Right
        { top: '22px', left: '62px' },
        { top: '11px', left: '52px' },
        { top: '7px', left: '37px' }, // Top
        { top: '11px', left: '22px' },
        { top: '22px', left: '11px' },
        { top: '37px', left: '7px' }, // Left
        { top: '52px', left: '11px' },
        { top: '62px', left: '22px' },
        { top: '66px', left: '37px' }, // Bottom
        { top: '62px', left: '52px' },
        { top: '52px', left: '62px' }
      ];
};

export const getCssProps = ({
  size = 'b',
  rainbow = false,
  color = 'white'
}: Partial<LoaderProps>) => {
  return Array(12)
    .fill({})
    .map((x, i) => ({
      ...x,
      ...getSize(size)[i],
      size: size === 's' ? '4px' : '6px',
      color: rainbow ? rainbowColors[i] : color,
      delay: delays[i]
    }));
};
