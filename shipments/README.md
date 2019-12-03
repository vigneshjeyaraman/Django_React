Shipments
=========

## Virtual Envirnoment and requirements

    virtualenv -p /path/to/python3.7 venv
    source venv/bin/activate
    pip install -r requirements.txt

## Postgres setup

    pip install psycopg2
    sudo su - postgres
    psql -d template1 -U postgres
    CREATE USER your-username WITH PASSWORD your-password;
    ALTER USER your-username WITH SUPERUSER;
    CREATE DATABASE db_name;
    ALTER ROLE your-username SET client_encoding TO 'utf8';
    ALTER ROLE your-username SET default_transaction_isolation TO 'read committed';
    ALTER ROLE your-username SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE db_name TO your-username;
    \q
    psql -d mu_db -U your-username


## run migrations
   
   python manage.py migrate

## Load fixtures

   python manage.py loaddata fixtures/*.json

## Running Development Server

    python manage.py runserver

**Note:** Never forget to enable virtual environment (`source venv/bin/activate`) before running above command and use settings accordingly.


