import express, {Application, Request, Response} from 'express';
import routes from './routes';

const app: Application = express();

const PORT: number = 3000;

app.use(express.json());

app.use(express.urlencoded({extended: true}));


app.use("/", routes());

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
