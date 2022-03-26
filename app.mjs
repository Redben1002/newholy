import { Command } from 'commander';
import buildBookmark from './cli/buildBookmark.mjs';
import compileBookmark from './cli/compileBookmark.mjs';

const program = new Command();

program
	.command('build-bookmark')
	.description('Builds the bookmark script')
	.argument('[output]', 'Output directory', './')
	.option(
		'--d, --development',
		"If the result shouldn't be optimized for production"
	)
	.option('--w, --watch', 'If the source should be watched for updates')
	.action(buildBookmark);

program
	.command('compile-bookmark')
	.description('Compiles the bookmark source')
	.option(
		'--d, --development',
		"If the result shouldn't be optimized for production"
	)
	.action(compileBookmark);

program.parse(process.argv);
