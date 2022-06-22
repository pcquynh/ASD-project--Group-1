import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/build")));
app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://localhost:27017");

//Rebuild database with new JSON data.
//Working. Data entered must be correct, no error checking currently.
app.post("/api/init/:apiKey", async (req, res) => {
  const { apiKey } = req.params;
  const triviaData = req.body;
  if (apiKey === "5f767fa2-1f5a-4e45-ba11-4d7001a6744e") {
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
//Working. No error checking.
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8000, () => console.log("Listening on port 8000."));

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/speedtriv.ca/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/speedtriv.ca/fullchain.pem'),
// }, app);

// httpServer.listen(80, () => {
//     console.log('HTTP Server running on port 80');
// });

// httpsServer.listen(443, () => {
//     console.log('HTTPS Server running on port 443');
// });