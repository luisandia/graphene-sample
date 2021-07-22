FROM python:3.9-slim-buster
LABEL Luis Andia

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pip install gunicorn

RUN mkdir /backend
WORKDIR /backend
COPY ./api /backend
RUN python manage.py migrate

RUN python manage.py collectstatic --no-input --clear
# RUN python /backend/api/manage.py collectstatic --no-input --clear
# RUN python /backend/api/manage.py collectstatic --no-input --clear
RUN echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.count() == 0 and User.objects.create_superuser('admin', 'admin@myproject.com', 'password')" | python manage.py shell
CMD gunicorn app.wsgi:application --workers=2 --bind 0.0.0.0:8000 --chdir ./api

RUN useradd -ms /bin/bash user
USER user