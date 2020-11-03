enum Environments {
    local_environment = 'local'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        return 3000;
    }

    getDBName(): String {
      return 'db_test';
    }
}

export default new Environment(Environments.local_environment);
