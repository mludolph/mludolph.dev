#!/bin/bash

kubectl create secret generic mludolph.dev-secrets \
  --from-literal=api_keys=${MLUDOLPH_API_KEYS} \
  --from-literal=telegram_token=${MLUDOLPH_TELEGRAM_TOKEN} \
  --from-literal=telegram_chat_id=${MLUDOLPH_TELEGRAM_CHAT_ID} \
  --dry-run=client \
  -o yaml | \

kubectl label -f- --dry-run=client -o yaml --local app=mludolph-dev-api \
> secret.yaml