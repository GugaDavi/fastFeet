import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'
import signatureConfig from './config/signature.config'

// Controllers

import SessionController from './app/controllers/SessionController'
import RecipientController from './app/controllers/RecipientController'
import AddressController from './app/controllers/AddressController'
import DeliverymanController from './app/controllers/DeliverymanController'
import FileController from './app/controllers/FileController'
import SignatureController from './app/controllers/SignatureController'
import PackageController from './app/controllers/PackageController'
import DeliverymanPackagesController from './app/controllers/DeliverymanPackagesController'
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController'

// Validators

import SessionValidatior from './app/validators/SessionValidator'
import RecipientValidator from './app/validators/RecipientValidator'
import AddressValidator from './app/validators/AddressValidator'
import DeliverymanValidator from './app/validators/DeliverymanValidator'
import PackageValidator from './app/validators/PackageValidator'
import DeliveryProblemValidator from './app/validators/DeliveryProblemValidator'

// Middlewares

import AuthMiddleware from './app/middlewares/auth'
import CheckOfficeHour from './app/middlewares/checkOfficeHour'

const routes = Router()
const upload = multer(multerConfig)
const uploadSignature = multer(signatureConfig)

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

routes.get('/deliveryman/:id', DeliverymanPackagesController.index)
routes.get('/deliveryman/:id/deliveries', DeliverymanPackagesController.show)
routes.post('/deliveryman/:id/:packageId', CheckOfficeHour, DeliverymanPackagesController.store)
routes.put('/deliveryman/:id/:packageId', CheckOfficeHour, uploadSignature.single('signature'), DeliverymanPackagesController.update)

routes.post('/files', upload.single('file'), FileController.store)

routes.post('/signatures', uploadSignature.single('signature'), SignatureController.store)

routes.get('/packages', PackageController.index)
routes.post('/packages', PackageValidator.store, PackageController.store)
routes.put('/packages/:id', PackageValidator.update, PackageController.update)
routes.delete('/packages/:id', PackageController.delete)

routes.get('/deliveryProblems', DeliveryProblemsController.index)
routes.get('/deliveryProblems/:packageId', DeliveryProblemsController.show)
routes.post('/deliveryProblems/:packageId/problems/', DeliveryProblemValidator.store, DeliveryProblemsController.store)
routes.delete('/deliveryProblems/:reportId/cancel', DeliveryProblemsController.delete)

export default routes
