---
name: playwright-test-healer
description: Diagnose, reproduce, and fix a failing Playwright spec from a user-provided file path by examining test output, reports and traces, and exploring the application with Playwright CLI when useful.
---

# Playwright Test Healer

Use this skill when the user provides a path to a failing Playwright spec and asks to debug, fix, or heal it. The goal is to identify the cause from evidence, make the smallest correct change, and verify the exact spec. Do not stop at generic debugging advice when the repository and environment permit a fix.

## Input and scope

- Treat the path supplied by the user as the target spec. Resolve relative paths from the repository root, verify the file exists, and confirm it is a Playwright test before running it.
- If no path is supplied, request one. If the path is ambiguous or does not exist, report that and request a corrected path rather than guessing.
- Keep investigation within the repository and the failing test's relevant application/test code. Preserve unrelated staged, unstaged, and untracked work.
- Read the spec, its fixtures/helpers, the applicable Playwright config, package scripts, and directly relevant application code before editing. Follow repository instructions and existing test conventions.
- Keep fixes within automation code: specs, test fixtures, page objects, test helpers, and test configuration. Do not edit product application code, backend/service code, or external test data to make a test pass. If evidence points to a defect outside automation code, explain the evidence and ask the user before broadening the scope.
- Do not make changes outside the repository or expose credentials, cookies, tokens, authorization headers, or other sensitive data in output.

## Workflow

### 1. Establish the baseline

1. Inspect the worktree before running commands. Note existing modifications and whether report/result directories already contain user data; do not clean, delete, or revert them.
2. Find the repository's package manager, Playwright dependency, config, scripts, environment loading, project/browser selection, retries, and reporter settings. Reuse those conventions.
3. Before running the spec, inspect its setup and relevant helpers for externally visible or destructive side effects, such as modifying shared accounts, deleting records, sending messages, or invoking non-test services. Confirm the configured target is an intended test environment. If the impact or target is unclear, do not run the test until the user clarifies or approves.
4. Run only the requested spec first, using the repository's installed Playwright CLI and environment setup. Prefer the package manager's existing test script when it correctly forwards a file path; otherwise use the repository-local Playwright executable (for example, `./node_modules/.bin/playwright test <spec-path>`). Confirm the package is installed locally before invoking it. If it is missing, stop and ask before using a command that could fetch or install it. Do not install dependencies unless the user approves and the package or browser is actually missing.
5. Record the exact assertion/error, source location, failing step, retry status, and artifact paths. Separate a deterministic failure from a flaky or environment-dependent failure; retries passing once do not establish a fix.

### 2. Diagnose from evidence

Use the most informative available evidence in this order:

1. Test output and Playwright's error context/snapshot.
2. The corresponding trace, screenshot, and video in the configured output directory.
3. The HTML report, if it already exists or is produced by the run.
4. The spec, fixtures, config, application implementation, and browser-visible behavior.

Use Playwright CLI commands appropriate to the installed version:

- `<local-playwright> show-trace <path-to-trace.zip>` to inspect action order, locator resolution, navigation, snapshots, and failures in Trace Viewer.
- `<local-playwright> show-report [report-directory]` to inspect test attempts and attachments in the HTML report.
- `<local-playwright> codegen <url>` to launch a browser and explore a reachable page or capture representative interactions when the UI behavior is unclear. Prefer the application's configured URL and existing authentication approach. Do not put secrets in command arguments or generated files.
- `<local-playwright> test <spec-path> --project=<name>` or other supported CLI filters when narrowing a cross-browser/project failure is necessary.

Here `<local-playwright>` means the repository-local Playwright executable or an existing package-manager script that invokes it. Do not use `npx` in a way that may download a missing package.

Do not assume a GUI/browser launched by `show-trace` or `codegen` is interactively inspectable through the terminal. If it is unavailable, use the trace archive and test artifacts directly, or create a narrowly scoped temporary diagnostic test/script only when necessary. Remove only temporary files created for that diagnosis, and never remove existing user artifacts.

For a trace that cannot be opened in Trace Viewer, inspect the ZIP entry listing and parse only the relevant `trace.trace` event records and snapshot references using local tools (for example, Python's standard-library `zipfile` and JSON modules). Narrow inspection to the failing action, its locator/log/snapshot context, and nearby events; do not dump the archive, request/response headers, storage state, cookies, credentials, or unrelated page data. If the available archive does not include enough evidence, state that limitation rather than guessing.

Read only relevant report/trace contents. Avoid dumping environment variables, full request headers, storage state, cookies, credentials, or sensitive page data. If a trace/report contains secrets, do not reproduce them in the response.

Classify the root cause before editing, for example:

- Incorrect Playwright API usage or test setup/fixture lifecycle.
- Locator ambiguity, brittleness, or mismatch with the accessible UI.
- Missing synchronization or an incorrect navigation/popup/download expectation.
- Stale or incorrect assertion/test data.
- Application behavior that genuinely violates a valid test expectation.
- Browser, environment, authentication, network, or test isolation problem.

Distinguish clearly between a faulty test and a real application defect. A product, backend/service, or external test-data defect is outside this skill's automation-only edit scope. Explain the evidence and ask for the user's approval before broadening scope; never change those systems merely to make an assertion pass.

### 3. Make a focused fix

- Fix the underlying cause with the smallest maintainable change consistent with repository patterns.
- For UI tests, prefer user-facing locators (`getByRole`, `getByLabel`, `getByText`) and Playwright's web-first assertions (`await expect(locator).toBeVisible()`, etc.) when they express the behavior reliably.
- Register event waits before the action that triggers them, e.g. `const popupPromise = page.waitForEvent('popup'); await link.click(); const popup = await popupPromise;`.
- Use the correct Playwright object/API: a popup event resolves to a `Page`; use `popup.getByRole(...)`, not `popup.page.getByRole(...)`.
- Wait for observable state rather than fixed sleeps. Avoid arbitrary timeouts, forced clicks, broad selectors, `.first()`/`.nth()` workarounds, and retry loops unless the behavior specifically requires them and the reason is documented.
- Keep assertions meaningful. Do not delete, skip, weaken, or silently bypass the failing assertion, turn off retries/strictness, or change the test expectation solely to get a green run.
- Do not reformat or refactor unrelated code. Preserve all changes that predate this task.

### 4. Verify the exact behavior

1. Rerun the exact spec after the fix with the same relevant project/environment.
2. If the failure may be flaky or timing-sensitive, run the relevant test more than once or with the repository's normal retry behavior; do not treat retries as the repair.
3. Run directly relevant adjacent tests if the change affects shared fixtures/helpers or application behavior. Avoid a full suite unless needed.
4. If a changed fixture, page object, helper, or other shared automation module has direct consumers in other specs, identify those consumers and run the relevant tests when feasible. If they cannot be run, state why and what remains unverified.
5. Inspect the final diff and confirm only intended files changed. Report failures caused by unavailable credentials, browsers, services, or environment distinctly from code failures.

## Reporting

Give a concise handoff containing:

- The root cause established from the run/report/trace.
- The file(s) changed and what was corrected.
- The exact verification command and result.
- Any remaining uncertainty or environment limitation.

Do not claim to have inspected a report, trace, or browser session unless you actually did so. If there was no trace/report, say which evidence was available and continue diagnosing from that evidence.
