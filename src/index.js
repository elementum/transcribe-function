import db from './storage.js'
import express from 'express'
import receive_file from './file-upload.js'
import { transcribe } from './transcriber.js'

const app = express()

app.post('/transcriptions', async (req, res) => {
    const file = await receive_file(req, res)
    if (!file) {
        return res.send('File is empty').status(400)
    }

    let transcription = null

    try {
        transcription = await transcribe(file)
    } catch (err) {
        return res.send('Unable to transcribe file').status(500)
    }

    const id = await db.add(transcription)
    res.send({ transcription, id })
})

app.get('/transcriptions/:id', async (req, res, next) => {
    const id = req.params['id']
    if (!id) {
        return res.send('Id is required').status(400)
    }

    const record = await db.get(id)
    if (!record) {
        res.sendStatus(404)
    }

    res.send(record)
})

app.use((req, res) => {
    res.sendStatus(404)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

export default app
