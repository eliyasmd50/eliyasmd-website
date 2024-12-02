const {MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

class ConnectDB  {
    constructor () {
        this.db = client.db('mongodb_crud');
        this.collection = this.db.collection('users');
    }

    async createUser (document) {
        try {
            await client.connect();
            console.log("Db connected successfully for create User");
            const result = await this.collection.insertOne(document);
            return result;
        } catch (error) {
            console.log(`Error while creating user: ${error.message}`);
        } finally {
            await client.close();
        }
    }

    async checkDuplicateUser (document) {
        try {
            await client.connect();
            console.log("Db connected successfully for Duplicates");
            const result = await this.collection.find(document).toArray();
            console.log(result);
            return result;
        } catch (error) {
            console.log(error.message);
        } finally {
            await client.close();
        }
    }
    

    async getAllUsers () {
        try {
            await client.connect();
            console.log("Db connected successfully");
            const result = await this.collection.find({}).toArray();
            return result;
        } catch (error) {
            console.log(error.message);
        } finally {
            await client.close();
        }
    }

    async updateUser () {
        try {
            await client.connect();
            console.log("Db connected successfully");
            const result = await collection.insertOne(this.document);
            return result;
        } catch (error) {
            console.log(error.message);
        } finally {
            await client.close();
        }
    }

    async deleteUser () {
        try {
            await client.connect();
            console.log("Db connected successfully");
            const result = await collection.insertOne(this.document);
            return result;
        } catch (error) {
            console.log(error.message);
        } finally {
            await client.close();
        }
    }

    async loginUser (query) {
        try {
            await client.connect();
            console.log("Db connected successfully for loginUser");
            const result = await this.collection.find(query).toArray();
            return result;
        } catch (error) {
            console.log(error.message);
        } finally {
            await client.close();
        }
    }
}

module.exports = ConnectDB;