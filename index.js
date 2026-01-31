const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const prefix = "+";
client.commands = new Collection();

/* =========================
   COMMANDES
========================= */
const commandsPath = path.join(__dirname, "commands");
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.name) {
      client.commands.set(command.name, command);
    }
  }
}

/* =========================
   EVENTS
========================= */
const eventsPath = path.join(__dirname, "events");
if (fs.existsSync(eventsPath)) {
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) =>
        event.execute(...args, client)
      );
    } else {
      client.on(event.name, (...args) =>
        event.execute(...args, client)
      );
    }
  }
}

/* =========================
   MESSAGE HANDLER (PREFIX)
========================= */
client.on("messageCreate", async message => {
  if (
    message.author.bot ||
    !message.content.startsWith(prefix)
  ) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const cmdName = args.shift().toLowerCase();
  const command = client.commands.get(cmdName);
  if (!command) return;

  try {
    command.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

/* =========================
   READY + REVIVE
========================= */
const revivePing = require("./revive/revivePing");

client.once("ready", () => {
  console.log(` Connecté en tant que ${client.user.tag}`);
  revivePing(client);
});

/* =========================
   LOGIN
========================= */
client.login("");
