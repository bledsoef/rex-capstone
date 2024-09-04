echo "-----MAKE SURE YOU ARE IN THE ROOT DIRECTORY AND RUNNING THIS SCRIPT WITH ./database/reset_database.sh \n"

echo "Dropping databases"
psql -U postgres -c "DROP DATABASE IF EXISTS rex;"

echo "Recreating databases and users"
psql -U postgres -c "CREATE DATABASE rex;"

# python3 ./database/reset_database.py