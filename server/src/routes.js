const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ApplicationsController = require('./controllers/ApplicationsController')

module.exports  = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post('/login',
        AuthenticationController.login)
 
    app.get('/applications',
        ApplicationsController.index)
 
    app.post('/applications',
        ApplicationsController.post)
}
