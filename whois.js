const got = require('got');
const {default: chalk} = require('chalk');
const config = require('./config');

module.exports = {
  /**
   * Find person
   * @param {String} username Username of the person
   */
  find(username) {
    (async () => {
      try {
        if (!config.get('token')) {
          console.error(`🔑 ${chalk.red('No token is specified!')}

Please specify the token with:
  $ ${chalk.yellow('whoisgh')} --token <token>
`);
          process.exit();
        }
        const response = await got.post('https://api.github.com/graphql', {
          headers: {
            'Authorization': `bearer ${config.get('token')}`
          },
          body: {
            query: `query {
              user(login: "${username}") {
                login,
                name,
                location,
                bio,
                websiteUrl
              }
            }`,
          },
          json: true
        });
        console.log();
        console.log(`   ${chalk.dim('Username: ')}${response.body.data.user.login}`);
        if (response.body.data.user.name)
          console.log(`  ${chalk.dim('Real name: ')}${response.body.data.user.name}`);
        if (response.body.data.user.location)
          console.log(`   ${chalk.dim('Location: ')}${response.body.data.user.location}`);
        if (response.body.data.user.bio)
          console.log(`        ${chalk.dim('Bio: ')}${response.body.data.user.bio}`);
        if (response.body.data.user.websiteUrl)
          console.log(`    ${chalk.dim('Website: ')}${response.body.data.user.websiteUrl}`);
        console.log();
      } catch (e) {
        console.error(e);
      }
    })();
  },
  /**
   * Method for setting token
   * @param {String} token The token to be set
   */
  setToken(token) {
    config.set('token', token);
    console.log(`${chalk.green('✔')} Token set`);
  }
}
