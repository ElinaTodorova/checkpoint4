import AddGiftForm from "../components/addGift/AddGiftForm";
import Header from "../components/header/Header";
import Error from "../components/onlyUsers/Error";
import { useUserContext } from "../contexts/userContext";

export default function AddGift() {
  const { userData } = useUserContext();
  return (
    <>
      <Header />
      {userData === "null" || userData === null ? <Error /> : <AddGiftForm />}
    </>
  );
}
