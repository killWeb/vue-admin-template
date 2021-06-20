import Layout from "@/layout";
const NavigationRouter = [
    {
        path: "/navgation",
        component: Layout,
        children: [
            {
                path: "index",
                name: "navgation",
                component: () => import("@/views/navigation/index"),
                meta: { title: "导航", icon: "el-icon-position" }
            }
        ]
    }
];

export default NavigationRouter;

