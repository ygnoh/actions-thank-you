const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
    const {GITHUB_REPOSITORY, GITHUB_REF} = process.env;
    const prNum = GITHUB_REF.match(/^refs\/pull\/(.+)\/merge$/)[1];
    const [owner, repo] = GITHUB_REPOSITORY.split("/");
    const token = core.getInput("token");
    const octokit = github.getOctokit(token)

    try {
        await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number: prNum,
            body: "Thank you for your contribution!"
        });
    } catch (e) {
        core.setFailed(e);
    }
}

run();
