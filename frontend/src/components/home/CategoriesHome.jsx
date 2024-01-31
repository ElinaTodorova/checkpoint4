import { Link } from "react-router-dom";
import style from "./CategoriesHome.module.css";

export default function CategoriesHome() {
  return (
    <section className={style.container}>
      <Link to="/gifts">
        <div className={style.category}>
          <h2 className={style.title}>Our gift suggestions</h2>
          <h2 className={style.titleDesktop}>Discover our gift suggestions</h2>
          <div className={style.imageContainerGift}>
            <img src="images/present.png" alt="Gift icon" />
          </div>
        </div>
      </Link>
      <div className={style.category}>
        <h2 className={style.title}>Our activities suggestions</h2>
        <h2 className={style.titleDesktop}>
          Discover our activities suggestions
        </h2>
        <div className={style.imageContainer}>
          <img src="images/castle.jpg" alt="Castle icon" />
        </div>
      </div>
    </section>
  );
}
