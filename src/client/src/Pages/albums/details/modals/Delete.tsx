import { Heading } from '../../../../Components';
import { DeleteProps } from './helpers';

export default function DeleteSong({ setOpenDel, deleteAlbum }: DeleteProps) {
  return (
    <div>
      <div>
        <Heading
          title="Are you sure you want to delete this album."
          size="small"
        />
        <Heading title="This action cannot be undone." size="small" />
      </div>

      <div className="flex justify-between">
        <button className="bg-secondary" onClick={() => setOpenDel(false)}>
          Cancel
        </button>
        <button onClick={deleteAlbum}>Proceed</button>
      </div>
    </div>
  );
}
