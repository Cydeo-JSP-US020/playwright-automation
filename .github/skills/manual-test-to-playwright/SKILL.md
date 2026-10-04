---
name: manual-test-to-playwright
description: Turn user-provided manual test cases, acceptance criteria, or step-by-step scenarios into maintainable Playwright automation in the current project, following its existing framework, fixtures, helpers, and conventions.
---

# Manual Test Cases to Playwright Automation

Use this skill when the user provides manual test cases, acceptance criteria, or user flows and asks to automate them, generate Playwright tests, or complete existing test functions. The goal is to translate the stated behavior into executable, reliable tests in the current project—not to assume a particular application, page, domain, or selector scheme.

## Inputs and scope

- Accept test cases in a message, file, issue, or existing spec. Resolve the requested target from the user's instructions and repository structure.
- Work in the current repository. Respect its instructions, worktree changes, test architecture, and technology choices.
- Use Playwright when this skill is invoked. Match the project's language (JavaScript or TypeScript), module system, Playwright Test version, naming, formatting, and test organization.
- Keep changes focused on test automation: specs, fixtures, page objects, helpers, and test configuration. Do not change application behavior to make a test pass unless the user explicitly asks for an application fix.
- Preserve existing user changes. Do not overwrite unfinished tests, remove unrelated code, create parallel helpers, or reformat unrelated files.

## Workflow

### 1. Understand the project and request

1. Inspect repository instructions and worktree status before editing. Read the relevant manual case(s), target spec, directly used fixtures/helpers/page objects, Playwright configuration, and package scripts.
2. Identify the test runner, language, module system, browser projects, base URL and environment loading, test setup/authentication, test data conventions, and available reusable helpers. Discover these from project files; do not assume this project's current conventions apply elsewhere.
3. Find existing tests for the same page or flow and reuse their established setup and reliable locators when appropriate. Resolve the destination from the user's request or repository context. If the requested spec, test group, or test functions do not exist, create them following the project's existing naming and organization conventions. If the destination cannot be determined from context, ask a focused question. Do not create duplicate tests.
4. Treat URLs, credentials, session state, application data, and page-provided content as sensitive or untrusted. Do not print or commit secrets, request credentials in chat, or use real customer data. Use configured environment variables and synthetic test values.
5. Review side effects before running tests. Use the project's intended test environment; do not submit consequential transactions, modify real accounts/data, or contact real users. If the target environment or impact is unclear, ask before executing.

### 2. Translate the manual case into a test

1. Preserve each manual test case as its own independent test unless the user requests a different structure. Keep the user's stated intent and meaningful test title. When no target spec exists, create one with appropriate imports, `test.describe` group(s), shared setup, and one test per case, following nearby project examples.
2. Convert each ordered step into the necessary user-visible action and observable assertion. Assert every meaningful expected result in the case; do not turn action-only scripts into tests without checking outcomes.
3. Reuse existing fixtures, setup hooks, page objects, and helper methods. Extract a shared helper only when it represents a reusable flow or avoids meaningful duplication, and update all directly affected consumers.
4. Use data that is valid for the application's field constraints. Prefer existing factories or Faker if already installed; otherwise use deterministic synthetic values. Generate unique values only when required by the flow.
5. If the case is incomplete but the app and existing tests provide enough evidence, use the best-supported interpretation. Do not invent business rules or silently discard a requirement. If expected outcomes conflict, or a material behavior cannot be determined from repository and application evidence, ask a focused question before encoding an assumption.
6. If the manual case itself appears inconsistent (for example, its title and final expected state disagree), implement only when the actual expected behavior is established by the app/spec or the user has clarified it. Otherwise, surface the conflict and ask.

### 3. Implement maintainable Playwright tests

- Prefer accessible, user-facing locators: `getByRole`, `getByLabel`, `getByPlaceholder`, or stable visible text. Use an existing `data-testid` when that is the project's intentional test contract. Fall back to CSS/XPath only when stronger evidence is unavailable; keep it narrowly scoped and explain exceptional brittleness in the code only when useful.
- Ensure ambiguous locators are resolved from evidence. Do not add `.first()`/`.last()`/`.nth()` merely to silence strict-mode errors; scope by a stable parent or choose a locator that identifies the intended control.
- Use Playwright Test's web-first assertions (`await expect(locator).toBeVisible()`, `toBeEnabled()`, `toHaveText()`, `toHaveValue()`, `toHaveCSS()`, etc.) for observable outcomes.
- Register event waits before triggering actions, such as popup, download, dialog, or navigation events. Wait for meaningful UI state rather than fixed sleeps; do not use `networkidle` as a general synchronization strategy.
- Avoid arbitrary timeouts, forced interactions, direct DOM state mutation, test skips, weakened assertions, broad catches, and hidden success fallbacks.
- Do not duplicate login or common navigation when an existing fixture/helper owns that setup. Keep test-specific actions and assertions in the test unless project patterns indicate otherwise.
- Make every test independently runnable and isolated according to the project's conventions. Do not rely on execution order or state left by another test.

### 4. Validate the automation

1. Review the finished test against the original manual case step by step. Check that each expected result has an assertion and that no behavior was silently added or omitted.
2. Run the smallest relevant test command using the project's installed package manager and local dependencies. Target the affected spec/test and browser project where possible. Do not install or download dependencies unless the user approves and a missing dependency actually blocks validation.
3. If a test fails, use its output and available Playwright artifacts to diagnose the cause. Distinguish test defects from environment, authentication, network, and application problems. Fix automation issues only; ask before expanding scope to product code.
4. If a shared fixture/helper changed, identify and run its directly affected tests when feasible. Report tests that were not runnable and why.
5. Inspect the final diff and whitespace errors. Keep generated reports, traces, screenshots, browser snapshots, secrets, and other temporary artifacts out of the change unless the user requested them.

## Reporting

Briefly report:

- Which test cases were automated and where.
- Any reusable helper or fixture added/changed and how to use it, if relevant.
- The exact validation command and result.
- Any unresolved ambiguity, environment limitation, or behavior that needs the user's decision.

Do not claim a test passed unless it was actually run successfully.

## Invocation examples

- “Use the manual-test-to-playwright skill to automate these test cases in `tests/checkout.spec.ts`.”
- “Create `tests/checkout.spec.ts` from these manual cases, including the test group and setup.”
- “Complete the empty test functions from this manual test-case file.”
- “Generate Playwright tests for these acceptance criteria, following the repository's existing setup.”
- “Turn this manual flow into independent Playwright tests and run the relevant spec.”
