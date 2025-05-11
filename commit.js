import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  // eslint-disable-next-line no-undef
  input: process.stdin,
  // eslint-disable-next-line no-undef
  output: process.stdout,
});

rl.question('Enter commit message (default: "update"): ', msg => {
  msg = msg.trim() || 'update';
  execSync(`git add . && git commit -m "${msg}" && git push`, {
    stdio: 'inherit',
    shell: true,
  });
  rl.close();
});
