import {ViteReactSSG} from "vite-react-ssg";

import {ssgRouter} from "../core/routes";

/* eslint-disable import/prefer-default-export */
export const createRoot = ViteReactSSG({routes: ssgRouter});
