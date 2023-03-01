# phot-gallery-app

A simple photo gallery app as part of an assignment for Aidar Health. Backend uses: ``node js`` with ``express`` and ``mongo atlas db`` along with ``mongoose`` for ODM. Frontend is built with ``react`` and ``materials-ui``. Both of them are strongly typed using ``typescript``.

## How to run the backend server

- ``cd server``
- Make sure there is no ``package-lock.json`` in there
- Run ``npm install`` to install all the required dependencies
- Run ``npm start`` to start the backend server
- ``connected successfully`` message on the console means the backend is successfully connected to the db

## How to run the client

- ``cd client``
- Make sure there is no ``package-lock.json`` in there
- Run ``npm install --force`` the force flag is used to overwrite some legacy dependency issue with mui
- Run ``npm start`` to start the client server
- Go to ``http://localhost:3000`` to acess the client!
