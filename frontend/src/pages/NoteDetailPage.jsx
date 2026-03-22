import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditingInitial = searchParams.get('edit') === 'true';

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(isEditingInitial);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error("Failed to fetch note");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setUpdating(true);
    try {
      const res = await axios.put(`http://localhost:5001/api/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
      setNote(res.data);
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update note");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error(error);
    }
  };

  if (loading) return <div className="min-h-screen p-8 text-center text-primary mt-10">Loading note...</div>;
  if (!note) return <div className="min-h-screen p-8 text-center text-error mt-10">Note not found</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            &larr; Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl border-t-4 border-solid border-[#00FF9D]">
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleUpdate}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-64 w-full"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className={`btn btn-primary ${updating ? 'loading' : ''}`} disabled={updating}>
                      {updating ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => {
                        setIsEditing(false);
                        setTitle(note.title);
                        setContent(note.content);
                    }}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-bold">{note.title}</h1>
                    <div className="flex gap-2 z-10">
                      <button className="btn btn-sm btn-info" onClick={() => setIsEditing(true)}>Edit</button>
                      <button className="btn btn-sm btn-error" onClick={handleDelete}>Delete</button>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap text-base-content/80 text-lg mb-8">
                    {note.content}
                  </div>
                  <div className="text-sm text-base-content/50">
                    Created at: {new Date(note.createdAt).toLocaleString()}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;