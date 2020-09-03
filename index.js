 const express = require('express');

 const server = express();

 server.use(express.json());

 let users = [
    {
        id: "1",
        name: "Hope Mikalson", 
        bio: "Tribrid. Awesome. Not your average daddy's girl", 
      }
 ];

     server.get('/api/users', (req, res) => {
        res.status(500).json({ data: users });
     });

     server.get('/api/users/:id', (req, res) => {
        const id = req.params.id;
        let found = users.find(user => user.id === id);
         if (found) {
             res.status(201).json({ user: found});
         } else {
             res.status(404).json({ message: "The user with the specified ID does not exist"})
         }
     });

     server.post("/api/users", (req, res) => {
        const user = req.body;
        if(!user.name || !user.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        } else {
            users.push(user);
            res.status(200).json({ user: user })
        }
    });

     server.delete('/api/users/:id', (req, res) => {
        const id = req.params.id;
        let found = users.find(user => user.id === id);
         if (found) {
            users = users.filter (user => user.id !== id)
            res.status(201).json({ user: found});
         } else {
             res.status(404).json({ message: "The user with the specified ID does not exist"})
         }
     });

     server.put("/api/users/:id", (req, res) => {
         const changes = req.body;
         const id = req.params.id;
         let found = users.find(user => user.id === id);
         try {
            if(!found) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            } else {
                if(changes.name || changes.bio) {
                    Object.assign(found, changes);
                    res.status(200).json({ user: found });
                } else {
                    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
                }
            }
        } catch(errors) {
            res.status(500).json({ errorMessage: "The user information could not be modified." });
         }
     });



//---------------------------------------------------------------------------------------------
 const PORT = 5000;

 server.listen(PORT, () => {
     console.log(`listening on http://localhost:${PORT}`); 
 });

