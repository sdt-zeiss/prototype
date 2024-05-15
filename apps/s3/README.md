# MINIO S3

Media assets (images etc) are stored in a self-hosted minio instance.

## Deployment

Environment variables:

```
MINIO_ROOT_PASSWORD=
MINIO_ROOT_USER=
```

Health check: `/minio/health/live`

Volume: `/bitnami/minio/data`
