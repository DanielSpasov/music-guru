import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react';
import { Box, Header, Icon, Loader } from '../../../Components';
import { StyledInput } from '../../../Components/Forms/Fields/Input/Styled';
import { Artist } from '../helpers';
import { AuthContext } from '../../../Contexts/Auth';
import { toast } from 'react-toastify';

type Props = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  artist: Artist;
  updateField: (key: keyof Artist) => Promise<void>;
};

export default function Name({
  isEditing,
  setIsEditing,
  artist,
  updateField
}: Props) {
  const { uid: userUID } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const onUpdate = useCallback(async () => {
    try {
      setLoading(true);
      await updateField('name');
      setIsEditing(prev => !prev);
    } catch (err) {
      toast.error('Failed to update Artist name.');
    } finally {
      toast.success('Successfully updated Artist name.');
      setLoading(false);
    }
  }, [setIsEditing, updateField]);

  return (
    <Box display="flex" alignItems="center">
      {isEditing ? (
        <StyledInput
          id="name"
          margin=".7em 0"
          fontSize="2em"
          fontWeight="bold"
          width="300px"
          padding=".25em"
          defaultValue={artist.name}
        />
      ) : (
        <Header
          title={artist.name}
          {...(userUID === artist.created_by.uid && {
            variant: hover ? 'primary' : 'text',
            cursor: hover ? 'pointer' : 'auto',
            onMouseOver: () => setHover(true),
            onMouseOut: () => setHover(false),
            onClick: () => setIsEditing(prev => !prev)
          })}
        />
      )}
      {userUID === artist.created_by.uid && (
        <Box padding=".5em">
          {loading && <Loader size="s" />}
          {isEditing && !loading && <Icon model="check" onClick={onUpdate} />}
        </Box>
      )}
    </Box>
  );
}
