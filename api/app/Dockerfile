# Dockerfile

# pull the official docker image
FROM python:3.10

# set work directory
WORKDIR /app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

# install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY ./mludolph /app/mludolph

CMD ["uvicorn", "mludolph.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]

# uvicorn mludolph.main:app --host 0.0.0.0 --port 8080 --proxy-headers
