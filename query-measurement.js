const mongoose = require('mongoose');
const Status = require("./models/statusiModel");

// Function to measure the time to retrieve all documents
async function measureQueryTime() {
  try {
    const startTime = performance.now();
    const statusData = await Status.find({});
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log("Query execution time: " + executionTime + " ms");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

measureQueryTime();
