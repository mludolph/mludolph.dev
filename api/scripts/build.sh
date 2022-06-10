#!/usr/bin/env bash
REGISTRY=cr.mludolph.dev
PROJECT=mludolph-api

if [ $# -eq 0 ]
  then
    VERSION='latest'
  else
    VERSION=$1
fi
TAG=$REGISTRY/$PROJECT:$VERSION

docker build -t $TAG ../app
