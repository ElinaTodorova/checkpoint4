import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "./AddGiftForm.module.css";
import { useUserContext } from "../../contexts/userContext";

export default function AddGiftForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userData } = useUserContext();

  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeAge = (e) => {
    setAgeMin(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel gift
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/gifts`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            ageMin,
            imageUrl,
            userId: userData.user.id,
          }),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        navigate("/gifts");
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <section className={style.section}>
      <div className={style.contaier}>
        <h2 className={style.title}>New suggestion</h2>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            autoFocus
            onChange={handleChangeName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={handleChangeDescription}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="ageMin"
            label="Age min"
            name="ageMin"
            value={ageMin}
            type="number"
            onChange={handleChangeAge}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="imageUrl"
            label="Image"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChangeImage}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "rgb(250, 209, 225)",
              color: "black",
            }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </div>
      <img
        className={style.flowersImg}
        src="/images/flowers.png"
        alt="Flowers deco"
      />
    </section>
  );
}
