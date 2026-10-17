import { runSourceUIAudit } from '../tests/framework-source-ui-browser.mjs';
import { resolve } from 'node:path';

// Environment contract is documented in the task report. An explicit opt-in and
// existing installed runtime are required; this command does not install tools.
const { report, out } = await runSourceUIAudit();
console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, failed: report.checks.filter(check => !check.passed).map(check => check.name), report: resolve(out, 'source-ui.json'), cleanup: report.cleanup }));
if (!report.passed) process.exitCode = 1;
