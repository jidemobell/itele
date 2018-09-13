# Itele

### Installation

Itele requires [Node.js](https://nodejs.org/) v4+ to run.

Itele runs on a [Postgresql](https://www.postgresql.org/) database. All database connection configuration should be kept secured in a user defined file(preferable a .env).

Install the dependencies and devDependencies and start the server.

```sh
$ cd Itele
$ npm install 
$ node run dev
```

For production environments...

```sh
$ npm install 
$ npm start
```

Test...
The app uses mocha/chai for testing
```sh
$ npm test
```

### Docker
Itele containsd a docker file that will expose port 4000. This can be changed to user preferred port. Simply use the Dockerfile to build the image.

### Using Itele

* [Itele API Documentation](https://jidemobell.github.io/itele)

## Built With

* [Express](http://expressjs.com)
* [pg](https://node-postgres.com)
* [mocha](https://mochajs.org)


## Author
* **Jide Olaniyan** 


