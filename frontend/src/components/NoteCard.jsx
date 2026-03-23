import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully");
      if (setNotes) {
        setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
      }
    } catch (error) {
      toast.error("Failed to delete note");
      console.error(error);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/notes/${note._id}?edit=true`);
  };

  return (
    <Link
      to={`/notes/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
        border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3 whitespace-pre-wrap">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
          {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1 z-10">
            <button onClick={handleEdit} className="btn btn-ghost btn-xs text-info">
              <PenSquareIcon className="size-4"/>
            </button>
            <button onClick={handleDelete} className="btn btn-ghost btn-xs text-error">
                <Trash2Icon className="size-4"/>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
