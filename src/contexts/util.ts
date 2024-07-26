import { v4 as uuidV4 } from "uuid";

import { User } from "@/global/types"

const users: User[] = [
  { id: uuidV4(), email: "admin@softplan.com", name: "softplan adm", password: '123', type: "ADMIN" },
  { id: uuidV4(), email: "user@softplan.com", name: "softplan user", password: '123', type: "USER" },
  { id: uuidV4(), email: "levi.ackerman@google.com", name: "Levi ackerman", password: 'password', type: "USER" },
  { id: uuidV4(), email: "gon.freecss@google.com", name: "Gon Freecss", password: 'password', type: "ADMIN" },
  { id: uuidV4(), email: "killua.zoldyck@google.com", name: "Killua Zoldyck", password: 'password', type: "USER" },
  { id: uuidV4(), email: "yusuke.urameshi@google.com", name: "Yusuke Urameshi", password: 'password', type: "ADMIN" },
  { id: uuidV4(), email: "roronoa.zoro@google.com", name: "Roronoa Zoro", password: 'password', type: "USER" },
  { id: uuidV4(), email: "ichigo.kurosaki@google.com", name: "Ichigo Kurosaki", password: 'password', type: "USER" },
  { id: uuidV4(), email: "cloud.strife@gmail.com", name: "Cloud Strife", password: 'password', type: "ADMIN" },
  { id: uuidV4(), email: "light.yagami@hotmail.com", name: "Light Yagami", password: 'password', type: "ADMIN" },
  { id: uuidV4(), email: "link.hero@gmail.com", name: "Link", password: 'password', type: "USER" },
  { id: uuidV4(), email: "arthas.menethil@yahoo.com", name: "Arthas Menethil", password: 'password', type: "USER" },
  { id: uuidV4(), email: "guts.berserk@outlook.com", name: "Guts", password: 'password', type: "ADMIN" },
  { id: uuidV4(), email: "geralt.rivia@google.com", name: "Geralt of Rivia", password: 'password', type: "USER" },
  { id: uuidV4(), email: "aloy.horizon@outlook.com", name: "Aloy", password: 'password', type: "USER" },
];

export const mockUsersDB = () => {
  localStorage.setItem("users_bd", JSON.stringify(users))
}