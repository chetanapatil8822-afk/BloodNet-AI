export const addDonor = async (donorData) => {
  try {
    const res = await fetch("https://bloodnet-ai.onrender.com/donors", {
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