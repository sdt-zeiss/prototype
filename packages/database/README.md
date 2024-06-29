# Database

This package contains the database service for the application. It is responsible for interacting with the database.

## Usage

package.json

```json
{
  "dependencies": {
    "database": "workspace:*"
  }
}
```

```typescript
import { prisma } from "database";
const posts = await prisma.post.findMany({});
```
