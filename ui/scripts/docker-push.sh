#!/usr/bin/env bash
REGISTRY=cr.mludolph.dev
# PROJECT_INFO=$(poetry version)
PROJECT=mludolph-ui
VERSION=0.1.3

TAG_VERSION=$REGISTRY/$PROJECT:$VERSION
TAG_LATEST=$REGISTRY/$PROJECT:latest

echo "Pushing docker image to '${TAG_VERSION}' and '{$TAG_LATEST}'..."
docker push $TAG_VERSION
docker push $TAG_LATEST
echo "Done!"%