FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update \
    && apt-get install -y postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY app .

EXPOSE 8000

CMD ["sh", "-c", "until pg_isready -h db -p 5432 -U user; do sleep 2; done && gunicorn main:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000"]

