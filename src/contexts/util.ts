import { User } from "../types"

const users: User[] = [
  { id: Math.random().toString(36).substring(2), email: "adm@email.com", name: "adm", password: '123456', type: "ADMIN" },
  { id: Math.random().toString(36).substring(2), email: "levi.ackerman@google.com", name: "Levi ackerman", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "gon.freecss@google.com", name: "Gon Freecss", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "killua.zoldyck@google.com", name: "Killua Zoldyck", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "yusuke.urameshi@google.com", name: "	Yusuke Urameshi", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "roronoa.zoro@google.com", name: "Roronoa Zoro", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "vegeta@google.com", name: "Vegeta IV", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "ichigo.kurosaki@google.com", name: "Ichigo Kurosaki", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "cloud.strife@gmail.com", name: "Cloud Strife", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "light.yagami@hotmail.com", name: "Light Yagami", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "link.hero@gmail.com", name: "Link", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "arthas.menethil@yahoo.com", name: "Arthas Menethil", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "guts.berserk@outlook.com", name: "Guts", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "geralt.rivia@google.com", name: "Geralt of Rivia", password: Math.random().toString(36).substring(2), type: "USER" },
  { id: Math.random().toString(36).substring(2), email: "aloy.horizon@outlook.com", name: "Aloy", password: Math.random().toString(36).substring(2), type: "USER" },
];


export const mockUsersDB = () => {
  localStorage.setItem("users_bd", JSON.stringify(users))
}