# Shooter Recipes

The app is used to store your shooter recipes
You can either create, delete recipes and ingredients

# Installation

A vhost is available with passwd basic auth if you use Apache for reverse proxy
```
vhost-apache.conf
```

You will need to edit "yourdomain" for your personnal domain name for the app to work (mainly for the backend)

Just start the docker-compose
```
docker-compose up --build -d
```
The ports used are the following :
- 5000:5000 for the backend
- 3000:3000 for the frontend