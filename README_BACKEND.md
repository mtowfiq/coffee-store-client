1. Backend and Database Integrate-

- What is server? A server can be thought of as the inside of a kitchen where the chef cooks and prepares the meal, and serves or relays it to the waiter. API is the waiter who serves the food (data) to the customer (the client).

- A server has to be open 24/7. It's like a special computer. Definition- It is a piece of computer that provides a functionality or service to another computer (or otherwise known as clients).

- High level understanding- A client (user) requests info from the server, and the server gets information from database, and returns it to the client.

- REST API - REST clients requests and REST server responses (response in XML/JSON format) through API. 4 operations-
  GET- brings data
  POST- keeps data
  PUT- Updates or if not available, adds the data
  DELETE- Deletes data

- NodeJS is a server side JS runtime. It is asynchronous single-threaded.

- Express is a node js web application framework. Built on NodeJS. It makes the use of NodeJs easier (or less lines of code needed and more readable perhaps).

- Database is a structured container where data is stored. DBMS is a software used to manage or interact with the database.

- In SQL database (rigid), there are tables which are connected to each other (also known as relational database).

-NoSQL database (flexible structure) are non-tabular databases. MongoDB is NoSQL.

- When we create a project, in the package.json file, we need to add the start key-value pair-

"scripts": {
"start": "node index.js",
"test": "echo \"Error: no test specified\" && exit 1"
},

- We dont just write hard-wired code like const port = 5000, we instead use-
  const port = process.env.PORT || 5000

This is because when we deploy our app (for example, to platforms like Render, Vercel, or Heroku), the hosting service usually assigns a port automatically using process.env.PORT.

If we hardcode 5000, the app might not run properly in production. So process.env.PORT makes sure the app works both locally (with 5000) and in production (with whatever port the server provides).

Process of sending data from client side to the server-

1. Create a post api on the server side-

// Create a post API on the server side
app.post('/users', (req, res) =>{
console.log("post api hitting")
console.log(req.body)
})

2. From client side- send data via post-
   The fetch method, will have a second parameter which is an object and have 3 keys- method, headers, and body

const handleAddUser = (e) =>{
e.preventDefault()
const form = e.target
const name = e.target.name.value
const email = e.target.email.value

    const user = {
      name,
      email
    }
    console.log(user)
    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => console.log('inside post response',data))

}

3. On the server side, dont forget to use the middleware, otherwise req.body wont work-

app.use(express.json())

- To send data from the server to the database- refer the following doc (search node mongodb crud)-https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

-Code:

const uri = "mongodb+srv://mohammedthawfiq00:33Ndp1IxConpgchJ@cluster0.znibvl5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
serverApi: {
version: ServerApiVersion.v1,
strict: true,
deprecationErrors: true,
}
});

async function run() {
try {
// Connect the client to the server (optional starting in v4.7)
await client.connect();

    const database = client.db("usersDB")
    const usersCollection = database.collection("users")

    // To get the users from the server
    app.get("/users", async(req, res) =>{
      const cursor = usersCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // To add data to the server and then insert into mongodb
    app.post("/users", async(req, res) =>{
      const user = req.body
      console.log("New user", user)
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

} finally {
// Ensures that the client will close when you finish/error
// await client.close();
}
}
run().catch(console.dir);

<!-- STEPS

---------------
MongoDB connection-

1. create acc and related work
2. database > connect > driver > Node > view full code
3. Change the password in the uri (copied from full code)

--------------------

1. CREATE or post
**SERVER SIDE-

- app.post('/users', async (req, res) => {})
- make the functions inside the post api async to use await inside it.
- make sure you use the express.json() middleware
- access data from the body. const user = req.body
- const result = await usersCollection.insertOne(user);
- res.send(result)

**CLIENT SIDE-
fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.inertedId){
        alert("User added")
        form.reset()
      }
    })
  }


--------------------------
2. READ or GET (MANY)
**SERVER SIDE-

app.get("/users", async(req, res) =>{
      const cursor = usersCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

**CLIENT SIDE-

Just normally use the loader function in the routes or just fetch it normally in components.

{
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch("http://localhost:5000/users")
  },


--------------------------
3. DELETE (one)
**SERVER SIDE-

app.delete("/users/:id", async (req, res) =>{
      const id = req.params.id
      console.log("please delete from database", id)
      const query = {_id : new ObjectId(id)}
      const result = await usersCollection.deleteOne(query)
      res.send(result)
    })

**CLIENT SIDE-

Get the dynamic id and do the following-


const loadedUsers = useLoaderData()
const [users, setUsers] = useState(loadedUsers)


const handleDelete = (_id) =>{
        console.log("delete", _id)
        fetch(`http://localhost:5000/users/${_id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                alert("Deleted successfully")
                const remainingUsers = users.filter(user => user._id !== _id)
                setUsers(remainingUsers)
            }
        })
    }



--------------------------
4. UPDATE (one)
PUT = Replace everything

PATCH = Change only what’s sent

It's a good practice to use defaultValue in the inputs when updating in the form.

**SERVER SIDE-
To update a specific user, we need that specific user's api from the server, so we need to get that first. We do that simply by using app.get(), and then in the client side we simply load it using the loader function while setting routes-

// To get specific user for updating (based on the id)
    app.get('/users/:id', async(req, res) =>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const user = await usersCollection.findOne(query)
      res.send(user)
    })

// To add data to the server and then insert into mongodb
    app.post("/users", async(req, res) =>{
      const user = req.body
      console.log("New user", user)
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })



**Client SIDE-

fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                alert("Updated Successfully")
            }
        })


 -->


- Naming conventions of the endpoints (routes in the apis)-

Use plurals and nouns (not verbs), and if more than 1 word, use hyphen

GET- (/photos) for all documents
   - (/photos/:id) for one specific document

POST - (/photos)

PUT - (/photos/:id)

DELETE - (/photos/:id)