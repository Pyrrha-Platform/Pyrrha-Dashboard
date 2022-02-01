FROM python:3.7.7-slim

WORKDIR /app

COPY requirements.txt /app
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip \
  && pip install --upgrade pipenv \
  && apt-get update \
  && apt install -y build-essential \
  && apt install -y libmariadb3 libmariadb-dev \
  && pip install --upgrade -r /app/requirements.txt

USER 1001

COPY . /app

ENV PORT 5000

EXPOSE 5000

CMD ["flask", "run", "--host", "0.0.0.0"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f https://localhost:5000/api-main/v1/health
