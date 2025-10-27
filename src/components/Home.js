import { jsx as _jsx } from "react/jsx-runtime";
import { Hero } from './Hero';
const Home = () => {
    return (_jsx("div", { className: 'min-h-screen', children: _jsx(Hero, {}) }));
};
export default Home;
