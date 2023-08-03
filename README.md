
This is a demo project where I find and implement certain scenarios in the nicest ways I can find or come up with.

Currently it includes implementations of 
- A default/vanilla NestJs project
- Prisma with a number of useful extensions on a localhost postgres database
- Pino logger (I used to use winston but I'm switching to pino)
  - An imported parrt of the pino test is the pino-http extension which will auto-log
    any http context the current code is executed in.
- TypeGraphql together with it's Prisma code generation extension