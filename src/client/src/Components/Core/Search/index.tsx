import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo
} from 'react';
import { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { startCase } from 'lodash';

import { ResultProps, SearchBoxProps, Results } from './helpers';
import { Box, Icon, Image, Text, Loader } from '../..';
import useDebounce from '../../../Hooks/useDebounce';
import Popover from '../../Common/Popover';
import Api from '../../../Api';
import Input from './Input';

export default function SearchBox({ models, width = '200px' }: SearchBoxProps) {
  const navigate = useNavigate();

  const [results, setResults] = useState<Results>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const search = useDebounce({ value, delay: 500 });

  const toggleOpen = useCallback(() => setOpen(prev => !prev), []);
  const onChange = useCallback((e: any) => setValue(e?.target?.value), []);

  const hasResults = useMemo(
    () => Boolean(results?.[0]?.[1].length),
    [results]
  );

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current || !search) {
      firstLoad.current = false;
      setResults([]);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const results: Results = await Promise.all(
          models.map(async model => {
            const { data } = await Api[model].fetch({
              config: { params: { search } }
            });
            return [model, data];
          })
        );

        setResults(results);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [search, models]);

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      padding="0 0.75em"
      onBlur={toggleOpen}
    >
      <Input
        onChange={onChange}
        value={value}
        open={open}
        placeholder="Search..."
        position="absolute"
        width={width}
        right="0px"
      />

      <Icon model="search" type="solid" onClick={toggleOpen} />

      <Popover open={open} width={width} textAlign="center">
        {loading && <Loader size="s" rainbow />}
        {!loading && !hasResults && <Text>No Results.</Text>}
        {!loading && hasResults && (
          <Box textAlign="start">
            {results.map(([model, data]) => (
              <Box key={model}>
                <Text fontSize="1.2em" fontWeight="bold">
                  {data.length ? startCase(model) : null}
                </Text>
                <Box marginTop=".25em">
                  {data.map(obj => (
                    <Result
                      key={obj.uid}
                      data={obj}
                      onClick={() => {
                        navigate(`/${model}/${obj.uid}`);
                        toggleOpen();
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Popover>
    </Box>
  );
}

export function Result({ data, onClick, selected }: ResultProps<any>) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      display="flex"
      padding=".3em"
      alignItems="center"
      key={data.uid}
      backgroundColor={selected ? colors.baseLight : 'transparent'}
      hoverCSS={{ backgroundColor: colors.baseLight }}
      onClick={onClick}
    >
      <Image src={data.image} height="40px" hoverCSS={{ cursor: 'pointer' }} />
      <Text padding="0 0.5em" fontSize="1em">
        {data.name}
      </Text>
    </Box>
  );
}
