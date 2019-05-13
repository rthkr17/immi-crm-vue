const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ApplicationsController = require('./controllers/ApplicationsController')
const StaffController = require('./controllers/StaffController')
const MessageController = require('./controllers/MessageController')
const SchedulesController = require('./controllers/SchedulesController')
const RetainerController = require('./controllers/RetainerController')
const TaskController = require('./controllers/TaskController')

module.exports  = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post('/login',
        AuthenticationController.login)
 
    app.get('/applications',
        ApplicationsController.index)
    
    app.get('/applications/:applicationId',
        ApplicationsController.show)
 
    app.post('/applications',
        ApplicationsController.post)
    
    app.post('/staff',
        StaffController.addStaff)
    
    app.get('/staff',
        StaffController.getStaff)
    
    app.post('/messages',
        MessageController.addMessage)
    
    app.get('/messages',
        MessageController.getMessages)
    
    app.post('/schedules',
        SchedulesController.addSchedule)
    
    app.get('/schedules',
        SchedulesController.getSchedules)
    
    app.post('/retainers',
        RetainerController.addRetainer)
    
    app.get('/retainers',
        RetainerController.getRetainers)
    
    app.post('/tasks',
        TaskController.addTask)
    
    app.get('/tasks',
        TaskController.getTasks)
}
