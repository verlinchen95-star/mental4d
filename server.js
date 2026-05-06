const express = require("express");
const Mega = require("megajs");

const app = express();

const MEGA_URL =
  "https://mega.nz/file/1VkBCbTT#wZeWIHgbKeiJpAsr4EDieB7SoFPoKCJkWIyrHQg7bkU";

app.get("/download", (req, res) => {

  const file = Mega.File.fromURL(MEGA_URL);

  file.loadAttributes((err) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Mega error");
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.name}"`
    );

    res.setHeader(
      "Content-Type",
      "application/octet-stream"
    );

    file.download().pipe(res);
  });
});

app.get("/", (req, res) => {
  res.send("Backend jalan");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});