import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

// dotenv.config({
//   path: ".env.local",
// });
dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on PORT: ${PORT}`);
});
