let lastHourPinged = null;

module.exports = (client) => {
  setInterval(async () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // plage horaire 8h → 23h
    if (hour < 8 || hour >= 24) return;

    // seulement à HH:00
    if (minute !== 0) return;

    // éviter double ping la même heure
    if (lastHourPinged === hour) return;
    lastHourPinged = hour;

    const guild = client.guilds.cache.get("1453843775817519347");
    if (!guild) return;

    const channel = guild.channels.cache.get("1463611000266690731");
    if (!channel) return;

    channel.send(
      " **Eh Sayuno, reveiller vous  !**\n" +
      "Reveiller vous!!"
    );

  }, 60 * 1000); // vérifie toutes les minutes
};
