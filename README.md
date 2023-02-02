# Minimum Viable Auth Setup for PERN Stack

***

## Steps for local deploy

In client directory:

1. `npm install`
2. Add and populate `.env` at client root with appropriate values to 
connect to REST API
3. `npm run dev` to launch vite

In server directory

1. `npm install`
2. Add and populate `.env` at server root to connect to database and 
specify where the server should listen
3. `npm run dev` to launch development server with nodemon

***

## Steps to extend

The following middleware (taken from `server/routes/index.js`) can be used anywhere user verification is needed:

```
app.use('/app', (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) {
            res.status(403).send(err);
        } else {
            req.user = data;
            next();
        }
    })
})
```

Additional passport strategies may also be included for auth workflows such as OAuth 2.0
