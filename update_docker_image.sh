#!/bin/bash


git pull origin main

docker build --no-cache -t empower-vision-frontend .


docker tag empower-vision-frontend brennanlee/empower-vision-frontend:latest

docker push brennanlee/empower-vision-frontend:latest

echo "Docker image updated and pushed to Docker Hub successfully."
