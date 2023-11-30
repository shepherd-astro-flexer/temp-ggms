import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import {readFile} from "fs/promises"
// * local import
import Client from "./models/ClientModel.js";
import User from "./models/UserModel.js";

try {
    await mongoose.connect(process.env.MONGO_URL);

    const user = await User.findOne({email: "astroflezo@gmail.com"});

    const jsonClient = JSON.parse(await readFile(new URL("./utils/mockData.json", import.meta.url)));
    const clients = jsonClient.map(client => {
        return {...client, createdBy: user._id}
    })

    await Client.deleteMany({createdBy: user._id})
    // await Client.create(clients)

    console.log("Success!!!");
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}