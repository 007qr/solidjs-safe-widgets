/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";

import { Router } from "@solidjs/router";
import { lazy } from "solid-js";
import EditorProvider from "./providers/editor-provider";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
}

const routes = [
    {
        path: "/",
        component: lazy(() => import("./App")),
    },
    {
        path: "/safe",
        component: lazy(() => import("./landing-page1")),
    },
];

render(
    () => (
        <EditorProvider pageDetails={{}} pageId={""}>
            <Router>{routes}</Router>
        </EditorProvider>
    ),
    root!
);
