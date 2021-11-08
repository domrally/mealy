import { Context } from "../../code/main.js";
import { Events } from "./event-service.js";
import { HomePage } from "./home-page.js";
import { LoadingPage } from "./loading-page.js";
import { Page } from "./page.js";

const context = new Context<Page>();

context.state = new LoadingPage();

const { started } = Events;

started.on(() => context.state = new HomePage());
started.on(() => console.log("machine"));

export const { state: PageProxy } = context;
