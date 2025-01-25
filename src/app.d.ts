import Octokit from "@octokit/rest";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		Octokit: Octokit,
	}
}

export { };
