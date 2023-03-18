export default async function submitApiRequest({ e, setShowPopup, apiRequest }) {
  e.preventDeault();
  console.log({ e });
  const formData = new FormData(e.target);
  try {
    const response = await apiRequest(formData);
    console.log({ response });
    if (response.data.status === "success") {
      setShowPopup(false);
    }
  } catch (error) {
    console.log(error);
  }
}
