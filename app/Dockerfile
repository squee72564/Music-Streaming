# Use python:3.12-slim
FROM python:3.12-slim

WORKDIR /src/app/

COPY . .

# Set environment variables for the final image
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /src/app/backend/requirements.txt

# Expose the port the app runs on
EXPOSE 8000