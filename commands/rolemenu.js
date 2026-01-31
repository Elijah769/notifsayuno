const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
  name: "rolemenu",
  run: async (client, message) => {
    if (!message.member.permissions.has("Administrator")) return;

    const embed = new EmbedBuilder()
      .setTitle("🔔 Notifications")
      .setDescription(
        "Choisis les notifications que tu souhaites recevoir :\n\n" +
        "🎁 Giveaway\n" +
        "🎪 Animation\n" +
        "📊 Sondage\n" +
        "📅 Événement"
      )
      .setColor("Blurple");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("notif_roles")
      .setPlaceholder("Sélectionne tes notifications")
      .setMinValues(0)
      .setMaxValues(4)
      .addOptions([
        { label: "Giveaway", value: "giveaway", emoji: "🎁" },
        { label: "Animation", value: "animation", emoji: "🎪" },
        { label: "Sondage", value: "sondage", emoji: "📊" },
        { label: "Événement", value: "evenement", emoji: "📅" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);
    message.channel.send({ embeds: [embed], components: [row] });
  }
};
