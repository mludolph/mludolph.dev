#!/usr/bin/env bash
REGISTRY=cr.mludolph.dev
# PROJECT_INFO=$(poetry version)
PROJECT=mludolph-api
VERSION=0.1

TAG_VERSION=$REGISTRY/$PROJECT:$VERSION
TAG_LATEST=$REGISTRY/$PROJECT:latest

echo "Building docker image '${TAG_VERSION}'..."
docker build -t $TAG_VERSION -t $TAG_LATEST -f docker/Dockerfile .
echo "Done!"%