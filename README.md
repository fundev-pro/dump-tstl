# dump-tstl

Debug utilities for TypeScript-to-Lua projects: pretty-print Lua tables with `dump()` and `inspect()` functions.

This project is a TypeScript wrapper for the excellent [inspect.lua](http://github.com/kikito/inspect.lua) library by [@kikito](https://github.com/kikito), adapted specifically for [TypeScript-to-Lua](https://typescripttolua.github.io/) (TSTL) projects.

## Features

- 🔍 **Human-readable table inspection** - Transform any Lua table into a readable format
- 📦 **TypeScript types included** - Full type definitions for TypeScript development
- 🎯 **TSTL optimized** - Designed to work seamlessly with TypeScript-to-Lua
- 🪶 **Lightweight** - Minimal overhead, perfect for debugging

## Installation

```bash
npm install @fundev-pro/dump-tstl
```

## Usage

### Basic Example

```typescript
import { dump, inspect } from 'dump-tstl';

// Simple dump with depth control
const data = {
    name: 'player',
    stats: {
        health: 100,
        mana: 50,
        inventory: ['sword', 'shield', 'potion']
    }
};

print(dump(data, 2)); // Dump with depth of 2
```

**Output:**
```lua
{
  name = "player",
  stats = {
    health = 100,
    mana = 50,
    inventory = { "sword", "shield", "potion" }
  }
}
```

### Advanced Inspection

```typescript
import { inspect } from 'dump-tstl';

const complexData = {
    users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ],
    settings: {
        theme: 'dark',
        notifications: true
    }
};

// Full control with inspect options
const result = inspect(complexData, {
    depth: 3,
    newline: '\n',
    indent: '  '
});

print(result);
```

### Difference between `dump()` and `inspect()`

- **`dump(value, depth?)`** - Simplified function that removes metatables and uses a default depth
  - `value`: Any Lua value to inspect
  - `depth`: Maximum depth to traverse (default: 1)
  
- **`inspect(value, options?)`** - Full-featured inspection with complete control
  - Supports custom formatting options
  - Can process/filter values with custom functions
  - Shows metatables by default

## API

### `dump<T>(value: T, depth?: number): string`

Dumps a Lua value to a human-readable string, removing metatables.

**Parameters:**
- `value` - The value to dump
- `depth` - Maximum depth to traverse (default: 1)

**Returns:** String representation of the value

### `inspect<T>(value: T, options?: InspectOptions): string`

Inspects a Lua value with full control over formatting.

**Parameters:**
- `value` - The value to inspect
- `options` - Optional configuration object:
  - `depth?: number` - Maximum depth (default: `math.huge`)
  - `newline?: string` - String for newlines (default: `"\n"`)
  - `indent?: string` - String for indentation (default: `"  "`)
  - `process?: (item: any, path: any[]) => any` - Custom value processor

**Returns:** String representation of the value

For more details about `inspect` options and capabilities, see the [inspect.lua documentation](https://github.com/kikito/inspect.lua/blob/22a22ce95fb931093e6759e381922fa7e708579e/README.md).

## Development

### Prerequisites

- Node.js 16+
- npm or compatible package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/fundev-pro/dump-tstl.git
cd dump-tstl

# Install dependencies
npm install
```

### Build

```bash
# Build the project (compiles TypeScript to Lua)
npm run build

# Clean build artifacts
npm run clean

# Rebuild from scratch
npm run rebuild
```

### Prepare for Publishing

```bash
# Prepare distribution files
npm run prepare-dist

# Create a package tarball for testing (dry run)
npm run pack

# Publish to npm
npm run publish
```

The `prepare-dist` script:
- Compiles TypeScript to Lua
- Copies necessary files to `dist/`
- Generates a clean `package.json` for publishing
- Includes TypeScript definitions

**Note:** Before publishing, make sure you are logged into npm (`npm login`)

### Code Quality

```bash
# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Lint TypeScript files
npm run lint

# Fix linting issues
npm run lint:fix
```

### Project Structure

```
dump-tstl/
├── src/
│   ├── dump.ts          # Main dump function
│   ├── index.ts         # Package exports
│   ├── inspect.d.ts     # TypeScript definitions for inspect.lua
│   └── inspect.lua      # Original inspect.lua implementation
├── scripts/
│   └── prepare-dist.ts  # Build script for npm distribution
├── dist/                # Compiled output (gitignored)
└── package.json
```

## License

ISC License - see [LICENSE](LICENSE) file for details.

This project includes [inspect.lua](http://github.com/kikito/inspect.lua) which is licensed under the MIT License.

## Credits

- Original [inspect.lua](http://github.com/kikito/inspect.lua) by [@kikito](https://github.com/kikito)
- TypeScript wrapper and TSTL adaptation by [fundev-pro](https://github.com/fundev-pro)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/fundev-pro/dump-tstl)
- [TypeScript-to-Lua](https://typescripttolua.github.io/)
- [Original inspect.lua](http://github.com/kikito/inspect.lua)

