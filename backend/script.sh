#python api/manage.py collectstatic --no-input --clear
python api/manage.py makemigrations
python api/manage.py migrate
python api/manage.py runserver 0.0.0.0:8000
# python -m ptvsd --host 0.0.0.0 --port 5678 --wait --multiprocess api/manage.py runserver --noreload --nothreading 0.0.0.0:8000
# python -m ptvsd --host 0.0.0.0 --port 5678 --wait --multiprocess api/manage.py runserver  0.0.0.0:8000