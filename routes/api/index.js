const router = require("express").Router();
const showRoutes = require("./shows");
const externalRoutes = require("./external");
const userRoutes = require("./users");

// Book routes
router.use("/shows", showRoutes);
router.use("/external", externalRoutes);
router.use("/users", userRoutes);

module.exports = router;
