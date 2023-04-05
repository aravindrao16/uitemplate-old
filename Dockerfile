# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:16-alpine
WORKDIR /app

COPY --chown=node:node next.config.js ./
COPY --chown=node:node public ./public/
COPY --chown=node:node .next/standalone/ ./
COPY --chown=node:node .next/static ./.next/static/

RUN apk update && \
  apk upgrade --no-cache && \
  rm -f /var/cache/apk/*.tar.gz

USER node

EXPOSE 8080
ENV PORT 8080
CMD [ "node", "-r", "./server-init.js", "server.js" ]

HEALTHCHECK --interval=15s --timeout=10s \
  CMD curl -f http://localhost:8080/ || exit 1
