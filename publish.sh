docker network create --driver bridge checkpoint || true
docker build -t checkpointapp:0.0.1 .
docker run -d -p 80:80 --network checkpoint --name checkpointapp checkpointapp:0.0.1
