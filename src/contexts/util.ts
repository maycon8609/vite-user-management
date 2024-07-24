import { faker } from '@faker-js/faker'

import { User } from "../types"

const users: User[] = [
  { id: faker.string.uuid(), email: "admin@email.com", name: "administrador", password: '123', type: "ADMIN" },
  { id: faker.string.uuid(), email: "levi.ackerman@google.com", name: "Levi ackerman", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "gon.freecss@google.com", name: "Gon Freecss", password: faker.internet.password(), type: "ADMIN" },
  { id: faker.string.uuid(), email: "killua.zoldyck@google.com", name: "Killua Zoldyck", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "yusuke.urameshi@google.com", name: "	Yusuke Urameshi", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "roronoa.zoro@google.com", name: "Roronoa Zoro", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "ichigo.kurosaki@google.com", name: "Ichigo Kurosaki", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "cloud.strife@gmail.com", name: "Cloud Strife", password: faker.internet.password(), type: "ADMIN" },
  { id: faker.string.uuid(), email: "light.yagami@hotmail.com", name: "Light Yagami", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "link.hero@gmail.com", name: "Link", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "arthas.menethil@yahoo.com", name: "Arthas Menethil", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "guts.berserk@outlook.com", name: "Guts", password: faker.internet.password(), type: "ADMIN" },
  { id: faker.string.uuid(), email: "geralt.rivia@google.com", name: "Geralt of Rivia", password: faker.internet.password(), type: "USER" },
  { id: faker.string.uuid(), email: "aloy.horizon@outlook.com", name: "Aloy", password: faker.internet.password(), type: "USER" },
];


export const mockUsersDB = () => {
  localStorage.setItem("users_bd", JSON.stringify(users))
}