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
- Go to ``http://localhost:3000/`` to acess the client!

## How to use the app

- First off, the app is using a free-tier mongo atlas cloud db and multer for uploading and retrieving images. This means the upload and retrieval speeds are pretty slow(30s - 40s).
- Once you've started both the ``server`` and ``client``; go to ``http://localhost:3000/`` to access the homepage. Wait a couple of seconds for the files to load, this is what it should look like:

<img width="738" alt="image" src="https://user-images.githubusercontent.com/20667665/222244373-ca01850a-5997-43a6-a109-81f431ff9d22.png">

- Click on any image to view it in fullscreen

<img width="736" alt="image" src="https://user-images.githubusercontent.com/20667665/222245089-1f232561-42bb-419c-9550-d049238d78f1.png">

- In this view, on the left hand side, you have 3 options: ``close, info and delete``
- ``close`` will take you back to the gallery
- ``delete`` will delete the piece of art
- ``info`` will take you to another screen with art details

<img width="1470" alt="image" src="https://user-images.githubusercontent.com/20667665/222245183-d2e92fe5-ea4c-4e73-8ce7-42c1e6051b6c.png">

- Click on ``close`` again to go back

- To upload a art piece, go to the homepage, click on ``Choose File`` to select a art piece(remember to only image uploads is allowed, anything else will throw an error); enter the ``Art Name``(required), ``Artist``(optional), ``Buyer``(optional) and hit ``Upload`` to upload the art.
- Note, it will take 30s - 50s for the art to upload, persist on the cloud db and render back to the gallery.
