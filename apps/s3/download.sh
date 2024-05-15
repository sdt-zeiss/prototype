#!/bin/bash

URL=prototype-minio.sliplane.app
USERNAME=prototype
PASSWORD=
BUCKET=public
FILE_NAME=Dockerfile
OBJ_PATH="/${BUCKET}/${FILE_NAME}"

# Static Vars
DATE=$(date -jnu +%a,\ %d\ %h\ %Y\ %T\ %Z)
CONTENT_TYPE='application/zstd'
SIG_STRING="GET\n\n${CONTENT_TYPE}\n${DATE}\n${OBJ_PATH}"
SIGNATURE=`echo -en ${SIG_STRING} | openssl sha1 -hmac ${PASSWORD} -binary | base64`

OUT_FILE="./output"

curl -o "${OUT_FILE}" \
    -H "Host: $URL" \
    -H "Date: ${DATE}" \
    -H "Content-Type: ${CONTENT_TYPE}" \
    -H "Authorization: AWS ${USERNAME}:${SIGNATURE}" \
    https://$URL${OBJ_PATH}