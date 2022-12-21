import type { Book } from '../../packages/douban-bookshelf/src/types';

export const book1: Book = {
  id: '1',
  title: 'string',
  ISBN: 'string',
  doubanUrl: 'string',
  coverUrl: 'string',
  subTitle: 'string',
  originName: 'string',
  authors: ['a', 'b'],
  translators: [],
  page: 1,
  publishingHouse: 'string',
  publishingTime: 'string',
  seriesName: 'string',
  score: 1,
  scorePeopleCount: 1,
  contentBrief: 'string',
};

export const book2: Book = {
  id: '2',
  title: '',
  ISBN: '',
  doubanUrl: '',
  coverUrl: '',
  subTitle: '',
  originName: '',
  authors: [],
  translators: [],
  page: 0,
  publishingHouse: '',
  publishingTime: '',
  seriesName: '',
  score: 0,
  scorePeopleCount: 0,
  contentBrief: '',
};

export const bookAlice: Book = {
  id: '36021313',
  doubanUrl: 'https://book.douban.com/subject/36021313/',
  title: '爱丽丝漫游奇境与镜中奇遇',
  ISBN: '9787572607653',
  authors: ['[英]刘易斯·卡罗尔', '[美]马丁·加德纳'],
  score: 9.6,
  scorePeopleCount: 74,
  publishingHouse: '湖南文艺出版社',
  subTitle: '诺顿注释本',
  originName: 'The Annotated Alice',
  publishingTime: '2022-9',
  seriesName: '经典名著诺顿注释本',
  page: 560,
  translators: ['陈荣彬'],
  contentBrief:
    '☆\n' +
    '                      美国科普大师、卡罗尔研究专家耗时55年编写、注释，卡罗尔研究史上的里程碑之作\n' +
    '☆\n' +
    '                      5篇导读、380条注释、近200幅插图，至为丰富完整的名作指南，全方位揭示爱丽丝奇幻之旅的创作秘密\n' +
    '☆\n' +
    '                      特别收录佚失已久的被删片段、多个版本的精美插图、内容丰富的参考资料\n' +
    '-----------------------\n' +
    '《爱丽丝漫游奇境》与《镜中奇遇》是英国著名作家、逻辑学家与数学家刘易斯·卡罗尔创作的儿童文学经典，亦被认为是维多利亚时代胡话文学的典范之作。卡罗尔以丰富的想象力和孩子般的纯真之心，结合逻辑学家与数学家的奇思妙想，书写了爱丽丝的两段奇遇。先是掉入兔子洞，再是进入镜中屋，爱丽丝经历了无数神奇的变化，与柴郡猫、疯帽匠、白骑士这样的古怪角色相遇，在种种离奇的对话与游戏中流露出尖新的童趣与深刻的哲理。\n' +
    '马丁·加德纳五十多年来持续研究《爱丽丝漫游奇境》与《爱丽丝镜中奇遇》，分别于1960年、1990年与1999年出版三部《爱丽丝注释本》，其中包含大量内容详尽的注释与相关研究材料，为当代读者释疑解惑，被公认为卡罗尔研究的经典之作。本书即融合了这三本书的内容，由北美卡罗尔学会主席马克·伯斯坦加以更新完善的一百五十周年豪华纪念版。\n' +
    '本书完整收录两部《爱丽丝》以及被删去的片段《假发黄蜂》。五篇导言与数百条经过修订的注释跨越逻辑、数学、哲学、历史、文学等领域，通过集释与漫谈的方式深度揭示蕴藏于故事细节中的奇思与妙趣。同时，广泛收集全世界的艺术家为爱丽丝故事创作的上百张精美插画，增补更新包括“影视改编清单”“插画家简介”在内的多种研究材料。就如马丁·加德纳所言，“我的任务并不是要进行原创性的研究，而是要尽可能地从既有的文献中取材，撰写注释，让当代的读者更能享受阅读《爱丽丝》的乐趣”。',
  coverUrl: 'https://img9.doubanio.com/view/subject/s/public/s34273315.jpg',
};
