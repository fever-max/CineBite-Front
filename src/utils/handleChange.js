// const [user, setUser] = useState({
//   userId: '',
//   userPw: '',
// });

const handleChange = (e, setter) => {
  const { id, value } = e.target;
  setter((prevState) => ({ ...prevState, [id]: value }));
};
export default handleChange;
