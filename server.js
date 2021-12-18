const app = require("./app");

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

//seperate app and server 
//enables listening to port after testing