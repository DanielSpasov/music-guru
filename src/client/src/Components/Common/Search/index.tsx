import { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Box, Icon, Image, Text, Loader } from '../../';
import useDebounce from '../../../Hooks/useDebounce';
import Popover from '../Popover';
import Api from '../../../Api';
import Input from './Input';

export default function SearchBox() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const search = useDebounce({ value, delay: 500 });
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleOpen = useCallback(() => setOpen(prev => !prev), []);
  const onChange = useCallback((e: any) => setValue(e?.target?.value), []);
  const onResultClick = useCallback(
    (_: any, x: any) => {
      navigate(`/artists/${x.uid}`);
      toggleOpen();
    },
    [toggleOpen, navigate]
  );

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    if (!search) {
      setResults([]);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const { data } = await Api.artists.fetch({
          config: { params: { search } }
        });
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  return (
    <Box height="100%" display="flex" alignItems="center" padding="0 0.75em">
      <Input
        onChange={onChange}
        value={value}
        open={open}
        placeholder="Search..."
        position="absolute"
        right="0px"
      />

      <Icon model="search" type="solid" fontSize="1.5em" onClick={toggleOpen} />

      <Popover open={open} width="200px" textAlign="center">
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
                  hoverCSS={{ backgroundColor: colors.baseLight }}
                  onClick={(e: any) => onResultClick(e, x)}
                >
                  <Image
                    src={x.image}
                    height="40px"
                    hoverCSS={{ cursor: 'pointer' }}
                  />
                  <Text padding="0 0.5em" fontSize="1em">
                    {x.name}
                  </Text>
                </Box>
              );
            })}
          </Box>
        )}
      </Popover>
    </Box>
  );
}
