module.exports = async (d) => {
    const {code} = d.command;
    const inside = d.unpack();
    const err = d.inside(inside);
    if (err) return d.error(err);

    const [userID, nick, reason, guildID] = inside.splits;

    let gID = guildID? await d.util.getGuild(d, guildID) : d.guildID

    const member = await d.util.getMember(gID, userID);
    if (!member) return d.aoiError.fnError(d, "member", {inside});

    await member.setNickname(nick === "" ? null : nick.addBrackets(), reason);

    return {
        code: d.util.setCode({function: d.func, code, inside}),
    };
};
