import express from 'express'; 
import indexRouter from "./routes/indexRouter.js"
import path from "node:path"
const app = express();

process.loadEnvFile();
const __dirname = path.resolve()
app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

app.use("/",indexRouter)




app.use((err,req,res,next) => {
    
    res.status(500).send({error: err.message})
    
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
