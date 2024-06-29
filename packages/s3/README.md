# S3

This package contains the S3 service for the application. It is responsible for uploading and downloading files to and from S3.

## Usage:

package.json

```json
{
  "dependencies": {
    "s3": "workspace:*"
  }
}
```

```typescript
import { uploadBuffer } from "s3";
await uploadBuffer(transformedImage, imageId);
```
