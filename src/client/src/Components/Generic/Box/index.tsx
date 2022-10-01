import { useMemo } from 'react';
import {
  Display,
  Position,
  Variant,
  FlexDirection,
  AlignItems,
  FlexWrap,
  JustifyContent,
  AlignContent
} from './types';

export default function Box({
  children,
  position = 'static',
  display = 'block',
  flexDirection = 'row',
  alignItems = 'flex-start',
  flexWrap = 'wrap',
  justifyContent = 'flex-start',
  alignContent = 'flex-start',
  variant = 'primary',
  width = 'auto',
  height = 'auto',
  backgroundColor = ''
}: {
  children?: JSX.Element | JSX.Element[];
  position?: Position;
  display?: Display;
  flexDirection?: FlexDirection;
  alignItems?: AlignItems;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignContent?: AlignContent;
  variant?: Variant;
  width?: string;
  height?: string;
  backgroundColor?: string;
}) {
  const style = useMemo(
    () => ({
      position,
      display,
      width,
      height,
      backgroundColor,
      ...(display === 'flex'
        ? {
            flexDirection,
            alignItems,
            flexWrap,
            justifyContent,
            alignContent
          }
        : {})
    }),
    [
      position,
      display,
      flexDirection,
      width,
      height,
      alignItems,
      flexWrap,
      justifyContent,
      alignContent,
      backgroundColor
    ]
  );

  console.log(style);

  return <div style={style}>{children}</div>;
}
