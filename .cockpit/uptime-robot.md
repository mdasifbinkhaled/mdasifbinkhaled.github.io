# Uptime Monitoring Configuration Guide

To ensure continuous availability of the `mdasifbinkhaled.github.io` portfolio, follow this setup for UptimeRobot (or any similar Ping service).

## UptimeRobot Configuration

1. **Dashboard**: Navigate to [UptimeRobot Dashboard](https://uptimerobot.com/).
2. **Add New Monitor**: Click "Add New Monitor".
3. **Monitor Settings**:
   - **Monitor Type**: `HTTP(s)`
   - **Friendly Name**: `Portfolio Website Primary`
   - **URL/IP**: `https://mdasifbinkhaled.github.io/`
   - **Monitoring Interval**: `5 minutes`
   - **Monitor Timeout**: `30 seconds`
4. **Alert Contacts**: Attach your primary `mdasifbinkhaled@gmail.com` notification hook.

## Why HTTP(s) pinging?

Since the architecture relies strictly on GitHub Pages (`output: export`), infrastructure crashes are rare. However, broken DNS configurations or catastrophic underlying GitHub Pages incident outages will immediately register 404/503 fallback codes. Monitoring the root `/` guarantees the static bundle is resolving accurately from edge nodes.
