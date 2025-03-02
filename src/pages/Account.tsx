import { useAppSelector } from "@store/hooks";

const Account = () => {
  const accountInfo = useAppSelector((state) => state.authSlice.user);

  return (
    <>
      <h2>Account Info</h2>
      <ul style={{listStyle: "none", padding: "5px"}}>
        <li>First Name: <span style={{fontWeight: "bold"}}>{accountInfo?.firstName}</span></li>
        <li>Last Name: <span style={{fontWeight: "bold"}}>{accountInfo?.lastName}</span></li>
        <li>Email: <span style={{fontWeight: "bold"}}>{accountInfo?.email}</span></li>
      </ul>
    </>
  );
};

export default Account;