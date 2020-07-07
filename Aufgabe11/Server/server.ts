import * as Http from "http";
import * as Url from "url";
import { ParsedUrlQuery } from "querystring";
import { A11Database } from "./database";

export namespace A11Server {

  export interface Feedback {
    name: string;
    freetext: string;
    rating: number;
  }

  startServer();
  async function startServer(): Promise<void> {
    console.log("Starting server");
    //DB Connection
    console.log("Connecting to DB...");
    await A11Database.connectToDB("mongodb+srv://user:fBag3TZ4wiw6yRiq@cluster0-omyol.mongodb.net/dbname?retryWrites=true&w=majority");

    let port: number = Number(process.env.PORT);
    if (!port)
      port = 8100;
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
  }

  function handleListen(): void {
    console.log("Listening");
  }

  async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    let urlWithQuery: Url.UrlWithParsedQuery = Url.parse(_request.url!, true);
    _response.setHeader("Access-Control-Allow-Origin", "*");

    switch (urlWithQuery.pathname) {
      case "/html":
        createHtmlResponse(_response, urlWithQuery.query);
        break;
      case "/json":
        createJSONResponse(_response, urlWithQuery.query);
        break;
      case "/insert":
        DbJsonResponse(_response, await A11Database.insert(urlWithQuery.query));
        break;
      case "/removeOne":
        DbJsonResponse(_response, await A11Database.removeOne(urlWithQuery.query));
        break;
      case "/read":
        DbJsonResponse(_response, await A11Database.findAll());
        break;
      default:
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.write(_request.url);
    }
    _response.end();
  }

  function createHtmlResponse(_response: Http.ServerResponse, _query: ParsedUrlQuery): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let resultHTML: string = "";
    for (let q in _query) {
      resultHTML += `<p>${q}: ${_query[q]}</p>`;
    }
    _response.write(resultHTML);
  }
  function createJSONResponse(_response: Http.ServerResponse, _query: ParsedUrlQuery): void {
    _response.setHeader("content-type", "application/json");
    let jsonString: string = JSON.stringify(_query);
    _response.write(jsonString);
  }

  // tslint:disable-next-line: no-any
  function DbJsonResponse(_response: Http.ServerResponse, _result: any): void {
    _response.setHeader("content-type", "application/json");
    _response.write(JSON.stringify(_result));
  }
}