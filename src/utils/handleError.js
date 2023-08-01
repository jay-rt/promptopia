const handleError = async (res) => {
  // Attach extra info to the error object.
  const error = new Error();
  error.status = res.status;
  error.message = await res.text();
  throw error;
};

export default handleError;
