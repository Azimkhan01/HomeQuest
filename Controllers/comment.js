// const { Server } = require("socket.io");

// const commentSocket = (server) => {
//     const io = new Server(server);

//     io.on("connection", (socket) => {
//         console.log(`A user connected: ${socket.id}`);

//         // Example of handling a custom event
//         socket.on("comment", (data) => {
//             console.log("Comment received:", data);
//             // Broadcast comment to all clients
//             io.emit("newComment", data);
//         });
// // Server-side (commentSocket.js)
// io.on("connection", (socket) => {
//     console.log(`A user connected: ${socket.id}`);
    
//     socket.on("disconnect", (reason) => {
//         console.log(`A user disconnected: ${socket.id}. Reason: ${reason}`);
//     });
// });

        
//     });
// };

// module.exports = { commentSocket };
