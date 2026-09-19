import app from "./src/app/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/congif.db.js";

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});