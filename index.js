#!/usr/bin/env node
const meow = require('meow');
const {default: chalk} = require('chalk');
const whois = require('./whois');

const cli = meow(`
    Usage
      $ ${chalk.yellow('whoisgh')} <username>

    Options
      ${chalk.bold('--token')}, -t      Set a token for GitHub api

    Examples
      $ ${chalk.yellow('whoisgh')} dusansimic

         ${chalk.dim('Username: ')}dusansimic
        ${chalk.dim('Real name: ')}Dušan Simić
         ${chalk.dim('Location: ')}Novi Sad, Serbia
              ${chalk.dim('Bio: ')}Open source developer and maker. @makers-ns Director of Technology team @uspon.
          ${chalk.dim('Website: ')}http://dusansimic.me
`, {
  flags: {
    token: {
      type: 'string',
      alias: 't'
    }
  }
});

if (cli.flags.token) {
  whois.setToken(cli.flags.token)
} else {
  if (!(cli.flags.username && cli.flags.realname && cli.flags.location && cli.flags.bio && cli.flags.website)) {
    whois.find(cli.input[0])
  } else {
    whois.find(cli.input[0], {
      username: cli.flags.username,
      realname: cli.flags.realname,
      location: cli.flags.location,
      bio: cli.flags.bio,
      website: cli.flags.website
    });
  }
}
