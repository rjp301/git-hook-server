# GitHub WebHook Automatic Pulling

Software to be run on remote servers containing other repos. Can set up webhooks in the GitHub of those repos such that when pushed to, this program will automatically perform a pull.

## Setup

1. `npm i -g pm2`
1. Update .env file with directory containing repos to be automatically updated and port of server.
1. Run `npm run build` to compile typescript
1. Start process using `pm2 start pm2.config.js`
