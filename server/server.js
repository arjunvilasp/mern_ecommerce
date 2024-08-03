import express from "express";
import dotenv from "dotenv";
import db from "./db/db.js";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import cartRoute from "./routes/cart.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use("/api/auth/", authRoute);
app.use("/api/product/", productRoute);
app.use("/api/users/", userRoute);
app.use("/api/cart/", cartRoute);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

app.listen(port, () => {
  db();
  console.log(`Server started on port ${port}`);
});
