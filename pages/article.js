import {withRouter} from 'next/router'
import fetch from "isomorphic-unfetch";

const apiKey = `4595dd0633db4f6c891b62ee796644f1`;
const defaultNewsSource = "the-irish-times";

async function getNews(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
}

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let id = 0; //If this number is changed to 1 then article 1 would display on all pages//
    let article = this.props.articles[id];

    return (
      <div>
        <h3>{defaultNewsSource.split("-").join(" ")}</h3>
        <div>
          <section>
          <p><h3>Title: </h3>{article.title}</p>
          <p><h3>Author: </h3>{article.author}</p>
          <p><h3>Published At: </h3>{article.publishedAt}</p>
          <p><img src={article.urlToImage} alt="article image" className="img-article"></img></p>
          <p>{article.section}</p>
          <p>{article.content}</p>
          </section>
        </div>

        <style jsx>{`
          section {
           width: 80%;
           font-family: "Playfair Display", times, serif;
           border: 0.25em solid grey;
           background-color: rgba(204, 255, 204, 0.25);
           margin: 1em;
           padding-left: 2em;
           padding-right: 7.5em;
           text-align: center;
           display: inline-table;
          }

          .author{
            font-family: "Playfair Display", times, serif;
            font-size: 1em;
            text-transform: uppercase;
          }

          .img-article{
            border: 0.25em solid #4d4e4f;
            z-index: 99;
            max-width: 50%;
            align: center;
            display: inline-table;
          }
        `}</style>
      </div>
    );
  }

  static async getInitialProps(res) { 
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;
    const data = await getNews(defaultUrl);

    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }

    else {
      console.error(data);
      if (res) {
        res.statusCode = 400;
        res.end(data.message);
      }
    }
  }
} 

export default withRouter(Article)