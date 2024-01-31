import { useEffect, useState } from "react";
import style from "../gifts/Gifts.module.css";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/activities`
        );
        const data = await response.json();

        setAllActivities(data);
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
        {allActivities.length > 0 &&
          allActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              name={activity.name_activity}
              descriprion={activity.description_activity}
              ageMin={activity.age_min}
              ageMax={activity.age_max}
              image={activity.image_url}
            />
          ))}
      </section>
    </>
  );
}
