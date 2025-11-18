# syntax=docker/dockerfile:1.5

ARG VARIANT="22-bookworm"
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

ARG PNPM_VERSION="9.0.0"
ARG NONROOT_USER="node"

USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Enable corepack & pnpm as root (so it can write /usr/local/bin)
RUN corepack enable \
    && corepack prepare pnpm@${PNPM_VERSION} --activate

# pnpm home + store location for the non-root user
ENV PNPM_HOME="/home/${NONROOT_USER}/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:/home/${NONROOT_USER}/.local/bin:${PATH}"

# IMPORTANT: pre-create store directory with correct owner
RUN mkdir -p "${PNPM_HOME}/store" \
    && chown -R ${NONROOT_USER}:${NONROOT_USER} "/home/${NONROOT_USER}/.local"

USER ${NONROOT_USER}
WORKDIR /app

CMD ["sleep", "infinity"]
