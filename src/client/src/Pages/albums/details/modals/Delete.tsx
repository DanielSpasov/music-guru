import { DeleteProps } from './helpers';

export default function Delete({ setOpenDel, deleteAlbum }: DeleteProps) {
  return (
    <div>
      <h4 className="text-center">
        Are you sure you want to delete this song, this action cannot be undone.
      </h4>

      <div className="flex justify-between mt-4">
        <button className="bg-secondary" onClick={() => setOpenDel(false)}>
          Cancel
        </button>
        <button onClick={deleteAlbum}>Proceed</button>
      </div>
    </div>
  );
}
