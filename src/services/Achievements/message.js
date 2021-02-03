function has_text(text, msg) {
    msg = msg.content.toLowerCase();
    return msg.includes(text.toLowerCase());
}

function has_image(msg) {
    let arr = msg.content.trim().split(/ +/);
    // see if message has common urls for image
    for(let maybeURL of arr) {
        if(
            maybeURL.startsWith("https://tenor.com/") ||
            maybeURL.startsWith("https://imgur.com/") ||
            maybeURL.startsWith("https://cdn.discordapp.com/avatars/") ||
            maybeURL.startsWith("https://cdn.discordapp.com/attachments/") &&
            (
                maybeURL.endsWith(".jpg") ||
                maybeURL.endsWith(".png") ||
                maybeURL.endsWith(".gif")
            )
        ) return true;
    }

    try {
        // see if message has attachment 
        msg.attachments.first().attachment;
        return true;
        
    } catch(e) {
        return false;
    }
}

