import admin from 'firebase-admin'

const credentials = JSON.parse(Buffer.from(process.env['firebase_private_key'], 'base64').toString('ascii'))
const app = admin.initializeApp({ credential: admin.credential.cert(credentials) })
const db = admin.firestore(app)

async function add(transcription) {
    const result = await db.collection('transcriptions').add({
        value: transcription,
        timestamp: Date.now(),
    })

    return result.id
}

async function get(id) {
    const result = await db.collection('transcriptions').doc(id).get()
    return result.data()
}

export default { add, get }
