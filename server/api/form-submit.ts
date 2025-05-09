export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Process the form data (e.g., save to database, send email, etc.)
  try {
    // Example: Log the data to the console
    console.log("Form data received:", body);

    // Respond with a success message
    return { success: false };
  } catch (error) {
    console.error("Error processing form:", error);
    return { success: false, message: "An error occurred." };
  }
});