# OAuth Server

A test oauth server

### Build

```shell
pip install -r requirements.txt
```

### Run

```shell
./manage.py runserver_plus
```

### Import sample data

```shell
./manage.py migrate --run-syncdb
./manage.py createsuperuser
./manage.py sample_oauth
./manage.py sample_users
./manage.py runserver_plus
```
