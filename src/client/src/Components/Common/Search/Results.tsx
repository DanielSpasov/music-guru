import { ThemeContext } from 'styled-components';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Image, Text } from '../../HTML';
import { ResultsProps } from './helpers';
import { Loader } from '../../Core';

export default function Results({
  results,
  open,
  loading,
  toggleOpen
}: ResultsProps) {
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onResultClick = useCallback(
    (_: any, x: any) => {
      navigate(`/artists/${x.uid}`);
      toggleOpen();
    },
    [toggleOpen, navigate]
  );

  return (
    <Box
      boxShadow="rgba(0, 0, 0, 0.45) 0px 0px 5px 3px"
      transform={open ? 'scale(1)' : 'scale(0)'}
      opacity={open ? '1' : '0'}
      backgroundColor={colors.base}
      position="absolute"
      textAlign="center"
      padding="0.5em"
      width="200px"
      right="0px"
      top="60px"
    >
      {loading && <Loader size="s" rainbow />}
      {!loading && !results.length && <Text>No Results.</Text>}
      {!loading && !!results.length && (
        <Box textAlign="start">
          {results.map(x => {
            return (
              <Box
                display="flex"
                padding="0.25em"
                alignItems="center"
                key={x.uid}
                hoverEffects={{ backgroundColor: colors.baseLight }}
                onClick={(e: any) => onResultClick(e, x)}
              >
                <Image
                  src={x.image}
                  height="40px"
                  hoverEffects={{ cursor: 'pointer' }}
                />
                <Text padding="0 0.5em" fontSize="1em">
                  {x.name}
                </Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
