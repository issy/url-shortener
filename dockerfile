FROM python:3.8
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--log-file=-", "--workers=3", "--threads=4", "wsgi:app"]