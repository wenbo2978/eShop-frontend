export const utilityGetToken = async () => {
  const value = `; ${document.cookie}`;
  //console.log(value);
  const parts = value.split('; authToken=');
  //console.log(parts);
  if (parts.length === 2) {
      return parts.pop().split(';').shift();
      //console.log(token);
  }else
    return null;
}