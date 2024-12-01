const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port  = process.env.PORT || 5000
const app = express()


// Middle ware 
app.use(express.json())
app.use(cors())

// MongoDB pass and username
// iZKzdfDoMaliElwa
// coffeeMaster


// MongoDB Code Start


const uri =
  "mongodb+srv://coffeeMaster:iZKzdfDoMaliElwa@cluster0.t47d6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Connect to the "CoffeesDB" database and access its "haiku" collection
    const CoffeesDB = client.db("CoffeeMaster");
    const coffeesData = CoffeesDB.collection("coffeesData");

      //   Get Coffees Data
      app.get('/coffees', async (req, res) => {
          const coffeeData = coffeesData.find()
          const result = await coffeeData.toArray()
          res.send(result)
      })
      
      
      
    // Create Coffee Data
    app.post("/addcoffeedetail", async (req, res) => {
      const coffeeData = req.body;
        // console.log(coffeeData);
        const result = await coffeesData.insertOne(coffeeData);
        res.send(result)
    });
      
      
      //   Delete Coffee Data
      app.delete("/coffees/:id", async (req, res) => {
        const id = req.params.id;
        const dltCoffee = { _id: new ObjectId(id) };
        const result = coffeesData.deleteOne(dltCoffee);
        res.send(result);
      });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// MongoDB Code End



// Default Code
app.get('/', (req, res) => {
    res.send("CoffeeMaster server is ready")
})
app.listen(port, () => {
    console.log(`Coffe master server is running on port ${port}`);
})