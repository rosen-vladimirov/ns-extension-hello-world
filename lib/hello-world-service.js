class HelloWorldService {
	getHelloWorldString(name) {
		return `Hello \`${name}\`, {N} loves you.`;
	}
}

$injector.register("helloWorldService", HelloWorldService);
