# growtomiddle

Personal path of a middle developer

## Tech Stack

- https://nextjs.org/
- https://www.mongodb.com/
- https://next-auth.js.org/

## Local Development Setup

### Prerequisites

- Node.js 22
- pnpm 9+
- Docker and Docker Compose
- mkcert (for SSL certificates)

### Install mkcert

**macOS:**

```bash
brew install mkcert
```

**Linux:**

```bash
# Follow instructions at: https://github.com/FiloSottile/mkcert#linux
```

**Windows:**

```bash
# Follow instructions at: https://github.com/FiloSottile/mkcert#windows
```

### Setup SSL Certificates

1. **Generate SSL certificates:**

   ```bash
   ./scripts/setup-ssl.sh
   ```

2. **Add domain to /etc/hosts:**

   ```bash
   # macOS/Linux
   sudo sh -c 'echo "127.0.0.1 growtomiddle.lol" >> /etc/hosts'

   # Windows: Edit C:\Windows\System32\drivers\etc\hosts
   # Add: 127.0.0.1 growtomiddle.lol
   ```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://admin:password@mongodb:27017/growtomiddle?authSource=admin

# NextAuth Configuration
NEXTAUTH_URL=https://growtomiddle.lol
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# Google OAuth (for authentication)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application
NODE_ENV=development
BASE_FETCH_URL=https://growtomiddle.lol
```

To generate a secure `NEXTAUTH_SECRET`, run:

```bash
openssl rand -base64 32
```

### Running with Docker Compose

1. **Start all services:**

   ```bash
   docker-compose up -d --build
   ```

2. **Access services:**
   - Next.js app: **https://growtomiddle.lol** (with hot reload)
   - Mongo Express (database UI): http://localhost:8081
     - Username: `admin`
     - Password: `admin`

3. **View logs:**

   ```bash
   docker-compose logs -f nextjs
   ```

4. **Stop services:**

   ```bash
   docker-compose down
   ```

5. **Clean slate (remove all data):**
   ```bash
   docker-compose down -v
   ```

### Service Architecture

- **nginx** (Ports 80, 443): HTTPS reverse proxy
- **nextjs** (Port 3000): Next.js application
- **mongodb** (Port 27017): MongoDB database
- **mongo-express** (Port 8081): Database management UI

### MongoDB Connection

The MongoDB service is configured with:

- **Host:** `mongodb` (within Docker network) or `localhost` (from host)
- **Port:** `27017`
- **Database:** `growtomiddle`
- **Username:** `admin`
- **Password:** `password`

**Note:** Change the default MongoDB credentials in `docker-compose.yml` for security.

### Troubleshooting

**SSL Certificate Issues:**

- Ensure mkcert is installed and local CA is installed: `mkcert -install`
- Verify certificates exist: `ls -la nginx/ssl/`

**Domain Not Resolving:**

- Check `/etc/hosts` includes `127.0.0.1 growtomiddle.lol`
- Try accessing via `https://localhost` (if configured in nginx.conf)

**Next.js Build Fails:**

- Check Docker logs: `docker-compose logs nextjs`
- Ensure all environment variables are set in `.env.local`
