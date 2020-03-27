'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const {shuffleFisherYates, getRandomInt, addLead0ToNum} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mock.json`;
const OFFERS_AMOUNT_LIMIT = 1000;

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};


const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

const SentenceRestrict = {
  min: 1,
  max: 5,
};

const generateOffers = (amount) => (Array(amount).fill({}).map(() => {
  const titleIndex = getRandomInt(0, TITLES.length - 1);
  const pictureNumber = getRandomInt(PictureRestrict.min, PictureRestrict.max);
  const description = shuffleFisherYates(SENTENCES).slice(SentenceRestrict.min, SentenceRestrict.max).join(` `);
  const typeIndex = getRandomInt(0, Object.keys(OfferType).length - 1);
  const categoryesIndex = getRandomInt(0, CATEGORIES.length - 1);

  return {
    title: TITLES[titleIndex],
    picture: generatePictureFileName(pictureNumber),
    description,
    type: Object.keys(OfferType)[typeIndex],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: [CATEGORIES[categoryesIndex]],
  };
}));

const generatePictureFileName = (number) => `item${addLead0ToNum(number)}.jpg`;

module.exports = {
  name: `--generate`,
  run(args) {
    const [amount] = args;
    const offersAmount = Number.parseInt(amount, 10) || DEFAULT_COUNT;

    if (offersAmount > OFFERS_AMOUNT_LIMIT) {
      console.log(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }

    const mockData = JSON.stringify(generateOffers(offersAmount));

    fs.writeFile(FILE_NAME, mockData, (err) => {
      if (err) {
        console.error(chalk.red(`Can't write data to file...`));
        process.exit(ExitCode.error);
      }

      console.log(chalk.green(`Operation success. File created.`));
    });
  },
};
