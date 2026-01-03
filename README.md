# Minecraft Bot

This is a simple Minecraft bot built using Mineflayer that connects to a Minecraft server, handles registration and login, and simulates human behavior.

## Features

- Automatic registration and login on the server
- Human-like behavior simulation (looking around, jumping, swinging arm, sneaking, moving)
- Error handling and reconnection logic
- Ignores known chat parsing errors for version 1.21

## Prerequisites

- Node.js (version 22 or higher)
- A Minecraft server (e.g., Aternos server as configured)

## Installation

1. Clone or download this repository.
2. Install dependencies:
   ```
   npm install
   ```

## Configuration

### Environment Variables

For security, sensitive information like the bot password is stored as environment variables.

- `BOT_PASSWORD`: The password for the bot's account on the Minecraft server.

### Setting up Secrets in Github

If deploying on your host with Environment Variables:
   - **Variable Name**: `BOT_HOST` (required, set as Secret)
   - **Variable Name**: `BOT_PORT` (required, set as Secret)
   - **Variable Name**: `BOT_USERNAME` (optional, default: 'PixelForgeStudio')
   - **Variable Name**: `BOT_AUTH` (optional, default: 'offline')
   - **Variable Name**: `BOT_PASSWORD` (required, set as Secret)
     - **Value**: Your actual bot password

For local development, create a `.env` file in the project root:

```
BOT_PASSWORD=YourActualPasswordHere
```

And install `dotenv` package:

```
npm install dotenv
```

Then, add at the top of `bot.js`:

```javascript
require('dotenv').config()
```

## Usage

Run the bot:

```
node bot.js
```

The bot will connect to the configured server and start simulating human behavior.

## Dependencies

- `mineflayer`: For creating and controlling the Minecraft bot
- `minecraft-data`: Minecraft data for Mineflayer
- `prismarine-chat`: For chat handling

## Notes

- The bot is configured for Minecraft version 1.20.4.
- It reconnects automatically if disconnected, with a 30-second delay.
- Ensure the server allows offline authentication if using `auth: 'offline'`.

## License

This project is open-source. Feel free to modify and distribute.
