function showHelp() {
  console.log(`
Usage: pnpm tsx scripts/seed-vacancies.ts [options] [count]

Options:
  --help, -h     Show this help message
  count          Number of vacancies to generate (default: 10)

Examples:
  pnpm tsx scripts/seed-vacancies.ts           # Generate 10 vacancies
  pnpm tsx scripts/seed-vacancies.ts 50        # Generate 50 vacancies
  pnpm tsx scripts/seed-vacancies.ts --help    # Show help
`);
}

function parseArgs(): { count: number; help: boolean } {
  const args = process.argv.slice(2);
  let count = 10;
  let help = false;

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      help = true;
    } else if (!isNaN(Number(arg)) && Number(arg) > 0) {
      count = parseInt(arg, 10);
    } else if (arg.startsWith('-')) {
      console.error(`Unknown option: ${arg}`);
      console.error('Use --help for usage information');
      process.exit(1);
    }
  }

  return { count, help };
}

export { showHelp, parseArgs };
