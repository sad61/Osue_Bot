/* eslint-disable no-undef */
const { MessageEmbed } = require("discord.js");
const { MUTE_CHANNEL } = require("../../json/config.json");

module.exports = {
  commands: ["shuffle"],
  expectedArgs: "",
  permissionError: "",
  minArgs: 0,
  maxArgs: 0,
  callback: async (message, args, client) => {
    if (message.channel.id === MUTE_CHANNEL) return;
    const player = client.manager.get(message.guild.id);
    const voice_channel = message.member?.voice.channel.id;
    const bot_channel = await message.guild.me.voice.channel?.id;

    if (!voice_channel)
      return message.channel.send(
        "Voce precisa estar em uma call pra usar esse comando troxa"
      );
    if (!bot_channel)
      return message.channel.send("Não estou conectado a uma call");
    if (bot_channel && bot_channel !== voice_channel)
      return message.channel.send(
        "Você precisa estar na mesma call que o bot para usar esse comando burro"
      );
    let embed = new MessageEmbed()
      .setTitle(" ♪ Tocando Agora ")
      .setColor("#0099ff");
    if (!player.queue.current) {
      return message.channel.send({
        embeds: [embed.setDescription("Nem tem nada tocando man")],
      });
    }
    player.queue.shuffle();
    message.channel.send("Shufflado");
  },
  permissions: "",
  requiredRoles: [],
};
