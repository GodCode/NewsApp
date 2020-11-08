const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("1a67c821242744adb23609031314cdbc");

export default function (req, res) {
  const query = req.query.q;
  if (query == "") {
    return res.json({
      articles: [],
    });
  }
  const page = req.query.page;

  newsapi.v2
    .everything({
      q: query,
      page: page,
      language: "en",
    })
    .then((response) => {
      response.query = query;
      res.json(response);
    });
}
