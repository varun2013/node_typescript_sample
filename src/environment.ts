enum Environments {
    local_environment = 'local'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        return 5000;
    }

    getDBName(): String {
      return 'db_test';
    }

    getAppUrl(): String {
      return 'http://202.164.56.83:3004';
    }

    getMailUserName(): String {
      return "azizkanwal10@gmail.com";
    }

    getMailPassword(): String {
      return "Talentelgia!@#";
    }
}

export default new Environment(Environments.local_environment);
