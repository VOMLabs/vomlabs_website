FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV NODE_ENV=production
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

# Copy only the necessary files
COPY --from=build --chown=nodeuser:nodejs /app/dist ./dist
COPY --from=build --chown=nodeuser:nodejs /app/vite.config.ts ./vite.config.ts
COPY --from=build --chown=nodeuser:nodejs /app/package.json ./package.json
COPY --from=build --chown=nodeuser:nodejs /app/node_modules ./node_modules

USER nodeuser

EXPOSE 3000
CMD ["pnpm", "start"]
