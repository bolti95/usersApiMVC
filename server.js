require('dotenv').config();
const app = require("./app");
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

//seperate app and server 
//enables listening to port after testing