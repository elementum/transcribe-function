import speech from '@google-cloud/speech'

const client = new speech.SpeechClient({})

export async function transcribe(fileContent) {
    const config = {
        enableAutomaticPunctuation: true,
        encoding: 'MP3',
        languageCode: 'en-US',
        model: 'default',
        sampleRateHertz: 44100,
    }

    const [response] = await client.recognize({ audio: { content: fileContent }, config })
    return response.results.map((result) => result.alternatives[0].transcript).join('\n')
}
