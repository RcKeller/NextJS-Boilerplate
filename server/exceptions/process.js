/*
Process Exception handler
*/
process.on('uncaughtException', (err) => {
  console.error(err)
  switch (err.code) {
    case 'MODULE_NOT_FOUND':
      if (err.message.includes('config')) {
        console.warn(`
        ERROR - CONFIGURATION REQUIRED
          Create the following file:  "config/index.js"
          Example format:             "config/index.js.example"

          Start by copying the template and editing it:
            $ cp config/index.js.example config/index.js
            $ vim config/index.js
        `)
      }
      break
  }
  process.exit(1)
})
