import PropTypes from "prop-types";
import style from "./ActivityCard.module.css";

export default function ActivityCard({
  name,
  descriprion,
  ageMin,
  ageMax,
  image,
}) {
  return (
    <div className={style.giftCard}>
      <div className={style.infos}>
        <h4>Name: {name}</h4>
        <p>Description: {descriprion}</p>
        <p>Age min: {ageMin}</p>
        <p>Age max: {ageMax}</p>
      </div>
      <div className={style.image}>
        <img src={image} alt={name} />
      </div>
    </div>
  );
}

ActivityCard.propTypes = {
  name: PropTypes.string.isRequired,
  descriprion: PropTypes.string.isRequired,
  ageMin: PropTypes.number.isRequired,
  ageMax: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
