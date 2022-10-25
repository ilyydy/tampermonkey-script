import { describe, expect, test, beforeAll, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import * as subjectParser from '../../../packages/douban-bookshelf/src/parser/subject';
import { createWindowFromFile } from '../../util';

import type { Document } from 'happy-dom';

let docAlice: Document;
let docMySkirt: Document;
let docSer: Document;
let docDing: Document;

beforeAll(async () => {
  const windowAlice = await createWindowFromFile(
    fileURLToPath(new URL('../html/subjectAlice.html', import.meta.url))
  );
  docAlice = windowAlice.document;

  const windowMySkirt = await createWindowFromFile(
    fileURLToPath(new URL('../html/subjectMySkirt.html', import.meta.url))
  );
  docMySkirt = windowMySkirt.document;

  const windowMySer = await createWindowFromFile(
    fileURLToPath(new URL('../html/subjectSer.html', import.meta.url))
  );
  docSer = windowMySer.document;

  const windowMyDing = await createWindowFromFile(
    fileURLToPath(new URL('../html/subjectDing.html', import.meta.url))
  );
  docDing = windowMyDing.document;
});

test('getMetaInfo test', () => {
  const metaAlice = subjectParser.getMetaInfo(docAlice as any);
  expect(metaAlice).toEqual({
    id: '36021313',
    doubanUrl: 'https://book.douban.com/subject/36021313/',
    title: '爱丽丝漫游奇境与镜中奇遇',
    ISBN: '9787572607653',
    authors: ['[英]刘易斯·卡罗尔', '[美]马丁·加德纳'],
  });

  const metaMySkirt = subjectParser.getMetaInfo(docMySkirt as any);
  expect(metaMySkirt).toEqual({
    id: '36021541',
    doubanUrl: 'https://book.douban.com/subject/36021541/',
    title: '我的吊带裙',
    ISBN: '9787516923177',
    authors: ['邬霞'],
  });

  const metaSer = subjectParser.getMetaInfo(docSer as any);
  expect(metaSer).toEqual({
    id: '19053330',
    doubanUrl: 'https://book.douban.com/subject/19053330/',
    title: 'SER',
    ISBN: '9785946636971',
    authors: [],
  });

  const metaDing = subjectParser.getMetaInfo(docDing as any);
  expect(metaDing).toEqual({
    id: '35480487',
    doubanUrl: 'https://book.douban.com/subject/35480487/',
    title: '谁看见丁丁了？',
    ISBN: '9787554563557',
    authors: ['[瑞典] 玛丽娅·尼尔松·托勒'],
  });
});

test('getExtraInfo test', () => {
  const extraAlice = subjectParser.getExtraInfo(docAlice as any);
  expect(extraAlice).toEqual({
    publishingHouse: '湖南文艺出版社',
    subTitle: '诺顿注释本',
    originName: 'The Annotated Alice',
    publishingTime: '2022-9',
    seriesName: '经典名著诺顿注释本',
    page: 560,
    translators: ['陈荣彬'],
  });

  const extraMySkirt = subjectParser.getExtraInfo(docMySkirt as any);
  expect(extraMySkirt).toEqual({
    publishingHouse: '华龄出版社',
    subTitle: '',
    originName: '',
    publishingTime: '2022-9-1',
    seriesName: '向日葵书系',
    page: 306,
    translators: [],
  });

  const extraSer = subjectParser.getExtraInfo(docSer as any);
  expect(extraSer).toEqual({
    publishingHouse: 'BOOK ON DEMAND POD',
    subTitle: '',
    originName: '',
    publishingTime: '',
    seriesName: '',
    page: 0,
    translators: [],
  });

  const extraDing = subjectParser.getExtraInfo(docDing as any);
  expect(extraDing).toEqual({
    publishingHouse: '启发童书馆 | 河北教育出版社',
    subTitle: '',
    originName: 'Vem ser Dim？',
    publishingTime: '2021-6',
    seriesName: '启发精选世界优秀畅销绘本',
    page: 0,
    translators: ['王梦达'],
  });
});

test('getScoreInfo test', () => {
  const scoreInfoAlice = subjectParser.getScoreInfo(docAlice as any);
  expect(scoreInfoAlice).toEqual({
    score: 9.6,
    scorePeopleCount: 74,
  });

  const scoreInfoMySkirt = subjectParser.getScoreInfo(docMySkirt as any);
  expect(scoreInfoMySkirt).toEqual({
    score: 8.6,
    scorePeopleCount: 79,
  });

  const scoreInfoSer = subjectParser.getScoreInfo(docSer as any);
  expect(scoreInfoSer).toEqual({
    score: 0,
    scorePeopleCount: 0,
  });

  const scoreInfoDing = subjectParser.getScoreInfo(docDing as any);
  expect(scoreInfoDing).toEqual({
    score: 0,
    scorePeopleCount: 0,
  });
});

test('getContentBrief test', () => {
  const briefAlice = subjectParser.getContentBrief(docAlice as any);
  expect(briefAlice).length.is.greaterThan(10);

  const briefMySkirt = subjectParser.getContentBrief(docMySkirt as any);
  expect(briefMySkirt).length.is.greaterThan(10);

  const briefSer = subjectParser.getContentBrief(docSer as any);
  expect(briefSer).to.equal('');

  const briefDing = subjectParser.getContentBrief(docDing as any);
  expect(briefDing).length.is.greaterThan(10);
});

test('getCoverUrl test', () => {
  const coverUrlAlice = subjectParser.getCoverUrl(docAlice as any);
  expect(coverUrlAlice).toBe(
    'https://img9.doubanio.com/view/subject/s/public/s34273315.jpg'
  );

  const coverUrlMySkirt = subjectParser.getCoverUrl(docMySkirt as any);
  expect(coverUrlMySkirt).toBe(
    'https://img9.doubanio.com/view/subject/s/public/s34274175.jpg'
  );

  const coverUrlSer = subjectParser.getCoverUrl(docSer as any);
  expect(coverUrlSer).toBe(
    'https://img3.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-lpic.gif'
  );

  const coverUrlDing = subjectParser.getCoverUrl(docDing as any);
  expect(coverUrlDing).toBe(
    'https://img2.doubanio.com/view/subject/s/public/s33932932.jpg'
  );
});

test('getAlreadyReadButton test', () => {
  const btnAlice = subjectParser.getAlreadyReadButton(docAlice as any);
  expect(btnAlice?.getAttribute('name')?.endsWith('collect')).toBe(true);

  const btnMySkirt = subjectParser.getAlreadyReadButton(docMySkirt as any);
  expect(btnMySkirt?.getAttribute('name')?.endsWith('collect')).toBe(true);

  const btnUrlSer = subjectParser.getAlreadyReadButton(docSer as any);
  expect(btnUrlSer?.getAttribute('name')?.endsWith('collect')).toBe(true);

  const btnDing = subjectParser.getAlreadyReadButton(docDing as any);
  expect(btnDing?.getAttribute('name')?.endsWith('collect')).toBe(true);
});
