FROM python:3.12-slim-trixie

RUN apt-get update && apt-get install -y \
  build-essential \
  gcc \
  pkg-config \
  python3-dev \
  libmariadb3 \
  libmariadb-dev \
  libmariadb-dev-compat \
  curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip \
  && pip install --upgrade pipenv \
  && pip install --upgrade -r /app/requirements.txt

USER 1001

COPY . /app

ENV PORT=5000

EXPOSE 5000

CMD ["flask", "run", "--host", "0.0.0.0"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:5000/api-main/v1/health || exit 1
