import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import style from "../addGift/AddGiftForm.module.css";
import EditForm from "./EditForm";

export default function Edit() {
  const [gift, setGift] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/gifts/${id}`
        );
        const data = await response.json();
        setGift(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isUpdated === true && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ backgroundColor: "pink" }}
        >
          Your suggestion was update with success.
        </Alert>
      )}
      <section className={style.section}>
        <div className={style.contaier}>
          <h2 className={style.title}>Edit your suggestion</h2>
          {gift !== null && (
            <EditForm gift={gift} setIsUpdated={setIsUpdated} />
          )}
        </div>

        <img
          className={style.flowersImg}
          src="/images/flowers.png"
          alt="Flowers deco"
        />
      </section>
    </>
  );
}
