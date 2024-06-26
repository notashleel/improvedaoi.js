module.exports = (d) => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    const [name, type = "PLAYING", status = "online", url, afk = "false"] =
        data.inside.splits;

    try {
        d.client.user.setPresence({
            status: status,
            activities: [
                {
                    name: name.addBrackets(),
                    type: type === "PLAYING" ? 0 : type === "STREAMING" ? 1 : type === "LISTENING" ? 2 : type === "WATCHING" ? 3 : type === "COMPETING" ? 5 : 0,
                    url: url?.addBrackets(),
                },
            ],
            afk: afk === "true",
        });
    } catch (err) {
        d.aoiError.fnError(
            d,
            "custom",
            {},
            "Failed To Set Status With Reason: " + err,
        );
    }

    return {
        code: d.util.setCode(data),
    };
};
