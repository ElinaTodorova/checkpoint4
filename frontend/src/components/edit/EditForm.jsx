import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useState } from "react";

export default function EditForm({ gift, setIsUpdated }) {
  const [newGift, setNewGift] = useState({
    name: gift?.name_gift,
    description: gift?.description_gift,
    ageMin: gift?.age_min,
  });

  const handleChangeName = (e) => {
    setNewGift({ ...newGift, name: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setNewGift({ ...newGift, description: e.target.value });
  };

  const handleChangeAge = (e) => {
    setNewGift({ ...newGift, ageMin: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/gifts/${gift.id}/edit`,
        {
          method: "put",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newGift,
          }),
        }
      );
      if (response.status === 204) {
        setIsUpdated(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        name="name"
        value={newGift.name}
        autoFocus
        onChange={handleChangeName}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        name="description"
        value={newGift.description}
        onChange={handleChangeDescription}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="ageMin"
        name="ageMin"
        value={newGift.ageMin}
        type="number"
        onChange={handleChangeAge}
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
        Save
      </Button>
    </Box>
  );
}

EditForm.propTypes = {
  gift: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name_gift: PropTypes.string.isRequired,
    description_gift: PropTypes.string.isRequired,
    age_min: PropTypes.number.isRequired,
  }).isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
