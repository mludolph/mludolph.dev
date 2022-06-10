#!/usr/bin/env bash
REGISTRY=cr.mludolph.dev
PROJECT=mludolph-ui

if [ $# -eq 0 ]
  then
    VERSION='latest'
  else
    VERSION=$1
fi
TAG=$REGISTRY/$PROJECT:$VERSION

cd ../app && yarn install && yarn generate

docker build -t $TAG ../app
docker push $TAG
