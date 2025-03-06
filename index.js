const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const config = require('config');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/auth-routes');
const errorHandler = require('./utils/logger.js');
const swaggerDoc = require('./docs/swagger.json');

app.use(express.json());
app.use(morgan('dev'));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc));



const users = [
    { UserId: 20, Username: "NIYOBYOSE Isaac", password: "StrongPassword123!", role: "admin" },
    { UserId: 21, Username: "Byiringiro Aloys", password: "S3cur3P@ssw0rd!", role: "superuser" },
    { UserId: 22, Username: "Rukundo Divin", password: "P@ssw0rd$2025", role: "user" },
    { UserId: 23, Username: "Angello Joseph", password: "M1cH@3l_J0hn2025", role: "user" },
    { UserId: 24, Username: "Nziza Ingenzi", password: "Em1ly!Cl@rk2025", role: "user" },
    { UserId: 25, Username: "Mugande Ornella", password: "A1exBr0wn!2025", role: "user" },
    { UserId: 26, Username: "Gatete Man", password: "D@ni3lM!ll3r@2025", role: "user" },
    { UserId: 27, Username: "Sophia Ange", password: "Soph!@D@v1s2025", role: "user" }
];
// configuration of login endpoint

app.post("/api/login",(req,res,next)=> {
    const { username, password }= req.body;
    const user = users.find(u=>u.username === username && u.password=== password) {
        if(!user) {
            const err = new Error("Invalid Username or Password");
            err.status = 401;
            return next(err);
        }
        const token = `${user.role}-${user.UserId}-${config.get("secret")}`;
        debug(`User ${username} logged in with role ${user.role}`);
        res.json({ token });       
    }
});
// Routes 

app.use("/api/courses",courseRoutes);


// Error-handling middleware

app.use((err,req,res,next)=> {
    const status = err.status || 500; // internal server problem
    const message = err.message || "Internal server problem";
    debug(`Error [${status}]:${message}`);
    res.status(status).json({
        status:"error",
        code: status,
        message,
        ...(process.env.NODE_ENV === "development" && { stack:err.stack}),
    });
});


// Start server

const port = config.get('port') || 3000;
app.listen(port, () => {
 debug(`${config.get('appName')} running on port ${port}`);
 console.log(`Server listening on http://localhost:${port}`);
 console.log(`API Docs available at http://localhost:${port}/api-docs`);
});