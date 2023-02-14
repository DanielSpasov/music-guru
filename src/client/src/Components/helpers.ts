import { css } from 'styled-components';

export const padding = css<any>`
  padding: ${({ padding }) => padding};
  padding-left: ${({ paddingLeft }) => paddingLeft};
  padding-right: ${({ paddingRight }) => paddingRight};
  padding-top: ${({ paddingTop }) => paddingTop};
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

export const margin = css<any>`
  margin: ${({ margin }) => margin};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

export const border = css<any>`
  border: ${({ border }) => border};
  border-left: ${({ borderLeft }) => borderLeft};
  border-right: ${({ borderRight }) => borderRight};
  border-top: ${({ borderTop }) => borderTop};
  border-bottom: ${({ borderBottom }) => borderBottom};
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
`;

export const dimensions = css<any>`
  height: ${({ height }) => height};
  min-height: ${({ minHeight }) => minHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  width: ${({ width }) => width};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  z-index: ${({ zIndex }) => zIndex};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
`;

export const positioning = css<any>`
  display: ${({ display }) => display || 'block'};
  position: ${({ position }) => position || 'relative'};
`;

export const colors = css<any>`
  opacity: ${({ opacity }) => opacity};
  color: ${({ color, theme: { colors } }) => color || colors?.text};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
`;

export const essentials = css<any>`
  ${positioning}
  ${dimensions}
  ${padding}
  ${margin}
  ${border}
`;

export const flex = css<any>`
  flex: ${({ flex }) => flex};
  order: ${({ order }) => order};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  flex-basis: ${({ flexBasis }) => flexBasis};
  flex-flow: ${({ flexFlow }) => flexFlow};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-self: ${({ alignSelf }) => alignSelf};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  gap: ${({ gap }) => gap};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};
`;

export const shadows = css<any>`
  box-shadow: ${({ boxShadow }) => boxShadow};
`;

export const font = css<any>`
  font-size: ${({ fontSize }) => fontSize || '1em'};
  font-variant: ${({ fontVariant }) => fontVariant};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-family: ${({ fontFamily }) => fontFamily || "'Maven Pro', sans-serif"};
  font-style: ${({ fontStyle }) => fontStyle};
`;

export const text = css<any>`
  text-align: ${({ textAlign }) => textAlign};
  text-decoration: ${({ textDecoration }) => textDecoration || 'none'};
  text-overflow: ${({ textOverflow }) => textOverflow};
  text-orientation: ${({ textOrientation }) => textOrientation};
  text-shadow: ${({ textShadow }) => textShadow};
  text-transform: ${({ textTransform }) => textTransform};
`;

export const pointer = css<any>`
  pointer: ${({ pointer }) => pointer};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
`;

export const onHover = css<any>`
  &:hover: {
    ${({ onHover }) => onHover}
  }
`;

export const animations = css<any>`
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition || '0.3s'};
`;
