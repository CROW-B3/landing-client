#!/bin/bash

# Script to set secrets in Cloudflare Workers
# Run this script to add R2 credentials to Cloudflare Workers secret store

echo "Setting up Cloudflare Workers Secrets..."
echo ""
echo "You'll be prompted to enter the secret values for each environment."
echo ""

# Production secrets
echo "=== PRODUCTION Environment ==="
echo "Setting CLOUDFLARE_R2_ACCESS_KEY for production..."
wrangler secret put CLOUDFLARE_R2_ACCESS_KEY

echo "Setting CLOUDFLARE_R2_SECRET_ACCESS_KEY for production..."
wrangler secret put CLOUDFLARE_R2_SECRET_ACCESS_KEY

echo ""
echo "=== DEV Environment ==="
echo "Setting CLOUDFLARE_R2_ACCESS_KEY for dev..."
wrangler secret put CLOUDFLARE_R2_ACCESS_KEY --env dev

echo "Setting CLOUDFLARE_R2_SECRET_ACCESS_KEY for dev..."
wrangler secret put CLOUDFLARE_R2_SECRET_ACCESS_KEY --env dev

echo ""
echo "✅ All secrets have been set!"
echo ""
echo "To verify secrets are set, run:"
echo "  wrangler secret list"
echo "  wrangler secret list --env dev"
