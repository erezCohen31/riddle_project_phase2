import { connectMongoDB, client } from "../DB/connectMongo.js";
const db = client.db('game_riddle');
const collection = db.collection('riddles');

const RiddleDal = {

    async addRiddle(riddle) {
        try {
            await connectMongoDB(async (client) => {

                const result = await collection.insertOne(riddle);

                if (result.acknowledged) {
                    console.log('✅ Riddle added with ID:', result.insertedId);
                } else {
                    throw new Error('❌ Failed to insert riddle. Acknowledgement failed.');
                }
            });
        } catch (error) {
            console.error('❌ Error occurred during riddle insertion:', error);
            throw error;
        }
    },
    async countRiddles() {
        try {
            let count = 0;
            await connectMongoDB(async () => {
                count = await collection.countDocuments();
            });
            console.log(`📊 Total riddles: ${count}`);
            return count;
        } catch (error) {
            console.error('❌ Failed to count riddles:', error);
            throw error;
        }
    },
    async deleteRiddleById(currentid) {
        try {
            await connectMongoDB(async () => {

                const result = await collection.deleteOne({ id: currentid });

                if (result.deletedCount === 1) {
                    console.log(`🗑️ Riddle with ID ${currentid} successfully deleted.`);
                } else {
                    console.warn(`⚠️ No riddle found with ID ${currentid}.`);
                }
            });
        } catch (error) {
            console.error('❌ Error deleting riddle:', error);
            throw error;
        }
    },
    async getRiddleById(currentid) {
        try {
            let riddle = null;

            await connectMongoDB(async () => {

                riddle = await collection.findOne({ id: currentid });
            });

            if (riddle) {
                console.log(`🔍 Riddle found:`, riddle);
            } else {
                console.warn(`⚠️ No riddle found with ID ${id}`);
            }

            return riddle;
        } catch (error) {
            console.error('❌ Error fetching riddle:', error.message);
            throw error;
        }
    }, async getAllRiddles() {
        try {
            let riddles = [];

            await connectMongoDB(async () => {
                riddles = await collection.find({}).toArray();
            });

            console.log(` Retrieved ${riddles.length} riddles.`);
            return riddles;
        } catch (error) {
            console.error(' Error fetching riddles:', error.message);
            throw error;
        }
    },
    async getNumRiddles(count) {
        try {
            let riddles = [];

            await connectMongoDB(async () => {
                riddles = await collection.aggregate([
                    { $sample: { size: count } }
                ]).toArray()
            });

            console.log(` Retrieved ${riddles.length} riddles.`);
            return riddles;
        } catch (error) {
            console.error(' Error fetching riddles:', error.message);
            throw error;
        }
    },
    async updateRiddle(currentId, updatedFields) {
        try {
            let updatedRiddle = null;

            await connectMongoDB(async () => {
                const result = await collection.findOneAndUpdate(
                    { id: currentId },
                    { $set: updatedFields },
                    { returnDocument: "after" }
                );

                updatedRiddle = result;
            });

            if (!updatedRiddle) {
                console.warn(`No riddle found with ID ${currentId} to update.`);
                return null;
            }

            console.log(`Riddle with ID ${currentId} updated successfully.`);
            return updatedRiddle;
        } catch (error) {
            console.error('Error updating riddle:', error.message);
            throw error;
        }
    }

}

export default RiddleDal
















