import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';


const apiKey = '4595dd0633db4f6c891b62ee796644f1';

// Initial News source
const defaultNewsSource = 'the-irish-times';

async function getNews(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return (data);
  } catch (error) {
    return (error);
  }
}

export default class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }

  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
    })
  }

  searchNewsAPI = (event) => {
    this.setState({
      newsSource: `${event.target.innerText}`,
      url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
    })
    console.log(this.state.url);
  }

  render() {
    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }
    return (
      <div>
        <SearchForm setNewsSource={this.setNewsSource} />
        <ul className="newsMenu">
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=kr">Breaking News Korea</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=us&category=business">Apple Stock Market Price</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=weather">Weather in Ireland</a></li>
        </ul>
        
      
        <h3>{this.state.newsSource.split("-").join(" ")}</h3>
        <div>
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author"><h3>Author: </h3>{article.author} <h3>Time&Date: </h3> {article.publishedAt}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <button>
              <p><Link as={`/article/${index}`} href={`/article?id=${index}`}><a>Read More</a></Link></p>
              </button>
            </section>
          ))}
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

          .newsMenu{
            width: 100%;
            Display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
            margin-top: 20px;
          }
          .newsMenu li{
            display: inline-table;
            padding-left: 20px;
            padding-right: 40px;
            align: center;
           
          }
          .newsMenu li a{
            font-size: 1em;
            color: #4d4e4f;
            display: block;
            text-decoration: bold;
          }
          .newsMenu li a:hover{
            color: black;
            background-color: #ffb4c8;
            text-decoration: underline;
          }

          button{
            border: 0.2em;
            border-style: solid;
            font-family: verdana;
            font-size: 15px;
            font-weight: bold;
            padding: 0.5em;
            margin-bottom: 0.5em;
            text-align: center;
            background-color: #f3f4f6;
            color: #689eb8;
            cursor: pointer;
          }
          
          button:hover{
            background-color: #f4aa42;
            transition: all ease-out 0.3s;
            color: #f4aa42;
          }
          `}</style>
      </div>
    );
  }

  static async getInitialProps(response) {
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;
    const data = await getNews(defaultUrl);

    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url) {
      const data = await getNews(this.state.url);

      if (Array.isArray(data.articles)) {
        this.state.articles = data.articles;
        this.setState(this.state);
      }
      else {
        console.error(data)
        if (response) {
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }
  }



}


