# ChurchScheduler
A scheduler for people of the congregation to schedule time with Abouna.

Contributors:
Youssef Boshra-Riad
Nardine Eshak

To set up:
`npm install` to download the dependancies (should create a dir called 'node_modules')


## Running PostgreSQL with Docker

1. Ensure you have Docker installed.
2. Run the following command to start PostgreSQL:

```bash
docker-compose up -d


Make sure your PostgreSQL container is running:
docker ps

Access PostgreSQL database, use the following command:
psql -h localhost -U shareduser -d cap_db


If the PostgreSQL instance is not mapped to your host, or if you want to access it directly from inside the container, you can use docker exec to run the psql command inside the container
docker exec -it my_postgres_db psql -U shareduser -d cap_db


When done, you can stop the container with:
docker-compose down
