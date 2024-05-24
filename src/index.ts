import express from "express";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { AppDataSource } from "./db";
import { RestaurantService } from "./services/restaurant.service";
import { RestaurantRoute } from "./routes/restaurant.route";
import { UserRoute } from "./routes/user.router";
import { UserRoleRoute } from "./routes/userRole.route";
import { BookingRoute } from "./routes/booking.router";
import { authenticateToken } from "./utils";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

configDotenv();
AppDataSource.initialize()
  .then(() => {
    console.log("Connect to database");
    const port = process.env.SERVER_PORT || 4000;
    app.listen(port, () => {
      console.log("App started and listening on " + port);
    });
  })
  .catch((e) => {
    console.log(e);
  });

// app.get("/rest", async (req, res) => {
//   res.json(await RestaurantService.getAllRestaurants());
// });

// app.post("/u", async (req, res) => {
//   res.json(await RestaurantService.createRestaurant(req.body));
// });
app.use("/api/restaurant", RestaurantRoute);

app.use(authenticateToken);
app.use("/api/user", UserRoute);
app.use("/api/booking", BookingRoute);
app.use("/api/user", UserRoute);
app.use("/api/userRole", UserRoleRoute);

app.get("*", (req, res) => {
  res.status(501).json({
    message: "NOT_IMPLEMENTED",
    timestamp: new Date(),
  });
});
