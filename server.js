import express from "express"

const app = express();

import cors from "cors";

import morgan from "morgan"

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("tiny"));

app.get("/", function(req,res) {
    res.send("Hello There");
});

app.listen(PORT, error =>{
    if (error) console.log(erro)

    console.log(`Server is running at http://localhost:${PORT}`)
})