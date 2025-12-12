// Ang corsOptions na ito ay para payagan lang ang mga request galing sa allowedOrigins na maka-access ng API
const allowedOrigins = require('./allowed-origin'); 

const corsOptions = {
    origin: (origin, callback) => {
        // Allow if origin is in allowedOrigins or no origin (Postman/ThunderClient)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { 
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
