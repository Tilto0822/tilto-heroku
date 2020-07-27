import express from 'express';

import JJACK from './JJACK/app';

const jServer = new JJACK();
const jApp: express.Application = jServer.getInstance();

jApp.listen(80, () => {
    console.log('JJACK - server on!');
});