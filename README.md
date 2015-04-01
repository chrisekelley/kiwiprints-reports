# kiwiprints-reports

This is the kiwiprints-reports

## Run

    npm start

This monitors for changes in .coffee files, compiles javascripts, and pushes to the couch.

Your working directory for source code development is couch; the compiled version that you push to the live server is in dist.

Configure your local credentials in your gruntfile as below. Use couchapp push to deploy to your live server. 

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
        
