const redis = require('redis');

function main() {
  const client = redis.createClient(process.env.DATABASE_REDIS_URL);
  client.flushall((err) => {
    if (err) process.exit(1);
    else process.exit(0);
  });
}

main()
