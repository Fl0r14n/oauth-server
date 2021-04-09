# OAuth Server

A test oauth server

## Get just the auth-server up and running

```shell
docker-compose pull
docker-compose build be
docker-compose up be
```

init database

```shell
docker-compose run be bash
```

then paste de following

```shell
./manage.py migrate --run-syncdb
./manage.py createsuperuser
./manage.py sample_oauth
./manage.py sample_users
```

### Dev Build

```shell
pip install -r requirements.txt
```

### Dev Run

```shell
./manage.py runserver_plus 8080
```

### Import sample data

```shell
./manage.py migrate --run-syncdb
./manage.py createsuperuser
./manage.py sample_oauth
./manage.py sample_users
```

### Run backend

```shell
./manage.py runserver_plus 8080
```

### Dev Test with frontend

```shell
cd client
npm start
```

### Docker build backend

```shell
docker build -t oauth-server_be .
```

run:

```shell
docker run -d -p 8000:8000 oauth-server_be
```

## Docker-compose

To fetch and build containers

```shell
   docker-compose pull
   docker-compose build 
```

### Run with docker-compose

Start

```shell
   docker-compose up
```

Stop

```shell
   docker-compose stop
```

#### Import initial data

Make sure docker is up and running

```shell
   docker-compose run be bash
```

then if you want to reset database

```shell
    ./manage.py reset_db
```

else just initialize database and import sample data

```shell      
    ./manage.py migrate --run-syncdb
    ./manage.py createsuperuser
    ./manage.py sample_oauth
    ./manage.py sample_users
```

#### Drop database

Make sure docker is up and running

```shell
   docker-compose run be bash
```

then

```shell
   ./manage.py reset_db
```

if you just want to remove the data

```shell
   ./manage.py flush
```

#### Debug with docker

* add `import ipdb; ipdb.set_trace()` where you want to debug
* run `docker-compose build be`
* for ipdb add in be in docker-compose.yml

```
stdin_open: true
tty: true
```

* in terminal attach to be `<container_id>` which can be found with `docker container ls` then:

```
docker attach <container_id>
```
