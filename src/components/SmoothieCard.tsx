import { Link } from "react-router";
import supabase from "../config/supabaseClient";

type Smoothie = {
  smoothie: {
    id: number,    
    created_at: string,
    title: string,
    rating: string,
    method: string
  }, 
  onDelete: (id: number) => void;
};

const SmoothieCard = ({ smoothie, onDelete }: Smoothie) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) console.log(error);
    if (data) onDelete(smoothie.id);
  }

  return (
    <div className="w-full flex flex-col gap-3 p-2.5 bg-white box-border rounded-md relative">
      <div className="absolute -top-2.5 -right-2.5 bg-(--secondary) text-white rounded-md w-10 h-0 py-5 px-0 leading-0 text-center">
        {smoothie.rating}
      </div>

      <h3>{smoothie.title}</h3>
      <p className="grow">{smoothie.method}</p>

      <div className="text-right flex justify-end items-center space-x-2">
        <Link to={`/${smoothie.id}`}>
          <i className="material-icons text-[#BBB] text-[1.2em] p-1.5 bg-[#EEE] rounded-[50%] cursor-pointer">
            edit
          </i>
        </Link>

        <i className="material-icons text-[#BBB] text-[1.2em] p-1.5 bg-[#EEE] rounded-[50%] cursor-pointer" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;