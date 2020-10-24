
const getEmoji = (emojiName) => 
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

const emojis = {
    red: "red",
}