const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(analyticsRoutes);
app.use(userRoutes);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
