'use strict'

const request = require("supertest");
const assert = require("assert");
const app = require('../index');
const newToken ='';
describe('Request authentication token', ()=>{  
    it('Test to request the authentication token', done => {      
      request(app)
        .post('/faceRecognition/signin')
        .set('Accept', 'application/json')
        .send({
          "username": "ivan",
          "password": "admin237"
        })             
        .end ((error, res) => {
          newToken = res.body.token;
          console.log(newToken);
          assert(newToken != null);
          done();
        });
    });
  })
