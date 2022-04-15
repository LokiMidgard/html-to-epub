import test from 'ava';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { EPub, EpubOptions } from '../src/index';

async function runTestOn (input: string): Promise<boolean> {
  const params = JSON.parse(readFileSync(resolve(__dirname, `./${input}.json`), { encoding: 'utf8' })) as EpubOptions;
  const output = resolve(__dirname, `./${input}.epub`);

  const epub = new EPub(params, output);
  const op = await epub.render();
  return op.result === 'ok';
}

test.serial('Ebook > generate v2', async (t) => {
  t.is(await runTestOn('book-v2'), true);
});

test.serial('Ebook > generate v3', async (t) => {
  t.is(await runTestOn('book-v3'), true);
});

test.serial('HTML Page > generate v2', async (t) => {
  t.is(await runTestOn('article-v2'), true);
});

test.serial('HTML Page > generate v3', async (t) => {
  t.is(await runTestOn('article-v3'), true);
});
