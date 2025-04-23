FROM python:3.9

WORKDIR /app

COPY ./requirements.txt ./requirements.txt

COPY ./ ./

CMD ["fastapi", "run", "main.py", "--port", "8080"]