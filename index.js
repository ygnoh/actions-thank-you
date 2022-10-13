const github = require("@actions/github");
const core = require("@actions/core");

function getOwner() {
    const {GITHUB_REPOSITORY} = process.env;

    return GITHUB_REPOSITORY.split("/")[0];
}

function getRepo() {
    const {GITHUB_REPOSITORY} = process.env;

    return GITHUB_REPOSITORY.split("/")[1];
}

function getPRNum() {
    const {GITHUB_REF} = process.env;

    return GITHUB_REF.match(/^refs\/pull\/(.+)\/merge$/)[1];
}

function getOctokit() {
    const token = core.getInput("token");

    return github.getOctokit(token);
}

function createCommentPayload() {
    return {
        owner: getOwner(),
        repo: getRepo(),
        issue_number: getPRNum(),
        body: "Thank you for your contribution!"
    };
}

function createComment() {
    return getOctokit().rest.issues.createComment(createCommentPayload());
}

async function run() {
    try {
        await createComment();
    } catch (e) {
        core.setFailed(e);
    }
}

run();
