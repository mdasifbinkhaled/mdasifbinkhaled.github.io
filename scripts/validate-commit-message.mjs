import { readFileSync } from 'node:fs';

const allowedTypes = new Set([
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
]);

const messagePath = process.argv[2];

if (!messagePath) {
  console.error('Commit message file path is required.');
  process.exit(1);
}

const message = readFileSync(messagePath, 'utf8').trimEnd();
const [header = '', ...bodyLines] = message.split(/\r?\n/);
const errors = [];

if (/^(Merge|Revert)|^(fixup|squash)!/.test(header)) {
  process.exit(0);
}

const match = header.match(/^([a-z]+)(?:\(([a-z0-9./-]+)\))?: (.+)$/);

if (!match) {
  errors.push('Use conventional format: type(scope): subject');
} else {
  const [, type, , subject = ''] = match;

  if (!allowedTypes.has(type)) {
    errors.push(`Type must be one of: ${Array.from(allowedTypes).join(', ')}`);
  }

  if (!subject.trim()) {
    errors.push('Subject must not be empty.');
  }

  if (subject.endsWith('.')) {
    errors.push('Subject must not end with a period.');
  }

  if (/^[A-Z]/.test(subject)) {
    errors.push('Subject must start lowercase.');
  }
}

if (header.length > 100) {
  errors.push('Header must be 100 characters or fewer.');
}

bodyLines.forEach((line, index) => {
  if (line.length > 100) {
    errors.push(`Body line ${index + 2} must be 100 characters or fewer.`);
  }
});

if (errors.length > 0) {
  console.error('Invalid commit message:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}
