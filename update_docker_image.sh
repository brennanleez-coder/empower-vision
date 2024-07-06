#!/bin/bash


git pull origin main

docker build -t empower-vision .


docker tag empower-vision brennanlee/empower-vision:latest

docker push brennanlee/empower-vision:latest

echo "Docker image updated and pushed to Docker Hub successfully."
