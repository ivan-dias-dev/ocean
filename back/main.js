const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//const port =   3000;
//app.set('view engine', 'ejs');

require("dotenv").config();

//app.use(bodyParser.json())

const databaseConnection = require("./utils/db");
const meuRouter = require("./controllers/routeUser");
const rotamain = require("./controllers/rotamain");
//app.use(bootstrap)
//midlewere
app.use(express.static('views'));
app.use(express.json());
app.use("/user", meuRouter);
app.use("/", rotamain);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
