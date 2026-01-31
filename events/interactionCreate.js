const roles = require("../config/roles.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "notif_roles") return;

    const member = interaction.member;

    for (const key in roles) {
      const role = interaction.guild.roles.cache.get(roles[key]);
      if (!role) continue;

      if (interaction.values.includes(key)) {
        if (!member.roles.cache.has(role.id))
          await member.roles.add(role);
      } else {
        if (member.roles.cache.has(role.id))
          await member.roles.remove(role);
      }
    }

    interaction.reply({
      content: " Notifications mises à jour avec succès.",
      ephemeral: true
    });
  }
};
