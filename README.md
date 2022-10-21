# shift-management-system

## Getting Started

Ensure you have Node.js installed.

For windows users:
Simply run runME.bat (should take a few moments)

For other users:
1. In the terminal, run: `npm install`
2. Then, in the terminal, run: `npm run build`(it might take 2-3 minutes)
3. Then, in the terminal, run: `npm run app`

## Running the Project

1. Browse to the shift mangment frontend at (http://localhost:8080) and check your shift or register.

2.If you want to close the frontend and the beckend, just type control+c in the terminal and than run `npm run stop-server`



## Issues
There might be a problem in the Client that looks like this:
 opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
[1]   library: 'digital envelope routines',
[1]   reason: 'unsupported',
[1]   code: 'ERR_OSSL_EVP_UNSUPPORTED'

It can be solved through changing the node version to 16.17.1.




