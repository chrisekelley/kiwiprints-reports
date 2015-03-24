# kiwiprints-reports

This is the kiwiprints-reports

## Run

    npm start

This monitors for changes in .coffee files, compiles javascripts, and pushes to the couch.

## Configure

Configure the credentials for your couch:

    'couch-push': {
          options: {
            user: 'admin',
            pass: 'password'
          },
          localhost: {
            files: {
              'http://localhost:5984/grunt-couch-test': 'tmp/reports.json'
            }
          }
        },
        
