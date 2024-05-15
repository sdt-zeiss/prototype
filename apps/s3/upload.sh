#!/bin/bash

URL=minio-debug.sliplane.app
USERNAME=prototype
PASSWORD=
BUCKET=public
FILE_NAME=Dockerfile
OBJ_PATH="/${BUCKET}/${FILE_NAME}"

# Static Vars
DATE=$(date -jnu +%a,\ %d\ %h\ %Y\ %T\ %Z)
CONTENT_TYPE='application/zstd'
SIG_STRING="PUT\n\n${CONTENT_TYPE}\n${DATE}\n${OBJ_PATH}"
SIGNATURE=`echo -en ${SIG_STRING} | openssl sha1 -hmac ${PASSWORD} -binary | base64`

curl --silent -v -X PUT -T "${FILE_NAME}" \
    -H "Host: $URL" \
    -H "Date: ${DATE}" \
    -H "Content-Type: ${CONTENT_TYPE}" \
    -H "Authorization: AWS ${USERNAME}:${SIGNATURE}" \
    https://$URL${OBJ_PATH}

