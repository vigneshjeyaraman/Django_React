We have two folders here 
1. frontend
2. shipments

Frontend will have react.js code and shipment will have django apis. And respective folders have their read me file to help you with set up.

## Backend

All backend configuration can be found inside config folder under shipment.

All Backend APIs uses custom exception it means all the error will have same format.

To run backend server install all dependencies present in requirements.txt by running

pip install -r requirements.txt

then create database by running command present in README file inside shipments.

## Unit Test

All backend unit test is written inside tests.py placed in shipments/apps/accounts.

To run unit test run below command.

python manage.py test apps.accounts.tests

## Frontend

For Frontend I have used materialize css. 