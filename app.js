const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", require("./routes/auth"));
app.use("/domains", require("./routes/domains"));
app.use("/packages", require("./routes/packages"));
app.use("/promo-codes", require("./routes/promocodes"));
app.use("/verify", require("./routes/verify"));

app.listen(port, () => {
  console.log(`Backend server is starting on ${port}`);
});
