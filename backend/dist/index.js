import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// Connection & listeners
const port = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log('Server is up and running & connected to MongoDB');
    });
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map