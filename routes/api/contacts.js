const express = require('express')
const router = express.Router()
const Joi = require('joi');

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')



router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data,
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const data = await getContactById(contactId);

  if (!data) {
    res.status(404).json({ message: 'Not found' })
    return
  }

  res.json({
    status: 'success',
    code: 200,
    data,
  })

})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!name) {
    res.status(400).json({ message: 'missing required name field' })
    return
  } if (!email) {
    res.status(400).json({ message: 'missing required email field' })
    return
  } if (!phone) {
    res.status(400).json({ message: 'missing required phone field' })
    return
  }

  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string()
      .min(7)
      .max(30)
      .required(),

  })

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details })
  }

  const data = await addContact({ name, email, phone });
  res.status(201).json({
    status: 'success',
    code: 201,
    data,
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const result = await removeContact(contactId);

  if (result === -1) {
    res.status(404).json({ message: 'Not found' })
    return
  }

  res.status(200).json({
    message: 'contact deleted'
  })
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    res.status(400).json({ message: 'missing fields' })
    return
  }

  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(30),
    email: Joi.string()
      .email(),
    phone: Joi.string()
      .min(7)
      .max(30)
  })

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details })
  }

  const data = await updateContact(contactId, { name, email, phone });
  if (!data) {
    res.status(404).json({ message: 'Not found' })
    return
  }

  res.json({
    status: 'success',
    code: 200,
    data,
  })
})

module.exports = router
