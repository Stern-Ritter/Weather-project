import "./index.css";
import { Weather } from "./Weather";

const root = document.querySelector('.weather') as HTMLElement;
const weatherComponent = new Weather(root);
