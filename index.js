const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
    const {GITHUB_REPOSITORY} = process.env;
    const [owner, repo] = GITHUB_REPOSITORY.split("/");
    const token = core.getInput("token");
    const octokit = github.getOctokit(token)
    const {data: pulls} = await octokit.rest.pulls.list({
        owner,
        repo,
    });

    console.log(pulls);
}

run();
