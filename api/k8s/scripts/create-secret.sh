#!/bin/bash

kubectl create secret generic mludolph.dev-secrets \
  --from-literal=api_keys=${MLUDOLPH_API_KEYS} \
  --dry-run=client \
  -o yaml | \

kubectl label -f- --dry-run=client -o yaml --local app=mludolph-dev-api \
> secret.yaml