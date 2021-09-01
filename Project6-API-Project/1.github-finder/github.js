// * Github Finder: search github users by user name and return their profile.

class Github {
  constructor () {
    // Max 100 requests per hour without the client_id and client_secret
    this.client_id = '9827b21a050b32f47ebf'
    this.client_secret = '78b42701f4010cf534dc335696f9d601e32851b9'
  }

  async getUser(user) {
    const profileRes = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)

    const profile = await profileRes.json()

    return {
      profile
    }
  }
}