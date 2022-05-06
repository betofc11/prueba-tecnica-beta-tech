import express, {Application, Request, Response} from 'express';

const app: Application = express();

const PORT: number = 3000;

const users: string[] = ['John', 'Bob', 'Alice'];

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// create new user
app.get('/users', (req: Request, res: Response) => {    
    res.send(users);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
