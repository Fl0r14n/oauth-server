FROM python:3-slim
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE 1
WORKDIR /usr/src/app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
ADD api ./api
ADD oauth ./oauth
ADD oauthserver ./oauthserver
COPY manage.py .
COPY oidc.key .
EXPOSE 8080
RUN ["python", "manage.py", "collectstatic", "--no-input"]
CMD ["gunicorn"  , "-w", "3", "-b", "0.0.0.0:8080", "oauthserver.wsgi:application"]
