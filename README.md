# DataBase Graphic User Interface

After pulling the document do the following items to have project run:

   1. Open command-line/terminal in the project directory
   2. Make sure to have `NodeJS` installed.
   3. Type `npm i ` to install all the necessary packages.
   4. Change directory to server using `cd server` command.
   5. Run the project on `localhost:8080` using `nodemon server` command.

**Dear Mehrdad:** You can configure the postgress database by the question asked in [stackoverflow](https://stackoverflow.com/questions/9205496/how-to-make-connection-to-postgres-via-node-js) or [youtube](https://www.google.com/search?q=pg+config+nodejs&source=lnms&tbm=vid&sa=X&ved=0ahUKEwjq_9a52YvgAhUFd98KHbtzDpgQ_AUIDygC). The next thing you need to know is that the text from user-search in the home-page (index.html) is accessable in the `server.js ` file with `req.query.#name`. As an example I can refer to:

```javascript
app.get('/product', (req, res) => {
    res.send(req.query.product)
})
```

> Here you can access to user search using req.query.product :)


Congratulations, now we've got the extra marks.
