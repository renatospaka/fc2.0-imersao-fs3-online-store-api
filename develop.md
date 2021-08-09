sudo chmod +x .docker/entrypoint.sh

##Postgres
sudo chmod +xrw -R .docker/postgres
sudo chown -R 5050:5050 .docker/postgres/pgadmin
