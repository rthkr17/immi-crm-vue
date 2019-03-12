module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'immi-crm-vue',
        user: process.env.DB_USER || 'immi-crm-vue',
        password: process.env.DB_PASS || 'immi-crm-vue',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './immi-crm-vue.sqlite',
            operatorsAliases: false
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'Secret'
    }
}