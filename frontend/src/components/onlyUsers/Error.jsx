import { Link } from "react-router-dom";
import style from "./Error.module.css";

export default function Error() {
  return (
    <section className={style.err}>
      <h2>Ohhhhhh no!</h2>
      <p>
        {" "}
        It seems you're trying to perform an action exclusive to registered
        users. To unlock this exceptional feature, please{" "}
        <Link to="/login">log in to your account</Link> or
        <Link to="/register"> create a new account</Link> now.
      </p>
    </section>
  );
}
