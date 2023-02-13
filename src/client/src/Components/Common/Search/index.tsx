import { useCallback, useEffect, useRef, useState } from 'react';

import useDebounce from '../../../Hooks/useDebounce';
import { Box, Icon } from '../../HTML';
import Results from './Results';
import Api from '../../../Api';
import Input from './Input';

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const search = useDebounce({ value, delay: 500 });
  const [results, setResults] = useState<any[]>([]);

  const toggleOpen = useCallback(() => setOpen(prev => !prev), []);
  const onChange = useCallback((e: any) => setValue(e?.target?.value), []);

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

      <Results
        results={results}
        open={open}
        loading={loading}
        toggleOpen={toggleOpen}
      />
    </Box>
  );
}
