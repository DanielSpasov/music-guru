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
  position = 'relative',
  display = 'block',
  flexDirection = 'row',
  alignItems = 'flex-start',
  flexWrap = 'wrap',
  justifyContent = 'flex-start',
  alignContent = 'flex-start',
  variant = 'primary',
  width = 'auto'
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
}) {
  const style = useMemo(
    () => ({
      position,
      display,
      width,
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
      alignItems,
      flexWrap,
      justifyContent,
      alignContent
    ]
  );

  return <div style={style}>{children}</div>;
}
