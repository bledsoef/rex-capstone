if [ ! -d venv ]
then
  python3 -m venv venv
fi
. venv/bin/activate

echo "upgrade pip"
/usr/bin/python3 -m pip install --upgrade pip #added python-m for pip installs (source setup overwrite for venv)

echo "install requirements"
/usr/bin/python3 -m pip install -r requirements.txt
# To generate a new requirements.txt file, run "pip freeze > requirements.txt"

echo "-----Setting $(pwd) as your PYTHONPATH. If this is not root cd into your root directory and rerun this script."
current_directory=$(pwd)
export PYTHONPATH="$current_directory"