import { Router } from 'express'

// Controllers

import SessionController from './app/controllers/SessionController'
import RecipientController from './app/controllers/RecipientController'
import AddressController from './app/controllers/AddressController'
import DeliverymanController from './app/controllers/DeliverymanController'

// Validators

import SessionValidatior from './app/validators/SessionValidator'
import RecipientValidator from './app/validators/RecipientValidator'
import AddressValidator from './app/validators/AddressValidator'
import DeliverymanValidator from './app/validators/DeliverymanValidator'

// Middlewares

import AuthMiddleware from './app/middlewares/auth'

const routes = Router()

routes.post('/sessions', SessionValidatior.store, SessionController.store)

routes.use(AuthMiddleware)

routes.get('/recipients', RecipientController.index)
routes.post('/recipients', RecipientValidator.store, RecipientController.store)
routes.put('/recipients/:id', RecipientValidator.update, RecipientController.update)
routes.delete('/recipients/:id', RecipientController.delete)

routes.get('/address/:recipientId', AddressController.index)
routes.post('/address/:recipientId', AddressValidator.store, AddressController.store)

routes.get('/deliverymans', DeliverymanController.index)
routes.post('/deliverymans', DeliverymanValidator.store, DeliverymanController.store)
routes.put('/deliverymans/:id', DeliverymanValidator.update, DeliverymanController.update)
routes.delete('/deliverymans/:id', DeliverymanController.delete)

export default routes
