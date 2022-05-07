import express, {Application} from 'express';
import routes from './routes';

// Creamos una instancia de express
const app: Application = express();

// Asignamos un nomero de puerto
const PORT: number = 3000;

// Habilitamos que se pueda usar json en las peticiones de req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Asignamos las rutas
app.use("/", routes());

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
