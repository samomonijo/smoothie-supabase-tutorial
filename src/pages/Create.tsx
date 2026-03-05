import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please, fill in all the fields correctly!!!");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      console.log(error);
      setFormError("Please, fill in all the fields correctly!!!");
    }

    if (data) {
      setFormError(null);
      navigate('/');
    }
  }

  return (
    <div className="max-w-300 my-5 mx-auto p-5 create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={e => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>
        {formError && <p>{formError}</p>}
      </form>
    </div>
  );
};

export default Create;