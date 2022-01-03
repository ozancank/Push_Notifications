const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const webPush = require("web-push");

const vapidKeys = {
  publicKey: "X",
  privateKey: "X",
};

webPush.setVapidDetails("mailto:info@test.com", vapidKeys.publicKey, vapidKeys.privateKey);

const PORT = process.env.PORT || 3000;

let { categoryList } = require("./data");

app.get("/", (req, res) => {
  res.status(200).send({ categoryList });
});

app.post("/subscribe/:categoryId", (req, res) => {
  if (req.params.categoryId && req.body.subscriber) {
    const matchedCategory = categoryList.find((c) => c.id == req.params.categoryId);

    if (!matchedCategory) return status(404).send({ message: "Kategori Bulunamadı!" });

    matchedCategory.subscriberList.push(req.body.subscriber);
    return res.status(201).send({
      message: `Tebrikler! ${matchedCategory.title} kategorisine bir konu eklendiğinde ilk sizin haberiniz olacak.`,
      category: {
        id: matchedCategory.id,
        title: matchedCategory.title,
      },
    });
  } else {
    return res.status(400).send({ message: "Eksik bilgi gönderildi ..." });
  }
});

app.post("/send_notification/:categoryId", (req, res) => {
  if (req.params.categoryId && req.body.message) {
    const matchedCategory = categoryList.find((c) => c.id == req.params.categoryId);

    if (!matchedCategory) return status(404).send({ message: "Kategori Bulunamadı!" });

    const subscriberList = matchedCategory.subscriberList || [];

    subscriberList.forEach((sub) => {
      webPush.sendNotification(sub, req.body.message);
    });

    return res.status(201).send({
      message: `Bildirim gönderildi..`,
    });
  } else {
    return res.status(400).send({ message: "Eksik bilgi gönderildi ..." });
  }
});

app.listen(PORT, () => {
  console.log("Sunucu başarılı bir şekilde çalışıyor.");
});
