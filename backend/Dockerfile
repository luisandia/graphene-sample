FROM python:3.8-alpine
LABEL description="Backend with grapheno"
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

WORKDIR '/backend'
COPY . .

RUN adduser -D user
USER user