import { useEffect, useState } from "react";
import style from "./Gifts.module.css";
import GiftCard from "./GiftCard";

export default function Gifts() {
  const [allGifts, setAllGifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/gifts`
        );
        const data = await response.json();

        setAllGifts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className={style.giftsSection}>
        <h2 className={style.titleH2}>Little Princess</h2>
        <h3 className={style.titleH3}>Our gift suggestions</h3>
      </section>
      <section>
        {allGifts.length > 0 &&
          allGifts.map((gift) => (
            <GiftCard
              id={gift.id}
              key={gift.id}
              name={gift.name_gift}
              descriprion={gift.description_gift}
              ageMin={gift.age_min}
              image={gift.image_url}
              userId={gift.user_id}
            />
          ))}
      </section>
    </>
  );
}
