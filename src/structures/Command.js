class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
        this.database = options.database
        this.maintenance = options.maintenance
        this.disabled = options.disabled

        this.dev = options.dev
        this.creators = options.creators
        this.admin = options.admin
        this.uPremium = options.uPremium
        this.gPremium = options.gPremium
        this.bTester = options.bTester
        this.posse = options.posse
        this.uPermissions = options.uPermissions
        this.cPermissions = options.cPermissions
    }
}

module.exports = Command