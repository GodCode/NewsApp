const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("1a67c821242744adb23609031314cdbc");

export default function (req, res) {
  newsapi.v2
    .topHeadlines({
      language: "en",
      country: "in",
    })
    .then((response) => {
      res.json(response);
    });
}
