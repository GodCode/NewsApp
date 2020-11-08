import { Button } from "react-bootstrap";
import { Navbar, Row, Col, Card, Form } from "react-bootstrap";
import Head from "next/head";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Manjit Pardeshi",
      news: [],
      page: 1,
      query: "",
      loadMore: false,
      headline: "Top Headlines",
    };
  }
  componentDidMount() {
    fetch("api/headlines")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ news: data.articles });
        console.log(this.state.news);
      });
  }

  updateData(q) {
    console.log(q);
    this.setState({ query: q });
    setTimeout(() => {
      fetch(`api/search?q=${this.state.query}&page=${this.state.page}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            news: data.articles,
            loadMore: true,
            headline: "Best matches for " + q,
          });
          console.log(data);
        });
    }, 1000);
  }

  addData() {
    console.log(this.state.page);
    fetch(`api/search?q=${this.state.query}&page=${this.state.page + 1}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          news: [...this.state.news, ...data.articles],
          page: this.state.page + 1,
        });
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <Head>
          <title>NewsApp Home</title>
          <style>
            {`
            body {
              margin : 1px
            }
            .card-img-top {
              height : 212px;
              width : 100%;
            }
            `}
          </style>

          <script
            src="https://unpkg.com/react/umd/react.production.min.js"
            crossorigin
          ></script>

          <script
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
            crossorigin
          ></script>

          <script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin
          ></script>

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossorigin="anonymous"
          />
        </Head>
        <div>
          <Navbar expand="lg" bg="dark" variant="dark" className="mb-4">
            <Navbar.Brand>News App</Navbar.Brand>
          </Navbar>
          <Row style={{ textAlign: "center" }}>
            <Col md={{ span: 8, offset: 2 }}></Col>
          </Row>

          <Row>
            <Col
              md={{ span: 6, offset: 3 }}
              sm={{ span: 10, offset: 1 }}
              xs={{ span: 10, offset: 1 }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your search query"
                  onChange={(ev) => this.updateData(ev.target.value)}
                  value={this.state.query}
                />
              </Form.Group>
            </Col>
          </Row>

          <div style={{ marginLeft: "5px" }}>
            <h2> {this.state.headline} </h2>
            <hr />
          </div>
          <Row style={{ margin: "5px" }}>
            {this.state.news.map((news) => {
              return (
                <Col md={{ span: 3 }}>
                  <Card className="mb-3">
                    <Card.Img variant="top" src={news.urlToImage} />
                    <Card.Body>
                      <Card.Title>{news.title} </Card.Title>
                      <Button variant="outline-primary" href={news.url}>
                        Read full article
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <div>
            {this.state.loadMore == true && (
              <div style={{ textAlign: "center" }} className="mt-3">
                <Button onClick={() => this.addData()}>Load More...</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
