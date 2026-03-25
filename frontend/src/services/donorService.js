export const addDonor = async (donorData) => {
  try {
    const res = await fetch("http://localhost:5000/donors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donorData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding donor:", error);
    throw error;
  }
};