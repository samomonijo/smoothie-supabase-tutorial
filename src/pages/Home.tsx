import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

// components:
import SmoothieCard from "../components/SmoothieCard";

type Smoothie = {
  id: number,
  created_at: string,
  title: string,
  method: string,
  rating: string
};

const Home = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id: number) => {
    setSmoothies(prevSmoothies => {
      if (!prevSmoothies) return prevSmoothies;
      return prevSmoothies.filter(sm => sm.id !== id);
    });
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(data as Smoothie[]);
        setFetchError(null);
      }
    }

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="max-w-300 my-5 mx-auto p-5">
      {fetchError && (<p>{fetchError}</p>)}

      {smoothies && (
        <div className="smoothies">
          {/* Order by buttons */}
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {smoothies.map(smoothie => {
              return (
                <SmoothieCard 
                  key={smoothie.id} 
                  smoothie={smoothie} 
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;