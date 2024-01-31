import CategoriesHome from "./CategoriesHome";
import style from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={style.section}>
        <h1 className={style.title}>Little Princess</h1>
        <div className={style.container}>
          <p className={style.paragraph}>
            Looking for ideas for your child's birthday? Little Princess has you
            covered! Explore our presents suggestions and activities to make
            their celebration unforgettable.
          </p>
          <img
            className={style.image}
            src="images/ImageRose.jpg"
            alt="Pink logo with dino"
          />
        </div>
      </section>
      <CategoriesHome />
    </>
  );
}
