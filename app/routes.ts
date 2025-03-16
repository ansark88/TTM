import { type RouteConfig,route, index, prefix, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("signup", "routes/signup.tsx"),

    ...prefix("members", [
        layout("routes/members/member-layout.tsx",[
            route(":id", "routes/members/members.$memberId.tsx")
        ]),
    ]),
] satisfies RouteConfig;
