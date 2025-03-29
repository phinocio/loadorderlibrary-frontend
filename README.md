# Load Order Library

Load Order Library is a tool mostly intended to help in debugging/supporting Mod Organizer lists for Bethesda games. It's meant to serve as an alternative/replacement for [Modwatch](https://modwat.ch/). The premiere feature being a list comparison tool.

I have a Patreon I guess. Don't feel the need to contribute or anything, I have no intention of doing perks/goals. If anything, the only thing I care about is covering the costs of the site/server. See <https://loadorderlibrary.com/transparency> for details.

<https://www.patreon.com/phinocio>

<https://ko-fi.com/phinocio>

# Table Of Contents

<!-- TOC -->

- [Goal](#goal)
- [Features](#features)
- [Planned Features](#planned-features)
- [Privacy](#privacy)
- [Transparency](#transparency)
- [Support/Issues](#supportissues)
- [Thanks](#thanks)

<!-- /TOC -->

# Goal

The goal of Load Order Library is to make the life of people doing support for mod lists easier. Often times we ask for an upload to [Modwatch](https://modwat.ch/) and then manually go through the files to determine if a mod is missing, or a mod is added. Whether the ini settings are correct, etc. By using the comparison tool, you get a quick view at a glance at what files are missing/added, and what contents of those files are also missing/added.

![Image of comparison tool](./docs/images/lol-compare.png)

# Features

Load Order Library has a slew of features.

- No registration required. Lists can be uploaded anonymously. You do need an account to edit and delete lists, however. Anonymous ones can't be deleted.
- Private lists. Only people with the link can view them.
- For users that decide to register, you can have as many lists as you want.
- Comparison tool.
- Completely free. No Ads.

More planned and coming soon!

# Planned Features

Working on a better place for this...for now just check the issues tab on this repo for "enhancement" tags.

# Privacy

Updated: 2025-03-29

Load Order Library uses ~~no analytic services at all~~, Cloudflare for DNS protection with comes with some analytics. Some 3rd party tools are used, but no external requests are made (except Cloudflare Analytics script), they are served with the page itself. Files uploaded are on ~~the server~~ a Cloudflare R2 Bucket until such time they are no longer associated with a list. At which point they are deleted once a week.

Feel free to use UBlock Origin or other ad blockers to block the Cloudflare Analytics script if you wish. It's not necessary for the site to function.

Data provided is entirely for the use of the site, and does not leave the server except in the case of encrypted database backups. Passwords are hashed and never stored in plain text. The server is hosted via a Digital Ocean droplet located in Toronto, Canada.

<sup>1</sup>The intention behind using this stack to get some basic analytics for the site is so that I have a rough idea of when/if I need to upgrade the server, if there's any IPs spamming my site that I need to block, and so I don't need to use anything like Google Analytics or other privacy invasive options.

# Transparency

For financial transparency please see <https://loadorderlibrary.com/transparency>

For some simple stats about the site, please see <https://loadorderlibrary.com/stats>

# Support/Issues

If you find any issues or have any questions, please make an issue on this repository or find help on the [Discord server](https://discord.gg/K3KnEgrQE4).

# Changelog

I'm currently looking into a better changelog solution... for now just look at commits I guess.

# Thanks

Thanks to RingComics for helping me test.

Thanks to Gatonegro for the icons.

Thanks to everyone for using the site. I'm astonished at how it's taken off so far :D.
