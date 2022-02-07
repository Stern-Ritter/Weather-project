import "./index.css";
import { Weather } from "./components/Weather";

const root = document.querySelector('.weather') as HTMLElement;
const weatherComponent = new Weather(root);
