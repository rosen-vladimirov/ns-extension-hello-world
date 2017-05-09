class HelloWorldCommand {
	// $errors and $logger are injected by CLI directly
	// $helloWorldService is declared in the extension and CLI's injector will inject it here as well.
	// Everything declared in one extension can be injected in the constructors of other extensions.
	constructor($errors, $logger,
		$helloWorldService) {
		this.$errors = $errors;
		this.$logger = $logger;
		this.$helloWorldService = $helloWorldService;
	}

	// canExecute method should return a promise with boolean result. In case result is "true", the command can be executed.
	// canExecute is executed before the execute method and its purpose is to validate args passed by user.
	canExecute(args) {
		return new Promise((resolve, reject) => {
			if (args.length > 1) {
				this.$errors.failWithoutHelp("This command accepts only one argument.");
			}

			if (args.length) {
				resolve(true);
				return;
			}

			this.$errors.failWithoutHelp("You should pass at least one argument to 'hello-world' command.");
		});
	}

	// execute method is the real execution of command. It should return a Promise<void>.
	execute(args) {
		return new Promise((resolve, reject) => {
			// printMarkdown method allows support for Markdown syntax in the terminal.
			const message = this.$helloWorldService.getHelloWorldString(args[0]);
			this.$logger.printMarkdown(message);

			resolve();
		});
	}
}

$injector.registerCommand("hello-world", HelloWorldCommand);