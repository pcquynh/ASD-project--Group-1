import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";

const app = express();
const httpApp = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/build")));
app.use(cors());
app.use(express.json());

httpApp.set('port', process.env.PORT || 80);
httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + req.path);
});

const client = new MongoClient(process.env.MONGO_CONNECTION);

//Rebuild database with new JSON data.
app.post("/api/init/:apiKey", async (req, res) => {
  const { apiKey } = req.params;
  const triviaData = req.body;
  if (apiKey === process.env.API_KEY) {
    console.log("Initializing trivia database with JSON data.");
    try {
      await client.connect();
      const db = client.db("triviaDatabase");
      await db.collection("trivia").deleteMany({});
      await db.collection("trivia").insertMany(triviaData);
      const triviaInfo = await db.collection("trivia").find({}).toArray();
      res.status(200).json(triviaInfo);
      client.close();
    } catch (error) {
      res.sendStatus(500);
    }
  }
});

//Retrieve question data.
app.get("/api/question/:date", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("triviaDatabase");
    const questionInfo = await db
      .collection("trivia")
      .find({useDate: req.params.date})
      .project({ correctAnswer: 0 })
      .toArray();
    res.status(200).json(questionInfo);
    client.close();
  } catch (error) {
    res.sendStatus(500);
  }
});

//Check answer and send back correct/incorrect.
app.post("/api/checkanswer", async (req, res) => {
  const question = req.body.question;

  try {
    await client.connect();
    const db = client.db("triviaDatabase");
    const questionInfo = await db
      .collection("trivia")
      .findOne({ question: question });
    res.status(200).send(questionInfo.correctAnswer);
    client.close();
  } catch (error) {
    res.sendStatus(500);
  }
});

//Add one single question to the database.
app.post("/api/add", async (req, res) => {
  const question = req.body.question;
  const choiceA = req.body.choiceA;
  const choiceB = req.body.choiceB;
  const choiceC = req.body.choiceC;
  const correctAnswer = req.body.correctAnswer;
  const useDate = req.body.useDate;

  try {
    await client.connect();
    const db = client.db("triviaDatabase");
    await db.collection("trivia").insertOne({
      question: question,
      choiceA: choiceA,
      choiceB: choiceB,
      choiceC: choiceC,
      correctAnswer: correctAnswer,
      useDate: useDate
    });
    const questionInfo = await db.collection("trivia").find({}).toArray();
    res.status(200).json(questionInfo);
    client.close();
  } catch (error) {
    res.sendStatus(500);
  }
});

//Add multiple questions.
app.post("/api/addquestions", async (req, res) => {
  const triviaData = req.body;
    try {
      await client.connect();
      const db = client.db("triviaDatabase");
      await db.collection("trivia").insertMany(triviaData);
      const triviaInfo = await db.collection("trivia").find({}).toArray();
      res.status(200).json(triviaInfo);
      client.close();
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const httpServer = http.createServer(httpApp);
const httpsServer = https.createServer({
  key: fs.readFileSync('privkey1.pem'),
  cert: fs.readFileSync('fullchain1.pem'),
}, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});