import { app } from "./app";
import {AppDataSource} from "./db";

const port = 9999

AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
});
