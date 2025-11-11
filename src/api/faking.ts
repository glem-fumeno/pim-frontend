import { faker } from "@faker-js/faker";

export function randomFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

const platforms: string[] = [];
for (let i = 0; i < 5; i++) {
  platforms.push(
    faker.company.buzzNoun().toLowerCase().replace(" ", "").replace("_", ""),
  );
}
const languages: string[] = ["en", "de", "es", "it", "fr"];

const channels: string[] = [];
languages.forEach((language) => {
  platforms.forEach((platform) => {
    channels.push(`${platform}_${language}`);
  });
});

export const fake = {
  store: () => faker.company.name(),
  date: () => faker.date.recent({ days: 3 }),
  channel: () => randomFrom(channels),
};
