import busboy from 'busboy'

export default function upload(req, res) {
    return new Promise((resolve, reject) => {
        let fileContent = null
        const bb = busboy({ headers: req.headers })
        // This code will process each file uploaded.
        bb.on('file', (_, file, fileinfo) => {
            const chunks = []
            file.on('data', (data) => {
                chunks.push(data)
            })
                .on('close', () => {
                    fileContent = Buffer.concat(chunks)
                    resolve(fileContent)
                })
                .on('error', () => {
                    reject()
                })
        })

        bb.on('finish', () => {
            if (!fileContent) {
                reject()
            }
        })

        bb.end(req.rawBody)
    })
}
