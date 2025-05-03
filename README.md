# RateLimitAPI

![GitHub Actions publish workflow status](https://github.com/ratelimitapi/packages/actions/workflows/publish.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

RateLimitAPI provides powerful rate limiting middleware for protecting your APIs from abuse. This repository contains official client libraries for multiple programming languages.

**These packages are currently in early development and not ready for production use.**

## Available Packages

| Language | Package | Version | Documentation |
|----------|---------|---------|---------------|
| JavaScript/TypeScript | [npm: ratelimitapi](https://www.npmjs.com/package/ratelimitapi) | [![npm version](https://img.shields.io/npm/v/ratelimitapi.svg)](https://www.npmjs.com/package/ratelimitapi) | [Node.js Documentation](./packages/node/README.md) |
| Python | [PyPI: ratelimitapi](https://pypi.org/project/ratelimitapi/) | [![PyPI version](https://img.shields.io/pypi/v/ratelimitapi.svg)](https://pypi.org/project/ratelimitapi/) | [Python Documentation](./packages/python/README.md) |

## Features

- Easy-to-use middleware for popular frameworks
- Flexible rate limit configuration
- Customizable response formats for rate limit headers
- Detailed analytics and monitoring
- Protection against common abuse patterns

## Quick Start

### Node.js

```bash
npm install ratelimitapi
# or
yarn add ratelimitapi
```

```javascript
const rateLimitResponse = await isRateLimited(request, "rlimit_your_api_token");
if (rateLimitResponse) {
  return rateLimitResponse; // Return the 429 response if rate-limited
}
// Continue with normal request handling if not rate-limited
```

### Python

```bash
pip install ratelimitapi
# or
poetry add ratelimitapi
```

```python
from ratelimitapi import is_rate_limited

limited_response = is_rate_limited(request, "rlimit_your_api_token")
if limited_response:
    response_body, status_code, headers = limited_response
    # Return the 429 response if rate-limited
    return create_response(response_body, status_code, headers)
    
# Continue with normal request handling if not rate-limited
```

## Documentation

For more detailed documentation:

- [Node.js Package Documentation](./packages/node/README.md)
- [Python Package Documentation](./packages/python/README.md)

Full API documentation will be available at [RateLimitAPI.com](https://ratelimitapi.com/docs) upon official release.

## Development

This repository is organized as a monorepo with packages for different languages:

```
packages/
  ├── node/    # JavaScript/TypeScript implementation
  └── python/  # Python implementation
```

To build a package:

```bash
# Node.js
npm run build

# Python
npm run build-python
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Stay Updated

- Star our [GitHub repository](https://github.com/ratelimitapi/packages)
- Follow our progress on Twitter (coming soon)
- Join our community Discord (coming soon)

## Contact

For more information, please visit [RateLimitAPI.com](https://ratelimitapi.com) when it's available.
