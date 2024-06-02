const handleFileChange = (event, setter) => {
  setter(event.target.files[0]);
};

export default handleFileChange;
