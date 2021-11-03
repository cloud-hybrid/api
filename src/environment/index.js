import * as Assertion from "assert";
import * as FS from "fs";

const Variables = [
    [ "CI", typeof Boolean() ],
    [ "GitHub-API", typeof String() ],
    [ "GitHub-Token", typeof String() ],
    [ "GitHub-Organization", typeof String() ],
    [ "GitLab-Token", typeof String() ],
    [ "GitLab-API", typeof String() ],
    [ "Server", typeof String() ],
    [ "Environment", typeof String() ]
];

const Content = () => String(FS.readFileSync(".env", { encoding: "UTF-8" }));

console.debug(Content());

const Error = (Variable) => String("Environment Variable" + " (" + Variable[0] + ")" + " " + "Type !:=" + " " + Variable[1]);

process.env = { ... process.env, ... JSON.parse(Content()) };

Variables.forEach((Variable) => {
    Assertion.strictEqual(typeof process.env[Variable[0]], Variable[1], Error(Variable));
});

export default () => process.env = { ... process.env, ... JSON.parse(Content()) };
