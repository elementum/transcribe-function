import functions from '@google-cloud/functions-framework'
import app from './src/index.js'

functions.http('helloHttp', app)
