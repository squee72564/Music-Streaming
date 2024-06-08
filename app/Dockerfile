# Use python:3.12-slim
FROM python:3.12-slim

# Copy everything to image
WORKDIR /src/app/
COPY . .

# Set environment variables for the final image
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Update system dependencies
RUN apt-get update && apt-get install -y netcat-traditional

# Install python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /src/app/backend/requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /src/app/entrypoint.sh
RUN chmod +x /src/app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 8000

ENTRYPOINT ["/src/app/entrypoint.sh"]