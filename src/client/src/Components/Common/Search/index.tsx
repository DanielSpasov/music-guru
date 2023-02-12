import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../../Api';
import useDebounce from '../../../Hooks/useDebounce';

import { Box, Icon } from '../../HTML';
import Input from './Input';

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const search = useDebounce({ value, delay: 500 });

  const toggleSearch = useCallback(() => setOpen(prev => !prev), []);
  const onChange = useCallback((e: any) => setValue(e?.target?.value), []);

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    (async () => {
      const { data } = await Api.artists.fetch({
        config: { params: { search } }
      });
      setResults(data);
    })();
  }, [search]);

  return (
    <Box height="100%" display="flex" alignItems="center" margin="0 0.75em">
      <Input
        onChange={onChange}
        value={value}
        open={open}
        placeholder="Search..."
        position="absolute"
        right="-8px"
      />

      <Icon
        model="search"
        type="solid"
        fontSize="1.5em"
        onClick={toggleSearch}
      />
    </Box>
  );
}
