#!/usr/bin/env bash
REGISTRY=cr.mludolph.dev
# PROJECT_INFO=$(poetry version)
PROJECT=mludolph-ui
VERSION=0.1.4

TAG_VERSION=$REGISTRY/$PROJECT:$VERSION
TAG_LATEST=$REGISTRY/$PROJECT:latest

echo "Building docker image '${TAG_VERSION}'..."
docker build -t $TAG_VERSION -t $TAG_LATEST -f app/Dockerfile ./app
echo "Done!"%