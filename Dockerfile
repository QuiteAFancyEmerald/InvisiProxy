FROM node:26-bookworm-slim
WORKDIR /app
LABEL org.opencontainers.image.title="InvisiProxy LTS" \
      org.opencontainers.image.description="An effective, privacy-focused web proxy service" \
      org.opencontainers.image.version="7.0.1" \
      org.opencontainers.image.authors="InvisiProxy Team" \
      org.opencontainers.image.source="https://github.com/QuiteAFancyEmerald/InvisiProxy/"
RUN apt-get update \
      && apt-get install -y --no-install-recommends tor bash python3 python3-pip make g++ gcc ca-certificates \
      && rm -rf /var/lib/apt/lists/*
RUN npm install -g corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .
RUN pnpm run fresh-install
RUN pnpm run build
EXPOSE 8080 9050 9051
COPY serve.sh /serve.sh
RUN chmod +x /serve.sh
CMD ["/serve.sh"]