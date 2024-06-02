// const [imgText, setImgText] = useState('');
const handleInputChange = (event, setter) => {
  setter(event.target.value);
};

export default handleInputChange;
