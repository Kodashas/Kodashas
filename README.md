<div align="center">

<img src="assets/banner.gif" alt="Kalashas" width="830">

# Kalashas

**Simulation game integrations, custom OBS plugins, Linux servers and hosting.**<br>
<sub>C# · Java · JavaScript · Python · Lua · most of it private</sub>

</div>

### Sim integrations

- Native telemetry readers for **iRacing, Assetto Corsa, DiRT Rally 2.0, ETS2 and BeamNG**: shared memory, UDP streams, SDK session data
- In-game apps that run inside the sim, plus external overlays fed by the same data
- Race state turned into live events: battles, incidents, pit stops, fuel, weather

### OBS and live production

**KalashSoft**: the engine that runs my streams end to end
- Node.js 24 with **zero npm dependencies**, ~88k lines, 500+ commits, 170+ test files
- Custom OBS plugins and Lua scripts, full control over WebSocket
- Scene director, incident handling and crash recovery: the stream keeps going without me touching it
- Twitch events, chat read out loud, loudness metering, Stream Deck control
- Multi-platform output with GPU encoding

### Game servers

- Multi-server Minecraft network behind a proxy, 9 in-house Java plugins
- Economy built on atomic, race-free transactions: money cannot be duplicated
- REST API for the network's mobile app: Fastify, SQL, rate limiting, containerised

### Servers and hosting

- Linux administration across cloud and on-prem machines
- 20+ containerised services: reverse proxy with TLS, databases, cache, media, monitoring
- Zero-trust tunnels and mesh VPN instead of open ports
- Firewall, intrusion banning, uptime checks and push alerts
- Automated encrypted backups, database dumps, UPS-aware shutdowns
- DNS, edge functions, bot protection and mail routing for several domains

### Stack

| Area | Tools |
|---|---|
| Languages | <img src="https://skillicons.dev/icons?i=cs,java,js,python,lua,bash,powershell&theme=dark" alt="C#, Java, JavaScript, Python, Lua, Bash, PowerShell" height="40"> |
| Runtimes | <img src="https://skillicons.dev/icons?i=dotnet,nodejs&theme=dark" alt=".NET, Node.js" height="40"> |
| Data | <img src="https://skillicons.dev/icons?i=mysql,redis&theme=dark" alt="MySQL, Redis" height="40"> |
| Web | <img src="https://skillicons.dev/icons?i=html,css&theme=dark" alt="HTML, CSS" height="40"> |
| Ops | <img src="https://skillicons.dev/icons?i=linux,ubuntu,docker,nginx,git&theme=dark" alt="Linux, Ubuntu, Docker, Nginx, Git" height="40"> |

### Open source

Lithuanian translations and bug fixes merged into other people's projects.

<div align="center">
<br>

<a href="https://kalashas.lt"><img src="https://img.shields.io/badge/kalashas.lt-2F7CFF?style=for-the-badge" alt="kalashas.lt"></a>
<a href="https://www.twitch.tv/kalashas"><img src="https://img.shields.io/badge/Twitch-0A0E16?style=for-the-badge&logo=twitch&logoColor=9146FF" alt="Twitch"></a>
<a href="https://www.youtube.com/@Kalashas"><img src="https://img.shields.io/badge/YouTube-0A0E16?style=for-the-badge&logo=youtube&logoColor=FF0000" alt="YouTube"></a>
<a href="https://discord.gg/7VNbm9vyvM"><img src="https://img.shields.io/badge/Discord-0A0E16?style=for-the-badge&logo=discord&logoColor=5865F2" alt="Discord"></a>

<sub>The stream engine is live whenever I am.</sub>

</div>
