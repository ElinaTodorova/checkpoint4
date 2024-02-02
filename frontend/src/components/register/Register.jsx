import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "./Register.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isGood, setIsGood] = useState(false);
  const [errorEmail, setErrorEmail] = useState([]);
  const [errorPass, setErrorPass] = useState([]);
  const navigate = useNavigate();
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+.[a-z]{2,3}/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setIsGood(false);
      setError("Two password don't match");
    } else {
      setIsGood(true);
    }
  }, [confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!emailRegex.test(email)) {
        setErrorEmail("Email is not valid!");
      }
      if (!passRegex.test(password)) {
        setErrorPass(
          "At least 8 characters, 1 number, 1 special character, 1 uppercase letter."
        );
      }
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className={style.section}>
      <div className={style.contaier}>
        <h2 className={style.title}>Register</h2>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={handleChangeEmail}
          />
          {errorEmail.length > 0 && (
            <p style={{ color: "red" }}>{errorEmail}</p>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            autoFocus
            onChange={handleChangeUsername}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            value={password}
            autoComplete="password"
            type="password"
            onChange={handleChangePassword}
          />
          {errorPass.length > 0 && <p style={{ color: "red" }}>{errorPass}</p>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            autoComplete="confirmPassword"
            type="password"
            onChange={handleChangeConfirmPass}
          />
          {isGood === false && <p style={{ color: "red" }}>{error}</p>}

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
            // disabled={null || !available}
          >
            Submit
          </Button>
        </Box>
      </div>
      <img className={style.flowers} src="/images/flowers.png" alt="Flowers" />
    </section>
  );
}
