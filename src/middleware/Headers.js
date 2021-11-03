const Headers = [
    {
        Key: "Server",
        Value: process.env["Server"]
    },
    {
        Key: "X-Powered-By",
        Value: "Nexus"
    }
];

export default Headers;