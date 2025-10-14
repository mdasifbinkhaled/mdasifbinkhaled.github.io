# CodeQL Code Scanning Setup Instructions

## Current Status

✅ **CodeQL workflow is properly configured** in `.github/workflows/security.yml`
❌ **Code scanning is NOT enabled** in GitHub repository settings

## The Issue

The CodeQL analysis is running successfully in GitHub Actions, but the results cannot be uploaded because code scanning is not enabled in the repository settings. This is a **repository configuration issue**, not a workflow problem.

### Error Message

```
Error: Code scanning is not enabled for this repository.
Please enable code scanning in the repository settings.
```

## How to Enable Code Scanning

### Option 1: Enable via GitHub UI (Recommended)

1. Go to your repository on GitHub: `https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io`

2. Navigate to **Settings** → **Code security and analysis**

3. Under **Code scanning**, click **"Set up"** or **"Enable"**

4. You'll see options:
   - **Default** - Uses default CodeQL configuration
   - **Advanced** - Uses your existing `.github/workflows/security.yml`

5. Select **"Advanced"** since you already have a workflow configured

6. Click **"Enable CodeQL"**

### Option 2: Enable via GitHub API

```bash
# Using GitHub CLI (if installed)
gh api --method PUT /repos/mdasifbinkhaled/mdasifbinkhaled.github.io/code-scanning/default-setup \
  -f state='configured' \
  -f query_suite='security-extended'
```

## What Happens After Enabling

Once enabled:

✅ CodeQL analysis results will be visible in the **Security** tab
✅ Alerts will appear in the **Code scanning alerts** section
✅ Pull requests will show code scanning results
✅ You'll receive notifications for new security issues
✅ The workflow will run on:

- Every push to `main` or `develop`
- Every pull request to `main`
- Weekly on Mondays at 00:00 UTC
- Manual trigger via workflow_dispatch

## Current Workflow Configuration

The `.github/workflows/security.yml` workflow:

- **Language**: JavaScript/TypeScript
- **Queries**: security-and-quality (comprehensive ruleset)
- **Timeout**: 15 minutes
- **Permissions**: Properly configured for security events
- **Autobuild**: Enabled for automatic detection

## Benefits of Code Scanning

1. **Security vulnerability detection** - Identifies potential security issues
2. **Code quality analysis** - Detects code smells and anti-patterns
3. **Dependency scanning** - Already enabled via `dependency-audit` job
4. **Pull request integration** - Blocks PRs with critical issues (if configured)
5. **Continuous monitoring** - Weekly scans catch new vulnerabilities

## Verification

After enabling, verify it's working:

1. Go to **Security** → **Code scanning**
2. You should see analysis results
3. Check the latest workflow run in **Actions** tab
4. Status should be ✅ instead of ⚠️

## Related Documentation

- [GitHub Code Scanning Docs](https://docs.github.com/en/code-security/code-scanning)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Setting up Code Scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/setting-up-code-scanning-for-a-repository)

## Notes

- This is a **one-time setup** in GitHub repository settings
- The workflow is already correctly configured
- No code changes are needed
- The feature is **free for public repositories**
- For private repos, requires GitHub Advanced Security license

---

**Action Required**: Enable code scanning in repository settings to start receiving security alerts.
