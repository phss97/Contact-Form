const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config() // Load environment variables from .env file

const app = express()
app.use(cors())

app.get('/integration-token', (req, res) => {
    console.log('Received request for /integration-token')
    try {
        const tokenData = {
            // Identifier of user or organization.
            id: 'phss19971@gmail.com',
            // Human-readable name (it will simplify troubleshooting)
            name: 'Pedro Silva',
            // (optional) Any user fields you want to attach to your user.
            fields: {
                userField: '<user fields value>'
            }
        }

        // Your workspace key and secret from environment variables
        const WORKSPACE_KEY = process.env.WORKSPACE_KEY
        const WORKSPACE_SECRET = process.env.WORKSPACE_SECRET

        if (!WORKSPACE_KEY || !WORKSPACE_SECRET) {
            throw new Error('Workspace key or secret is missing')
        }

        const options = {
            issuer: WORKSPACE_KEY,
            // To prevent token from being used for too long
            expiresIn: 7200,
        }

        const token = jwt.sign(tokenData, WORKSPACE_SECRET, options)

        res.send(JSON.stringify(token))
    } catch (error) {
        console.error('Error generating token:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})