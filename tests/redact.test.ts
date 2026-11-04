import { test } from 'node:test';
import assert from 'node:assert/strict';
import {redact, sampleText, type EntityType} from '../lib/redact';
const enabled:EntityType[]=['name','email','id','phone','custom'];
test('masks Thai sample including repeated names and preserves surrounding text',()=>{const r=redact(sampleText,{enabled,mode:'full'});assert.equal(r.findings.length,5);for(const f of r.findings)assert.ok(!r.text.includes(f.value));assert.ok(r.text.includes('เวลา 10:00 น.'));});
test('disabled entities stay intact and phone does not overlap ID',()=>{const r=redact('1234567890123 081-234-5678 a@example.com',{enabled:['id','phone'],mode:'full'});assert.equal(r.findings.length,2);assert.ok(r.text.includes('a@example.com'));});
test('labels, repeated custom words, Unicode names and JSON remain valid',()=>{const r=redact('{"name":"สมชาย ใจดี","email":"a@example.com","note":"Acme Acme"}',{enabled,mode:'label',custom:['Acme']});assert.equal(r.findings.length,4);assert.equal(JSON.parse(r.text).name,'[NAME]');});
test('empty input and partial masking',()=>{assert.equal(redact('',{enabled,mode:'full'}).text,'');assert.equal(redact('0812345678',{enabled,mode:'partial'}).text,'xxxxxxx678');});
