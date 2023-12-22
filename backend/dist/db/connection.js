import { connect, disconnect } from 'mongoose';
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        throw new Error("Failed to connect to MongoDB", error);
    }
}
;
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log('Connection Failure', error);
        throw new Error("Failed to disconnect from MongoDB", error);
    }
}
export { connectToDatabase, disconnectFromDatabase, };
//# sourceMappingURL=connection.js.map