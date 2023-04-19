import {Router} from "express";
import {getAllStats, getMainText, getComments, postAddComments, getMyComments} from '../../../../controllers/controller.js'
import {inputValidationMiddleware} from "../../../../middlewares/middleware.js";


const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/stats', inputValidationMiddleware, getAllStats)
handlers.post('/comments', inputValidationMiddleware, postAddComments)

export default handlers
