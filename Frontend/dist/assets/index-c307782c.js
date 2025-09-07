import { R as React, P as PropTypes, j as jsxRuntimeExports, r as react, _ as _default, B as BanknotesIcon, U as UsersIcon, a as UserPlusIcon, C as ChartBarIcon, b as BellIcon, c as PlusCircleIcon, S as ShoppingCartIcon, d as CreditCardIcon, L as LockOpenIcon, e as ClockIcon, f as CheckCircleIcon, E as EllipsisVerticalIcon, A as ArrowUpIcon, g as axios, h as reactExports, i as PencilSquareIcon, k as UserCircleIcon, l as CurrencyDollarIcon, I as IdentificationIcon, u as useNavigate, m as EyeIcon, T as TrashIcon, M as MagnifyingGlassIcon, n as UserPlusIcon$1, o as useParams, p as ArrowLeftIcon, q as PencilIcon, s as BriefcaseIcon, t as CalendarDaysIcon, v as MapPinIcon, w as EnvelopeIcon, x as PhoneIcon, y as BuildingOfficeIcon, z as EyeIcon$1, D as DocumentArrowDownIcon, F as TrashIcon$1, G as PlusIcon, H as PhotoIcon, J as PencilIcon$1, K as ArrowTopRightOnSquareIcon, N as PhotoIcon$1, O as HomeIcon, Q as Navigate, V as CloudArrowUpIcon, W as Link, X as create$3, Y as create$6, Z as create$5, $ as create$2, a0 as create$7, a1 as useForm, a2 as useFieldArray, a3 as Controller, a4 as o, a5 as MagnifyingGlassIcon$1, a6 as ArrowDownTrayIcon$1, a7 as ExclamationTriangleIcon$1, a8 as BuildingOfficeIcon$1, a9 as ArrowLeftIcon$1, aa as UserIcon, ab as CurrencyDollarIcon$1, ac as BriefcaseIcon$1, ad as UserGroupIcon, ae as PhoneIcon$1, af as EnvelopeIcon$1, ag as MapPinIcon$1, ah as DocumentTextIcon, ai as ClipboardDocumentListIcon, aj as CalendarIcon, ak as ExclamationCircleIcon, al as FunnelIcon, am as BuildingStorefrontIcon, an as ListBulletIcon, ao as PrinterIcon, ap as CheckIcon, aq as XMarkIcon, ar as ClipboardDocumentIcon, as as PlusIcon$1, at as BellIcon$1, au as ClockIcon$1, av as InformationCircleIcon, aw as TruckIcon, ax as ShoppingCartIcon$1, ay as CheckCircleIcon$1, az as ArrowDownTrayIcon$2, aA as ChartBarIcon$1, aB as ArrowTrendingUpIcon, aC as ArrowTrendingDownIcon, aD as ChevronLeftIcon, aE as TableCellsIcon, aF as UserGroupIcon$1, aG as DocumentTextIcon$1, aH as BuildingOffice2Icon, aI as WrenchScrewdriverIcon, aJ as ServerStackIcon, aK as RectangleStackIcon, aL as useLocation, aM as NavLink, aN as Bars3Icon, aO as Cog6ToothIcon, aP as Routes, aQ as Route, aR as Outlet, aS as client, aT as BrowserRouter } from "./vendor-283d0ab4.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";
function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "blue",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false
  };
  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MaterialTailwind.Provider, { value, children });
}
function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);
  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }
  return context;
}
MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";
MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired
};
const setOpenSidenav = (dispatch, value) => dispatch({ type: "OPEN_SIDENAV", value });
const setSidenavType = (dispatch, value) => dispatch({ type: "SIDENAV_TYPE", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
function StatisticsCard({ color, icon: icon2, title, value, footer }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "border border-blue-gray-100 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.CardHeader,
      {
        variant: "gradient",
        color,
        floated: false,
        shadow: false,
        className: "absolute grid h-12 w-12 place-items-center",
        children: icon2
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-4 text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal text-blue-gray-600", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "blue-gray", children: value })
    ] }),
    footer && /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardFooter, { className: "border-t border-blue-gray-50 p-4", children: footer })
  ] });
}
StatisticsCard.defaultProps = {
  color: "blue",
  footer: null
};
StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red"
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node
};
StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";
({
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object
});
({
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  action: PropTypes.node
});
function StatisticsChart({ color, chart, title, description, footer }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "border border-blue-gray-100 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color, floated: false, shadow: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(_default, { ...chart }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "px-6 pt-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal text-blue-gray-600", children: description })
    ] }),
    footer && /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardFooter, { className: "border-t border-blue-gray-50 px-6 py-5", children: footer })
  ] });
}
StatisticsChart.defaultProps = {
  color: "blue",
  footer: null
};
StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red"
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node
};
StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";
const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Today's Money",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week"
    }
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Today's Users",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month"
    }
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "New Clients",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday"
    }
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Sales",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday"
    }
  }
];
const chartsConfig = {
  chart: {
    toolbar: {
      show: false
    }
  },
  title: {
    show: ""
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300
      }
    }
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true
      }
    },
    padding: {
      top: 5,
      right: 20
    }
  },
  fill: {
    opacity: 0.8
  },
  tooltip: {
    theme: "dark"
  }
};
const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40]
    }
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5
      }
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"]
    }
  }
};
const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500]
    }
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round"
    },
    markers: {
      size: 5
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    }
  }
};
const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500]
    }
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round"
    },
    markers: {
      size: 5
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    }
  }
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500]
    }
  ]
};
const statisticsChartsData = [
  {
    color: "white",
    title: "Website View",
    description: "Last Campaign Performance",
    footer: "campaign sent 2 days ago",
    chart: websiteViewsChart
  },
  {
    color: "white",
    title: "Daily Sales",
    description: "15% increase in today sales",
    footer: "updated 4 min ago",
    chart: dailySalesChart
  },
  {
    color: "white",
    title: "Completed Tasks",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart
  }
];
const projectsTableData = [
  {
    img: "/img/logo-xd.svg",
    name: "Material XD Version",
    members: [
      { img: "/img/team-1.jpeg", name: "Romina Hadid" },
      { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
      { img: "/img/team-3.jpeg", name: "Jessica Doe" },
      { img: "/img/team-4.jpeg", name: "Alexander Smith" }
    ],
    budget: "$14,000",
    completion: 60
  },
  {
    img: "/img/logo-atlassian.svg",
    name: "Add Progress Track",
    members: [
      { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
      { img: "/img/team-4.jpeg", name: "Alexander Smith" }
    ],
    budget: "$3,000",
    completion: 10
  },
  {
    img: "/img/logo-slack.svg",
    name: "Fix Platform Errors",
    members: [
      { img: "/img/team-3.jpeg", name: "Jessica Doe" },
      { img: "/img/team-1.jpeg", name: "Romina Hadid" }
    ],
    budget: "Not set",
    completion: 100
  },
  {
    img: "/img/logo-spotify.svg",
    name: "Launch our Mobile App",
    members: [
      { img: "/img/team-4.jpeg", name: "Alexander Smith" },
      { img: "/img/team-3.jpeg", name: "Jessica Doe" },
      { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
      { img: "/img/team-1.jpeg", name: "Romina Hadid" }
    ],
    budget: "$20,500",
    completion: 100
  },
  {
    img: "/img/logo-jira.svg",
    name: "Add the New Pricing Page",
    members: [{ img: "/img/team-4.jpeg", name: "Alexander Smith" }],
    budget: "$500",
    completion: 25
  },
  {
    img: "/img/logo-invision.svg",
    name: "Redesign New Online Shop",
    members: [
      { img: "/img/team-1.jpeg", name: "Romina Hadid" },
      { img: "/img/team-4.jpeg", name: "Alexander Smith" }
    ],
    budget: "$2,000",
    completion: 40
  }
];
const ordersOverviewData = [
  {
    icon: BellIcon,
    color: "text-blue-gray-300",
    title: "$2400, Design changes",
    description: "22 DEC 7:20 PM"
  },
  {
    icon: PlusCircleIcon,
    color: "text-blue-gray-300",
    title: "New order #1832412",
    description: "21 DEC 11 PM"
  },
  {
    icon: ShoppingCartIcon,
    color: "text-blue-gray-300",
    title: "Server payments for April",
    description: "21 DEC 9:34 PM"
  },
  {
    icon: CreditCardIcon,
    color: "text-blue-gray-300",
    title: "New card added for order #4395133",
    description: "20 DEC 2:20 AM"
  },
  {
    icon: LockOpenIcon,
    color: "text-blue-gray-300",
    title: "Unlock packages for development",
    description: "18 DEC 4:54 AM"
  },
  {
    icon: BanknotesIcon,
    color: "text-blue-gray-300",
    title: "New order #9583120",
    description: "17 DEC"
  }
];
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4", children: statisticsCardsData.map(({ icon: icon2, title, footer, ...rest }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatisticsCard,
      {
        ...rest,
        title,
        icon: React.createElement(icon2, {
          className: "w-6 h-6 text-white"
        }),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { className: "font-normal text-blue-gray-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: footer.color, children: footer.value }),
          " ",
          footer.label
        ] })
      },
      title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3", children: statisticsChartsData.map((props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatisticsChart,
      {
        ...props,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Typography,
          {
            variant: "small",
            className: "flex items-center font-normal text-blue-gray-600",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClockIcon, { strokeWidth: 2, className: "h-4 w-4 text-blue-gray-400" }),
              " ",
              props.footer
            ]
          }
        )
      },
      props.title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.CardHeader,
          {
            floated: false,
            shadow: false,
            color: "transparent",
            className: "m-0 flex items-center justify-between p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-1", children: "Projects" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  react.Typography,
                  {
                    variant: "small",
                    className: "flex items-center gap-1 font-normal text-blue-gray-600",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircleIcon, { strokeWidth: 3, className: "h-4 w-4 text-blue-gray-200" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "30 done" }),
                      " this month"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Menu, { placement: "left-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.MenuHandler, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { size: "sm", variant: "text", color: "blue-gray", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EllipsisVerticalIcon,
                  {
                    strokeWidth: 3,
                    fill: "currenColor",
                    className: "h-6 w-6"
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.MenuList, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.MenuItem, { children: "Action" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.MenuItem, { children: "Another Action" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.MenuItem, { children: "Something else here" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "overflow-x-scroll px-0 pt-0 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["companies", "members", "budget", "completion"].map(
            (el) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "border-b border-blue-gray-50 py-3 px-6 text-left",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    className: "text-[11px] font-medium uppercase text-blue-gray-400",
                    children: el
                  }
                )
              },
              el
            )
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: projectsTableData.map(
            ({ img, name, members, budget, completion }, key) => {
              const className = `py-3 px-5 ${key === projectsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Avatar, { src: img, alt: name, size: "sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "font-bold",
                      children: name
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: members.map(({ img: img2, name: name2 }, key2) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: name2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Avatar,
                  {
                    src: img2,
                    alt: name2,
                    size: "xs",
                    variant: "circular",
                    className: `cursor-pointer border-2 border-white ${key2 === 0 ? "" : "-ml-2.5"}`
                  }
                ) }, name2)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    className: "text-xs font-medium text-blue-gray-600",
                    children: budget
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-10/12", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    react.Typography,
                    {
                      variant: "small",
                      className: "mb-1 block text-xs font-medium text-blue-gray-600",
                      children: [
                        completion,
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Progress,
                    {
                      value: completion,
                      variant: "gradient",
                      color: completion === 100 ? "green" : "blue",
                      className: "h-1"
                    }
                  )
                ] }) })
              ] }, name);
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "border border-blue-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.CardHeader,
          {
            floated: false,
            shadow: false,
            color: "transparent",
            className: "m-0 p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-2", children: "Orders Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Typography,
                {
                  variant: "small",
                  className: "flex items-center gap-1 font-normal text-blue-gray-600",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowUpIcon,
                      {
                        strokeWidth: 3,
                        className: "h-3.5 w-3.5 text-green-500"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "24%" }),
                    " this month"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "pt-0", children: ordersOverviewData.map(
          ({ icon: icon2, color, title, description }, key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1 ? "after:h-0" : "after:h-4/6"}`,
                children: React.createElement(icon2, {
                  className: `!w-5 !h-5 ${color}`
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Typography,
                {
                  variant: "small",
                  color: "blue-gray",
                  className: "block font-medium",
                  children: title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Typography,
                {
                  as: "span",
                  variant: "small",
                  className: "text-xs font-medium text-blue-gray-500",
                  children: description
                }
              )
            ] })
          ] }, title)
        ) })
      ] })
    ] })
  ] });
}
axios.defaults.baseURL = "https://lead-inmobiliaria.com";
axios.defaults.withCredentials = true;
const AuthContext = reactExports.createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [authChecked, setAuthChecked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Verificando autenticación en AuthContext...");
        const response = await axios.get("/api/check-auth", {
          withCredentials: true
        });
        console.log("Respuesta de autenticación en AuthContext:", response.data);
        if (response.data.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error de autenticación en AuthContext:", err);
        setUser(null);
        setIsAuthenticated(false);
        setError(err.message);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);
  const login = async (credentials) => {
    var _a, _b;
    try {
      setLoading(true);
      const response = await axios.post("/api/signin", credentials);
      if (response.data.success) {
        const userData = response.data.user;
        console.log("Usuario autenticado:", userData);
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      }
      return { success: false };
    } catch (error2) {
      console.error("Login error:", ((_a = error2.response) == null ? void 0 : _a.data) || error2);
      return { success: false, error: ((_b = error2.response) == null ? void 0 : _b.data) || error2.message };
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/logout");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error2) {
      console.error("Error during logout:", error2);
    } finally {
      setLoading(false);
    }
  };
  const refreshAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/check-auth");
      console.log("Refresh auth response:", response.data);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response.data.user;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (error2) {
      console.error("Error refreshing auth status:", error2);
      setUser(null);
      setIsAuthenticated(false);
      return null;
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: {
    user,
    isAuthenticated,
    loading,
    error,
    authChecked,
    setUser,
    login,
    logout,
    refreshAuthStatus
  }, children });
};
const useAuth = () => reactExports.useContext(AuthContext);
function Profile() {
  const { user, isAuthenticated, loading: authLoading, authChecked, refreshAuthStatus } = useAuth();
  const [userData, setUserData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState("");
  const [profilePhoto, setProfilePhoto] = reactExports.useState("/img/user_icon.svg");
  const [isUpdatingPhoto, setIsUpdatingPhoto] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [nominas, setNominas] = reactExports.useState([]);
  const [activeTab, setActiveTab] = reactExports.useState("perfil");
  reactExports.useEffect(() => {
    const fetchData = async () => {
      console.log("Estado de autenticación en Profile:", {
        authLoading,
        isAuthenticated,
        authChecked,
        user: user ? "existe" : "no existe"
      });
      if (authChecked && !authLoading && !user) {
        console.log("No hay usuario pero auth ya se verificó, intentando refrescar...");
        const refreshedUser = await refreshAuthStatus();
        if (!refreshedUser) {
          console.log("No se pudo obtener usuario después de refrescar");
          setLoading(false);
          return;
        }
      }
      if (user && isAuthenticated) {
        console.log("Cargando datos del usuario:", user);
        await loadUserData();
      } else if (authChecked) {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, isAuthenticated, authLoading, authChecked]);
  const loadUserData = async () => {
    try {
      setLoading(true);
      setError("");
      if (!user || !user.id) {
        throw new Error("Usuario no disponible o sin ID");
      }
      console.log("Consultando usuario con ID:", user.id);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users/${user.id}`, {
        credentials: "include"
      });
      console.log("Respuesta status:", response.status);
      const data = await response.json();
      if (!data.user) {
        throw new Error("No se recibieron datos del usuario del servidor");
      }
      console.log("Datos del usuario recibidos:", data.user);
      console.log("empleado_id:", data.user.empleado_id);
      if (data.user.empleado_id === void 0 || data.user.empleado_id === null) {
        console.log("empleado_id no encontrado, buscando en empleados-api...");
        const empleadoResponse = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/by-user/${user.id}`, {
          credentials: "include"
        });
        const empleadoData = await empleadoResponse.json();
        console.log("Respuesta de empleados-api:", empleadoData);
        if (empleadoData.success) {
          data.user.empleado_id = empleadoData.empleado._id;
          console.log("empleado_id asignado:", data.user.empleado_id);
        }
      }
      console.log(data.user);
      if (data.success) {
        setUserData(data.user);
        if (data.user.foto_perfil) {
          const photoUrl = `${"https://lead-inmobiliaria.com"}${data.user.foto_perfil}`;
          console.log("=== CARGA DE FOTO DE PERFIL ===");
          console.log("Ruta en BD:", data.user.foto_perfil);
          console.log("URL construida:", photoUrl);
          console.log("VITE_API_URL:", "https://lead-inmobiliaria.com");
          console.log("Estado actual de profilePhoto:", profilePhoto);
          const finalPhotoUrl = await loadImageWithFallback(photoUrl);
          console.log("🖼️ URL final de la foto:", finalPhotoUrl);
          setProfilePhoto(finalPhotoUrl);
          if (finalPhotoUrl.startsWith("data:")) {
            console.log("✅ Imagen cargada usando base64 (fallback)");
          } else {
            console.log("✅ Imagen cargada usando URL directa");
          }
        } else {
          console.log("ℹ️ Usuario no tiene foto de perfil configurada");
        }
        if (data.user.empleado_id) {
          await loadNominas(data.user.empleado_id);
        }
      } else {
        setError("No se pudo cargar la información del usuario");
      }
    } catch (error2) {
      console.error("Error al cargar datos del usuario:", error2);
      setError("Error al cargar datos del usuario: " + error2.message);
    } finally {
      setLoading(false);
    }
  };
  const loadNominas = async (empleadoId) => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/nominas-api/empleado/${empleadoId}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setNominas(data.nominas || []);
      }
    } catch (error2) {
      console.error("Error al cargar nóminas:", error2);
    }
  };
  const loadImageWithFallback = async (imageUrl) => {
    try {
      console.log("🖼️ Intentando cargar imagen:", imageUrl);
      try {
        const timestampedUrl = `${imageUrl}?t=${Date.now()}`;
        console.log("🔄 Intentando carga directa con timestamp:", timestampedUrl);
        const img = new Image();
        const imageTest = await new Promise((resolve, reject) => {
          img.onload = () => {
            console.log("✅ Imagen cargada exitosamente (directo)");
            console.log("Dimensiones:", img.width, "x", img.height);
            resolve({ success: true, width: img.width, height: img.height, method: "directo" });
          };
          img.onerror = (e) => {
            console.error("❌ Error al cargar imagen directamente:", e);
            reject(new Error("No se pudo cargar la imagen directamente"));
          };
          img.src = timestampedUrl;
          setTimeout(() => {
            reject(new Error("Timeout al cargar imagen directamente"));
          }, 5e3);
        });
        console.log("✅ Carga directa exitosa, usando URL original");
        return imageUrl;
      } catch (directError) {
        console.log("⚠️ Carga directa falló, intentando con base64...");
      }
      console.log("🔄 Intentando carga con base64...");
      const response = await fetch(imageUrl, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const blob = await response.blob();
      console.log("✅ Blob creado:", blob.size, "bytes, tipo:", blob.type);
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base642 = reader.result;
          console.log("✅ Base64 generado, longitud:", base642.length);
          resolve(base642);
        };
        reader.onerror = () => reject(new Error("Error al convertir a base64"));
      });
      reader.readAsDataURL(blob);
      const base64 = await base64Promise;
      console.log("✅ Usando base64 como fallback");
      return base64;
    } catch (error2) {
      console.error("❌ Error en carga de imagen con fallback:", error2);
      return imageUrl;
    }
  };
  const handleChangeProfilePhoto = () => {
    fileInputRef.current.click();
  };
  const handlePhotoSelected = async (e) => {
    if (!e.target.files || !e.target.files[0])
      return;
    const file = e.target.files[0];
    console.log("=== INICIO DE SUBIDA DE FOTO ===");
    console.log("Archivo seleccionado:", {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    });
    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona una imagen válida");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen debe ser menor a 5MB");
      return;
    }
    setIsUpdatingPhoto(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("foto_perfil", file);
      console.log("FormData creado:", formData);
      console.log("Enviando foto al servidor...");
      console.log("URL de envío:", `${"https://lead-inmobiliaria.com"}/api/users/${user.id}/upload-photo`);
      console.log("ID del usuario:", user.id);
      const response = await axios.post(
        `/api/users/${user.id}/upload-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
          timeout: 3e4
          // 30 segundos de timeout
        }
      );
      console.log("Respuesta del servidor:", response.data);
      if (response.data.success) {
        const photoUrl = response.data.foto_perfil;
        console.log("Foto actualizada exitosamente:", photoUrl);
        setSuccess("¡Foto de perfil actualizada correctamente!");
        setError("");
        handlePhotoUpdated(photoUrl);
        setTimeout(() => {
          setSuccess("");
        }, 3e3);
        if (user && user.id === user.id) {
          await refreshAuthStatus();
        }
      } else {
        console.error("Error al actualizar foto:", response.data.message);
        setError(`Error al actualizar la foto: ${response.data.message}`);
        setSuccess("");
      }
    } catch (error2) {
      console.error("=== ERROR EN SUBIDA DE FOTO ===");
      console.error("Error completo:", error2);
      if (error2.response) {
        console.error("Respuesta del servidor:", error2.response.data);
        console.error("Status:", error2.response.status);
        console.error("Headers:", error2.response.headers);
        if (error2.response.status === 400) {
          setError(`Error de validación: ${error2.response.data.message || "Archivo no válido"}`);
        } else if (error2.response.status === 401) {
          setError("No tienes permisos para realizar esta acción");
        } else if (error2.response.status === 413) {
          setError("El archivo es demasiado grande");
        } else {
          setError(`Error del servidor: ${error2.response.data.message || "Error desconocido"}`);
        }
      } else if (error2.request) {
        console.error("No se recibió respuesta del servidor");
        console.error("Request:", error2.request);
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        console.error("Error en la configuración:", error2.message);
        setError(`Error de configuración: ${error2.message}`);
      }
    } finally {
      setIsUpdatingPhoto(false);
      console.log("=== FIN DE SUBIDA DE FOTO ===");
    }
  };
  const handlePhotoUpdated = async (photoUrl) => {
    console.log("=== MANEJANDO FOTO ACTUALIZADA ===");
    console.log("URL recibida:", photoUrl);
    let fullPhotoUrl = photoUrl;
    if (!photoUrl.startsWith("http")) {
      fullPhotoUrl = `${"https://lead-inmobiliaria.com"}${photoUrl}`;
    }
    console.log("URL completa construida:", fullPhotoUrl);
    const finalPhotoUrl = await loadImageWithFallback(fullPhotoUrl);
    console.log("🖼️ URL final de la nueva foto:", finalPhotoUrl);
    setProfilePhoto(finalPhotoUrl);
    setError("");
    setTimeout(() => {
      loadUserData();
    }, 1e3);
  };
  const formatDate = (dateString) => {
    if (!dateString)
      return "No disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-10 max-w-screen-lg px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "ml-4", children: "Cargando información..." })
  ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 p-4 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "red", children: error }) }) : success ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 p-4 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "green", children: success }) }) : userData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-6 items-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Avatar,
          {
            src: profilePhoto,
            alt: userData.prim_nom || "Usuario",
            size: "xxl",
            className: "border border-blue-gray-100 p-1",
            onError: (e) => {
              console.error("❌ Error al cargar imagen de perfil:", profilePhoto);
              console.error("Elemento de imagen:", e.target);
              console.error("Tipo de URL:", profilePhoto.startsWith("data:") ? "base64" : "URL directa");
              if (profilePhoto.startsWith("data:")) {
                console.log("🔄 Reintentando carga de base64...");
                setTimeout(() => {
                  e.target.src = profilePhoto;
                }, 1e3);
              } else {
                e.target.src = "/img/user_icon.svg";
              }
            },
            onLoad: () => {
              console.log("✅ Imagen de perfil cargada exitosamente:", profilePhoto);
              console.log("Tipo de carga:", profilePhoto.startsWith("data:") ? "base64" : "URL directa");
            }
          }
        ),
        isUpdatingPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-8 w-8 text-white" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full text-white",
            onClick: handleChangeProfilePhoto,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilSquareIcon, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            ref: fileInputRef,
            className: "hidden",
            accept: "image/*",
            onChange: handlePhotoSelected
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "blue-gray", className: "mb-1", children: [
          userData.prim_nom,
          " ",
          userData.segun_nom,
          " ",
          userData.apell_pa,
          " ",
          userData.apell_ma
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "font-normal mb-1", children: userData.pust || userData.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: userData.email }),
        userData.telefono && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: [
          "Tel: ",
          userData.telefono
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { value: activeTab, onChange: (value) => setActiveTab(value), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tab, { value: "perfil", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { className: "w-5 h-5" }),
          "Perfil"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tab, { value: "nominas", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon, { className: "w-5 h-5" }),
          "Nóminas"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsBody, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "perfil", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información Personal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Nombre Completo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: [
                  userData.prim_nom,
                  " ",
                  userData.segun_nom,
                  " ",
                  userData.apell_pa,
                  " ",
                  userData.apell_ma
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Correo Electrónico" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: userData.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Teléfono" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: userData.telefono || "No especificado" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Fecha de Nacimiento" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: formatDate(userData.fecha_na) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Dirección" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Calle" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: userData.calle || "No especificado" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Número Exterior" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: userData.nun_ex || "No especificado" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Número Interior" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: userData.num_in || "No especificado" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Código Postal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-normal", children: userData.codigo || "No especificado" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "nominas", children: nominas.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Historial de Nóminas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Fecha" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Concepto" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Monto" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Acciones" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: nominas.map((nomina, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: formatDate(nomina.fecha) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal truncate max-w-[160px]", children: nomina.conceptoDePago }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: [
                "$",
                parseFloat(nomina.salario).toLocaleString("es-MX")
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: nomina.url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => {
                    const url = nomina.url.startsWith("http") ? nomina.url : `${"https://lead-inmobiliaria.com"}${nomina.url}`;
                    window.open(url, "_blank");
                  },
                  className: "text-gray-500 hover:text-gray-700 transition-colors",
                  title: "Descargar PDF",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" }) })
                }
              ) }) })
            ] }, index2)) })
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 bg-blue-gray-50/50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IdentificationIcon, { className: "h-16 w-16 mx-auto text-blue-gray-300 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "No hay nóminas disponibles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "gray", className: "font-normal mt-2 max-w-lg mx-auto", children: "No se encontraron registros de nóminas para este usuario. Si crees que esto es un error, contacta a tu administrador." })
        ] }) })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "red", children: "No se encontró información del usuario" }) }) }) }) });
}
const capitalizeRole = (role) => {
  if (!role)
    return "Usuario";
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};
function UsersTable() {
  const [users, setUsers] = reactExports.useState([]);
  const [filteredUsers, setFilteredUsers] = reactExports.useState([]);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const [selectedUserData, setSelectedUserData] = reactExports.useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.authenticated || data.success) {
          const user = data.user || data;
          const userRole = (user == null ? void 0 : user.role) || "";
          const admin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
          setIsAdmin(admin);
          if (!admin) {
            navigate("/dashboard/home");
          }
        }
      } catch (error) {
        console.error("Error al verificar permisos:", error);
        navigate("/dashboard/home");
      }
    };
    checkAdminAccess();
  }, [navigate]);
  reactExports.useEffect(() => {
    fetchUsers();
  }, []);
  reactExports.useEffect(() => {
    if (selectedUser) {
      fetchUserDetailsWithoutRedirect(selectedUser);
    } else {
      setSelectedUserData(null);
    }
  }, [selectedUser]);
  reactExports.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = users.filter((user) => {
        const nombreCompleto = `${user.prim_nom || ""} ${user.segun_nom || ""} ${user.apell_pa || ""} ${user.apell_ma || ""}`.toLowerCase();
        const email = (user.email || "").toLowerCase();
        const puesto = (user.pust || "").toLowerCase();
        const telefono = (user.telefono || "").toLowerCase();
        const role = (user.role || "").toLowerCase();
        return nombreCompleto.includes(searchTermLower) || email.includes(searchTermLower) || puesto.includes(searchTermLower) || telefono.includes(searchTermLower) || role.includes(searchTermLower);
      });
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);
  const fetchUsers = async () => {
    try {
      console.log("🔄 Cargando usuarios...");
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        console.log(`📊 Usuarios obtenidos: ${data.users.length}`);
        const usuariosConFotos = data.users.map((user) => {
          if (user.foto_perfil && !user.foto_perfil.startsWith("http")) {
            user.foto_perfil = `${"https://lead-inmobiliaria.com"}${user.foto_perfil}`;
          }
          return user;
        });
        const usuariosOrdenados = [...usuariosConFotos].sort((a, b) => {
          var _a;
          const isAdminA = (a.role || "").toLowerCase().includes("admin");
          const isAdminB = (b.role || "").toLowerCase().includes("admin");
          if (isAdminA && !isAdminB)
            return -1;
          if (!isAdminA && isAdminB)
            return 1;
          return ((_a = a.prim_nom) == null ? void 0 : _a.localeCompare(b.prim_nom || "")) || 0;
        });
        setUsers(usuariosOrdenados);
        setFilteredUsers(usuariosOrdenados);
        console.log("✅ Usuarios cargados correctamente");
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };
  const fetchUserDetailsWithoutRedirect = async (userId) => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users/${userId}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setSelectedUserData(data.user);
        sessionStorage.setItem("selectedUserProfile", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
    }
  };
  const handleRowClick = (userId) => {
    setSelectedUser(userId);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleViewUser = () => {
    if (selectedUser) {
      if (selectedUserData) {
        sessionStorage.setItem("selectedUserProfile", JSON.stringify(selectedUserData));
      }
      navigate(`/dashboard/user-profile/${selectedUser}`);
    } else {
      alert("Por favor, selecciona un usuario primero.");
    }
  };
  const handleDeleteUser = async () => {
    if (selectedUser) {
      if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        try {
          console.log("Intentando eliminar usuario con ID:", selectedUser);
          const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users/${selectedUser}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          if (data.success) {
            fetchUsers();
            setSelectedUser(null);
            alert("Usuario eliminado correctamente");
          } else {
            alert("Error al eliminar usuario: " + (data.message || "Error desconocido"));
          }
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          alert("Error al eliminar usuario: " + (error.message || "Error desconocido"));
        }
      }
    } else {
      alert("Por favor, selecciona un usuario primero.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-6 h-screen overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "bg-gray-900 shadow-lg rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "white", className: "font-bold", children: "Usuarios" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            variant: "text",
            color: "white",
            size: "lg",
            onClick: handleViewUser,
            disabled: !selectedUser,
            className: !selectedUser ? "opacity-50 cursor-not-allowed" : "",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { strokeWidth: 2, className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            variant: "text",
            color: "white",
            size: "lg",
            onClick: handleDeleteUser,
            disabled: !selectedUser,
            className: !selectedUser ? "opacity-50 cursor-not-allowed" : "",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, { strokeWidth: 2, className: "h-6 w-6" })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "blue-gray", className: "font-bold", children: "Lista de Usuarios" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full max-w-[24rem]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Buscar usuarios...",
              value: searchTerm,
              onChange: handleSearch,
              className: "pr-20",
              containerProps: {
                className: "min-w-[288px]"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "!absolute right-1 top-1 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", className: "flex items-center rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifyingGlassIcon, { className: "h-5 w-5" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            className: "flex items-center gap-3 bg-blue-500",
            onClick: () => navigate("/dashboard/users/crear"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlusIcon$1, { strokeWidth: 2, className: "h-4 w-4" }),
              "NUEVO USUARIO"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "paragraph", color: "blue-gray", className: "font-normal mb-2", children: [
      "Mostrando ",
      filteredUsers.length,
      " de ",
      users.length,
      " usuarios"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "overflow-hidden sticky-top-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky-table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["", "NOMBRE COMPLETO", "CORREO", "PUESTO", "TELÉFONO", "ROL"].map((head) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Typography,
        {
          variant: "small",
          color: "blue-gray",
          className: "font-bold leading-none opacity-70",
          children: head
        }
      ) }, head)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredUsers.length > 0 ? filteredUsers.map((user, index2) => {
        const isLast = index2 === filteredUsers.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        const isAdmin2 = (user.role || "").toLowerCase().includes("admin");
        const nombreCompleto = `${user.prim_nom || ""} ${user.segun_nom || ""} ${user.apell_pa || ""} ${user.apell_ma || ""}`.trim();
        const avatarSrc = user.foto_perfil || "/img/user_icon.svg";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `hover:bg-blue-gray-50 cursor-pointer ${selectedUser === user._id ? "bg-blue-50" : ""}`,
            onClick: () => handleRowClick(user._id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Avatar,
                {
                  src: avatarSrc,
                  alt: nombreCompleto,
                  size: "sm",
                  className: "border border-blue-500",
                  onError: (e) => {
                    console.error("❌ Error al cargar imagen en tabla:", avatarSrc);
                    console.error("Usuario:", nombreCompleto);
                    console.error("Tipo de URL:", (avatarSrc == null ? void 0 : avatarSrc.startsWith("data:")) ? "base64" : "URL directa");
                    if (avatarSrc == null ? void 0 : avatarSrc.startsWith("data:")) {
                      console.log("🔄 Reintentando carga de base64 en tabla...");
                      setTimeout(() => {
                        e.target.src = avatarSrc;
                      }, 1e3);
                    } else {
                      e.target.src = "/img/user_icon.svg";
                    }
                  },
                  onLoad: () => {
                    console.log("✅ Imagen cargada exitosamente en tabla:", avatarSrc.substring(0, 50) + "...");
                    console.log("Usuario:", nombreCompleto);
                    console.log("Tipo de carga:", (avatarSrc == null ? void 0 : avatarSrc.startsWith("data:")) ? "base64" : "URL directa");
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: nombreCompleto }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: user.email }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: user.pust }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: user.telefono }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Chip,
                {
                  size: "sm",
                  variant: isAdmin2 ? "filled" : "outlined",
                  value: capitalizeRole(user.role || "Usuario"),
                  color: isAdmin2 ? "blue" : "blue-gray",
                  className: isAdmin2 ? "bg-blue-500 text-white" : "border-blue-gray-500 text-blue-gray-500"
                }
              ) }) })
            ]
          },
          user._id
        );
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "5", className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: "No se encontraron usuarios con los criterios de búsqueda." }) }) }) })
    ] }) }) })
  ] }) });
}
function ProfileUsers() {
  const [userData, setUserData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Obteniendo datos del usuario con ID:", userId);
        const response = await axios.get(`${"https://lead-inmobiliaria.com"}/api/users/${userId}`, {
          withCredentials: true
        });
        if (response.data.success) {
          let userData2 = response.data.user;
          if (userData2.foto_perfil) {
            console.log("=== CARGA DE FOTO DE PERFIL EN PROFILEUSERS ===");
            console.log("Ruta en BD:", userData2.foto_perfil);
            let photoUrl = userData2.foto_perfil;
            if (!photoUrl.startsWith("http")) {
              photoUrl = `${"https://lead-inmobiliaria.com"}${photoUrl}`;
            }
            console.log("URL construida:", photoUrl);
            userData2.foto_perfil_url = photoUrl;
            console.log("✅ Foto de perfil configurada:", photoUrl);
          } else {
            console.log("ℹ️ Usuario no tiene foto de perfil configurada");
          }
          setUserData(userData2);
        } else {
          console.error("No se pudieron cargar los datos del usuario");
        }
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  const handleGoBack = () => {
    navigate("/dashboard/users");
  };
  const handleEdit = () => {
    navigate(`/dashboard/users/edit/${userId}`);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Cargando información del usuario..." }) });
  }
  if (!userData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "red", children: "No se pudo cargar la información del usuario" }) });
  }
  const nombreCompleto = `${userData.prim_nom} ${userData.segun_nom || ""} ${userData.apell_pa} ${userData.apell_ma}`.trim();
  const direccionCompleta = `${userData.calle} ${userData.nun_ex}, ${userData.nun_in ? "Int. " + userData.nun_in + ", " : ""}CP ${userData.codigo}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 h-full w-full bg-gray-900/75" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardHeader, { className: "p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            variant: "text",
            color: "blue-gray",
            onClick: handleGoBack,
            className: "ml-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Información del Usuario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            color: "blue",
            size: "sm",
            variant: "outlined",
            className: "flex items-center gap-2",
            onClick: handleEdit,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon, { className: "h-4 w-4" }),
              " Editar"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 flex items-center justify-between flex-wrap gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Avatar,
            {
              src: userData.foto_perfil_url || userData.foto_perfil || "/img/user_icon.svg",
              alt: nombreCompleto,
              size: "xxl",
              className: "border border-blue-500 shadow-xl shadow-blue-900/20",
              onError: (e) => {
                var _a, _b;
                console.error("❌ Error al cargar imagen de perfil en ProfileUsers:", userData.foto_perfil_url);
                console.error("Elemento de imagen:", e.target);
                console.error("Tipo de URL:", ((_a = userData.foto_perfil_url) == null ? void 0 : _a.startsWith("data:")) ? "base64" : "URL directa");
                if ((_b = userData.foto_perfil_url) == null ? void 0 : _b.startsWith("data:")) {
                  console.log("🔄 Reintentando carga de base64 en ProfileUsers...");
                  setTimeout(() => {
                    e.target.src = userData.foto_perfil_url;
                  }, 1e3);
                } else {
                  e.target.src = "/img/user_icon.svg";
                }
              },
              onLoad: () => {
                var _a;
                console.log("✅ Imagen de perfil cargada exitosamente en ProfileUsers:", userData.foto_perfil_url);
                console.log("Tipo de carga:", ((_a = userData.foto_perfil_url) == null ? void 0 : _a.startsWith("data:")) ? "base64" : "URL directa");
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-1", children: nombreCompleto }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Typography,
              {
                variant: "small",
                className: "font-normal text-blue-gray-600",
                children: userData.pust
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 px-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información Personal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Nombre Completo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: nombreCompleto })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BriefcaseIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Puesto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: userData.pust })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDaysIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Fecha de Nacimiento" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: userData.fecha_na })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPinIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Dirección" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: direccionCompleta })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Detalles Adicionales" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IdentificationIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Rol" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : "Usuario" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnvelopeIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Correo Electrónico" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: userData.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Teléfono" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: userData.telefono })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-gray-50 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BriefcaseIcon, { className: "h-6 w-6 text-blue-gray-500" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Empleado Vinculado" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-normal", children: userData.empleado_id ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Button,
                    {
                      size: "sm",
                      variant: "text",
                      className: "p-0 lowercase",
                      onClick: () => navigate(`/dashboard/empleado-profile/${userData.empleado_id}`),
                      children: "Ver empleado"
                    }
                  ) : "No vinculado a empleado" })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function EmpleadosTable() {
  const [empleados, setEmpleados] = reactExports.useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = reactExports.useState([]);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [selectedEmpleado, setSelectedEmpleado] = reactExports.useState(null);
  const [selectedEmpleadoData, setSelectedEmpleadoData] = reactExports.useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.authenticated || data.success) {
          const user = data.user || data;
          const userRole = (user == null ? void 0 : user.role) || "";
          const admin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
          setIsAdmin(admin);
          if (!admin) {
            navigate("/dashboard/home");
          }
        }
      } catch (error) {
        console.error("Error al verificar permisos:", error);
        navigate("/dashboard/home");
      }
    };
    checkAdminAccess();
  }, [navigate]);
  reactExports.useEffect(() => {
    fetchEmpleados();
  }, []);
  reactExports.useEffect(() => {
    if (selectedEmpleado) {
      fetchEmpleadoDetails(selectedEmpleado);
    } else {
      setSelectedEmpleadoData(null);
    }
  }, [selectedEmpleado]);
  reactExports.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmpleados(empleados);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = empleados.filter((empleado) => {
        const nombreCompleto = `${empleado.prim_nom || ""} ${empleado.segun_nom || ""} ${empleado.apell_pa || ""} ${empleado.apell_ma || ""}`.toLowerCase();
        const email = (empleado.email || "").toLowerCase();
        const puesto = (empleado.pust || "").toLowerCase();
        const telefono = (empleado.telefono || "").toLowerCase();
        const estado = (empleado.estado || "").toLowerCase();
        const salario = (empleado.salario || "").toString().toLowerCase();
        return nombreCompleto.includes(searchTermLower) || email.includes(searchTermLower) || puesto.includes(searchTermLower) || telefono.includes(searchTermLower) || estado.includes(searchTermLower) || salario.includes(searchTermLower);
      });
      setFilteredEmpleados(filtered);
    }
  }, [searchTerm, empleados]);
  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        const empleadosOrdenados = [...data.empleados].sort((a, b) => {
          if (a.estado === "Activo" && b.estado !== "Activo")
            return -1;
          if (a.estado !== "Activo" && b.estado === "Activo")
            return 1;
          return a.prim_nom.localeCompare(b.prim_nom);
        });
        setEmpleados(empleadosOrdenados);
        setFilteredEmpleados(empleadosOrdenados);
      }
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };
  const fetchEmpleadoDetails = async (empleadoId) => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/${empleadoId}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setSelectedEmpleadoData(data.empleado);
      }
    } catch (error) {
      console.error("Error al obtener detalles del empleado:", error);
    }
  };
  const handleRowClick = (empleadoId) => {
    setSelectedEmpleado(empleadoId);
  };
  const handleViewProfile = () => {
    if (selectedEmpleado && selectedEmpleadoData) {
      sessionStorage.setItem("selectedEmpleadoProfile", JSON.stringify(selectedEmpleadoData));
      navigate(`/dashboard/empleado-profile/${selectedEmpleado}`);
    }
  };
  const handleViewDocument = () => {
    if (selectedEmpleado) {
      navigate(`/dashboard/empleado-documents/${selectedEmpleado}`);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDeleteEmpleado = async () => {
    if (!selectedEmpleado)
      return;
    if (window.confirm("¿Está seguro de que desea eliminar este empleado? Esta acción no se puede deshacer.")) {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/${selectedEmpleado}`, {
          method: "DELETE",
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          fetchEmpleados();
          setSelectedEmpleado(null);
          setSelectedEmpleadoData(null);
        } else {
          alert("Error al eliminar empleado: " + data.message);
        }
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
        alert("Error al eliminar empleado");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12 h-screen overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "sticky-top-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "gray", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Empleados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            color: "white",
            variant: "text",
            onClick: handleViewProfile,
            disabled: !selectedEmpleado,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 576 512", className: "w-7 h-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63.2 225.1 49.2 256c13.9 30.9 40.4 72.5 78.9 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7c38.5-35.8 64.9-77.4 78.9-108.3c-13.9-30.9-40.4-72.5-78.9-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            color: "white",
            variant: "text",
            onClick: handleViewDocument,
            disabled: !selectedEmpleado,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", className: "w-7 h-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            color: "white",
            variant: "text",
            onClick: handleDeleteEmpleado,
            disabled: !selectedEmpleado,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", className: "w-7 h-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }) })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "overflow-x-scroll px-0 pt-0 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky-search-bar flex flex-col md:flex-row items-center justify-between gap-4 px-4 mb-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Lista de Empleados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full md:w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Buscar empleados...",
              value: searchTerm,
              onChange: handleSearchChange,
              className: "pr-10",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
            }
          ) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              color: "blue",
              className: "flex items-center gap-3",
              onClick: () => navigate("/dashboard/empleados/crear"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlusIcon$1, { strokeWidth: 2, className: "h-4 w-4" }),
                "Nuevo Empleado"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: [
        "Mostrando ",
        filteredEmpleados.length,
        " de ",
        empleados.length,
        " empleados"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky-table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Nombre Completo", "Correo", "Puesto", "Teléfono", "Estado", "Salario"].map((el) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "border-b border-blue-gray-50 py-3 px-5 text-left",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Typography,
              {
                variant: "small",
                className: "text-[11px] font-bold uppercase text-blue-gray-400",
                children: el
              }
            )
          },
          el
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredEmpleados.length > 0 ? filteredEmpleados.map((empleado) => {
          const isSelected = selectedEmpleado === empleado._id;
          const className = `py-3 px-5 border-b border-blue-gray-50 cursor-pointer transition-colors ${isSelected ? "bg-blue-gray-50" : "hover:bg-blue-gray-50/50"}`;
          const nombreCompleto = `${empleado.prim_nom} ${empleado.segun_nom || ""} ${empleado.apell_pa} ${empleado.apell_ma}`.trim();
          empleado.estado === "activo";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              onClick: () => handleRowClick(empleado._id),
              className,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-semibold",
                    children: nombreCompleto
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-normal text-blue-gray-500", children: empleado.email }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-semibold text-blue-gray-600", children: empleado.pust }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-normal text-blue-gray-500", children: empleado.telefono }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Chip,
                  {
                    size: "sm",
                    variant: empleado.estado === "Activo" ? "filled" : "outlined",
                    value: empleado.estado,
                    color: empleado.estado === "Activo" ? "green" : "red",
                    className: empleado.estado === "Activo" ? "bg-green-500 text-white" : "border-red-500 text-red-500"
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { className: "text-xs font-semibold text-blue-gray-600", children: [
                  "$",
                  empleado.salario
                ] }) })
              ]
            },
            empleado._id
          );
        }) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "6", className: "py-6 px-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: "No se encontraron empleados con los criterios de búsqueda." }) }) }) })
      ] }) })
    ] })
  ] }) }) });
}
function CustomAvatar({ src, alt, size = "md", className = "" }) {
  const getDimensions = () => {
    switch (size) {
      case "xs":
        return { width: "24px", height: "24px", iconSize: "w-4 h-4" };
      case "sm":
        return { width: "32px", height: "32px", iconSize: "w-5 h-5" };
      case "md":
        return { width: "40px", height: "40px", iconSize: "w-6 h-6" };
      case "lg":
        return { width: "48px", height: "48px", iconSize: "w-7 h-7" };
      case "xl":
        return { width: "64px", height: "64px", iconSize: "w-9 h-9" };
      case "xxl":
        return { width: "80px", height: "80px", iconSize: "w-12 h-12" };
      default:
        return { width: "40px", height: "40px", iconSize: "w-6 h-6" };
    }
  };
  if (src && src.trim() !== "") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.Avatar,
      {
        src,
        alt,
        size,
        className
      }
    );
  }
  const { width, height, iconSize } = getDimensions();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${className} flex items-center justify-center bg-blue-gray-100 rounded-lg shadow-md overflow-hidden`,
      style: { width, height, minWidth: width, minHeight: height },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 384 512",
          className: `${iconSize} text-blue-gray-700`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              fill: "currentColor",
              d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"
            }
          )
        }
      )
    }
  );
}
function ProfileEmpleados() {
  var _a;
  const [empleadoData, setEmpleadoData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [nominas, setNominas] = reactExports.useState([]);
  const [nominasDisplay, setNominasDisplay] = reactExports.useState([]);
  const [loadingNominas, setLoadingNominas] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("perfil");
  const [filtroDesde, setFiltroDesde] = reactExports.useState("");
  const [filtroHasta, setFiltroHasta] = reactExports.useState("");
  const { empleadoId } = useParams();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = reactExports.useState([]);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    console.log("ID del empleado en perfil:", empleadoId);
    const storedEmpleadoData = sessionStorage.getItem("selectedEmpleadoProfile");
    if (storedEmpleadoData) {
      setEmpleadoData(JSON.parse(storedEmpleadoData));
      console.log(storedEmpleadoData);
      setLoading(false);
    } else {
      fetchEmpleadoData();
    }
  }, [empleadoId]);
  reactExports.useEffect(() => {
    console.log("Estado activo de la pestaña cambiado a:", activeTab);
    if (empleadoId && activeTab === "laboral") {
      fetchNominas();
    }
  }, [activeTab]);
  reactExports.useEffect(() => {
    filtrarNominas();
  }, [filtroDesde, filtroHasta, nominas]);
  reactExports.useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        console.log("Respuesta completa de check-auth:", data);
        if (data.authenticated || data.success) {
          const user = data.user || data;
          const userRole = (user == null ? void 0 : user.role) || "";
          console.log("Información de usuario:", user);
          console.log("Rol del usuario:", userRole);
          const admin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
          setIsAdmin(admin);
          console.log("Estado de administrador:", admin);
        } else {
          console.log("Usuario no autenticado o sin privilegios de administrador");
        }
      } catch (error) {
        console.error("Error al verificar estado de admin:", error);
      }
    };
    checkAdminStatus();
  }, []);
  reactExports.useEffect(() => {
    if (isAdmin) {
      const fetchUsuarios = async () => {
        try {
          const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users`, {
            credentials: "include"
          });
          const data = await response.json();
          if (data.users) {
            setUsuarios(data.users);
          }
        } catch (error) {
          console.error("Error al cargar usuarios:", error);
        }
      };
      fetchUsuarios();
    }
  }, [isAdmin]);
  const fetchEmpleadoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/${empleadoId}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.empleado);
        setEmpleadoData(data.empleado);
      } else {
        console.error("Error al obtener datos del empleado");
      }
    } catch (error) {
      console.error("Error al obtener datos del empleado:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchNominas = async () => {
    try {
      setLoadingNominas(true);
      console.log("Obteniendo nóminas para el empleado:", empleadoId);
      const hayFiltrosActivos = filtroDesde || filtroHasta;
      const url = hayFiltrosActivos ? `${"https://lead-inmobiliaria.com"}/api/nominas-api/empleado/${empleadoId}` : `${"https://lead-inmobiliaria.com"}/api/nominas-api/empleado/${empleadoId}?limite=20`;
      const response = await fetch(url, {
        credentials: "include"
      });
      const data = await response.json();
      console.log("Respuesta de la API de nóminas:", data);
      if (data.success) {
        setNominas(data.nominas || []);
        setNominasDisplay(data.nominas || []);
        if (!hayFiltrosActivos && data.totalRegistros > 20) {
          console.log(`Mostrando 20 de ${data.totalRegistros} nóminas disponibles`);
        }
      } else {
        console.error("Error al obtener nóminas:", data.message);
        setNominas([]);
        setNominasDisplay([]);
      }
    } catch (error) {
      console.error("Error al obtener nóminas:", error);
      setNominas([]);
      setNominasDisplay([]);
    } finally {
      setLoadingNominas(false);
    }
  };
  const filtrarNominas = () => {
    if (!nominas.length)
      return;
    let nominasFiltradas = [...nominas];
    if (filtroDesde) {
      const fechaDesde = new Date(filtroDesde);
      nominasFiltradas = nominasFiltradas.filter((nomina) => {
        const fechaNomina = convertirFechaStringADate(nomina.fecha);
        return fechaNomina >= fechaDesde;
      });
    }
    if (filtroHasta) {
      const fechaHasta = new Date(filtroHasta);
      nominasFiltradas = nominasFiltradas.filter((nomina) => {
        const fechaNomina = convertirFechaStringADate(nomina.fecha);
        return fechaNomina <= fechaHasta;
      });
    }
    setNominasDisplay(nominasFiltradas);
  };
  const convertirFechaStringADate = (fechaString) => {
    if (!fechaString)
      return /* @__PURE__ */ new Date();
    if (fechaString.includes("/")) {
      const [dia, mes, anio] = fechaString.split("/");
      return new Date(anio, mes - 1, dia);
    }
    if (fechaString.includes("-")) {
      return new Date(fechaString);
    }
    return /* @__PURE__ */ new Date();
  };
  const handleDeleteNomina = async (nominaId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta nómina?")) {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/nominas-api/${nominaId}`, {
          method: "DELETE",
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          fetchNominas();
        } else {
          console.error("Error al eliminar la nómina:", data.message);
        }
      } catch (error) {
        console.error("Error al eliminar la nómina:", error);
      }
    }
  };
  const handleViewNomina = (nomina) => {
    if (nomina == null ? void 0 : nomina.url) {
      window.open(nomina.url, "_blank");
    }
  };
  const descargarPDF = async (nomina) => {
    try {
      const response = await axios({
        url: `${"https://lead-inmobiliaria.com"}/api/nominas-api/download/${nomina._id}`,
        method: "GET",
        responseType: "blob",
        withCredentials: true
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `nomina-${nomina.fecha}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      if (nomina.url) {
        window.open(nomina.url, "_blank");
      }
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Cargando información del empleado..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 mt-16 mb-6 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-4", children: [
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Cargando datos del empleado..." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CustomAvatar,
            {
              src: empleadoData.foto_perfil,
              alt: `${empleadoData.prim_nom} ${empleadoData.apell_pa}`,
              size: "xl",
              className: "shadow-lg shadow-blue-gray-500/40"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-1", children: `${empleadoData.prim_nom} ${empleadoData.segun_nom ? empleadoData.segun_nom : ""} ${empleadoData.apell_pa} ${empleadoData.apell_ma}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Typography,
              {
                variant: "small",
                className: "font-normal text-blue-gray-600",
                children: empleadoData.pust
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col gap-2 sm:flex-row", children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              onClick: () => {
                console.log("Redirigiendo a editar con ID:", empleadoId);
                window.location.href = `/dashboard/empleados/editar/${empleadoId}`;
              },
              variant: "outlined",
              color: "blue",
              size: "sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon, { strokeWidth: 2, className: "h-4 w-4 mr-2" }),
                "Editar"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Button, { onClick: () => navigate("/dashboard/empleados"), variant: "outlined", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { strokeWidth: 2, className: "h-4 w-4 mr-2" }),
            "Volver"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `cursor-pointer rounded-lg p-4 hover:bg-blue-gray-50 ${activeTab === "perfil" ? "bg-blue-gray-50" : ""}`,
              onClick: () => setActiveTab("perfil"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Perfil Personal" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `cursor-pointer rounded-lg p-4 hover:bg-blue-gray-50 ${activeTab === "laboral" ? "bg-blue-gray-50" : ""}`,
              onClick: () => setActiveTab("laboral"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Información Laboral" })
              ] })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
          activeTab === "perfil" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información Personal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Nombre Completo" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: [
                      empleadoData.prim_nom,
                      " ",
                      empleadoData.segun_nom,
                      " ",
                      empleadoData.apell_pa,
                      " ",
                      empleadoData.apell_ma
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDaysIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Fecha de Nacimiento" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: empleadoData.fecha_na })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnvelopeIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Correo Electrónico" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: empleadoData.email })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Teléfono" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: empleadoData.telefono })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPinIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Dirección" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: [
                      empleadoData.calle,
                      " ",
                      empleadoData.nun_ex,
                      ", ",
                      empleadoData.nun_in ? "Int. " + empleadoData.nun_in + ", " : "",
                      "CP ",
                      empleadoData.codigo,
                      ", ",
                      empleadoData.estado
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IdentificationIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Estado" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: empleadoData.estado })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "laboral" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Nóminas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 md:flex-row md:gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Desde" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Input,
                    {
                      type: "date",
                      value: filtroDesde,
                      onChange: (e) => setFiltroDesde(e.target.value),
                      size: "md"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Hasta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Input,
                    {
                      type: "date",
                      value: filtroHasta,
                      onChange: (e) => setFiltroHasta(e.target.value),
                      size: "md"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block min-w-full align-middle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden border-b border-gray-200 shadow sm:rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-bold leading-none opacity-70",
                    children: "Fecha"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-bold leading-none opacity-70",
                    children: "Concepto"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-bold leading-none opacity-70",
                    children: "Salario"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-bold leading-none opacity-70",
                    children: "Acciones"
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loadingNominas ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "blue-gray", children: "Cargando nóminas..." }) }) }) : nominasDisplay && nominasDisplay.length > 0 ? nominasDisplay.map((nomina) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: nomina.fecha }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: nomina.conceptoDePago }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: [
                  "$",
                  nomina.salario
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Ver nómina", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.IconButton,
                    {
                      variant: "text",
                      color: "blue-gray",
                      size: "sm",
                      onClick: () => handleViewNomina(nomina),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon$1, { className: "h-4 w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Descargar PDF", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.IconButton,
                    {
                      variant: "text",
                      color: "blue-gray",
                      size: "sm",
                      onClick: () => descargarPDF(nomina),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentArrowDownIcon, { className: "h-4 w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Eliminar nómina", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.IconButton,
                    {
                      variant: "text",
                      color: "red",
                      size: "sm",
                      onClick: () => handleDeleteNomina(nomina._id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon$1, { className: "h-4 w-4" })
                    }
                  ) })
                ] }) })
              ] }, nomina._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "blue-gray", children: "No hay nóminas registradas" }) }) }) })
            ] }) }) }) })
          ] })
        ] })
      ] })
    ] }),
    !isAdmin && empleadoData.userId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-4 border rounded-lg border-blue-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gray-900/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { className: "h-6 w-6 text-blue-gray-700" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Usuario Asociado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: ((_a = usuarios.find((u) => u._id === empleadoData.userId)) == null ? void 0 : _a.email) || "Cargando información del usuario..." })
      ] })
    ] }) }),
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      react.Button,
      {
        variant: "gradient",
        color: "blue",
        className: "flex items-center gap-3",
        onClick: () => navigate(`/dashboard/nomina/crear/${empleadoData._id}`),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon, { strokeWidth: 2, className: "h-4 w-4" }),
          "Crear Nueva Nómina"
        ]
      }
    ) })
  ] }) }) });
}
function EditarNomina() {
  var _a;
  const [nominaData, setNominaData] = reactExports.useState({
    empleado: "",
    conceptoDePago: "",
    salario: "",
    fecha: ""
  });
  const [loading, setLoading] = reactExports.useState(true);
  const { nominaId } = useParams();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    fetchNominaData();
  }, [nominaId]);
  const fetchNominaData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/nominas/${nominaId}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setNominaData(data.nomina);
      } else {
        console.error("Error al obtener datos de la nómina");
      }
    } catch (error) {
      console.error("Error al obtener datos de la nómina:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNominaData({
      ...nominaData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/nominas/${nominaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(nominaData)
      });
      const data = await response.json();
      if (data.success) {
        navigate(`/dashboard/empleado-profile/${nominaData.empleadoId}`);
      } else {
        console.error("Error al actualizar la nómina");
      }
    } catch (error) {
      console.error("Error al actualizar la nómina:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Cargando datos de la nómina..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "gray", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          variant: "text",
          color: "white",
          onClick: () => navigate(-1),
          className: "mr-4",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-6 w-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Editar Nómina" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "mb-2 font-medium", children: "Empleado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            size: "lg",
            name: "empleado",
            value: nominaData.empleado,
            onChange: handleInputChange,
            disabled: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "mb-2 font-medium", children: "Concepto de Pago" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            size: "lg",
            name: "conceptoDePago",
            value: nominaData.conceptoDePago,
            onChange: handleInputChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "mb-2 font-medium", children: "Salario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            type: "number",
            size: "lg",
            name: "salario",
            value: nominaData.salario,
            onChange: handleInputChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "mb-2 font-medium", children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            type: "date",
            size: "lg",
            name: "fecha",
            value: (_a = nominaData.fecha) == null ? void 0 : _a.split("/").reverse().join("-"),
            onChange: handleInputChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            variant: "outlined",
            color: "red",
            onClick: () => navigate(-1),
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            variant: "filled",
            color: "gray",
            type: "submit",
            children: "Guardar Cambios"
          }
        )
      ] })
    ] }) })
  ] }) });
}
function DocumentosEmpleado() {
  const [documentos, setDocumentos] = reactExports.useState([]);
  const [empleadoData, setEmpleadoData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const { empleadoId } = useParams();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    fetchEmpleadoData();
    fetchDocumentos();
  }, [empleadoId]);
  const fetchEmpleadoData = async () => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/${empleadoId}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setEmpleadoData(data.empleado);
      } else {
        console.error("Error al obtener datos del empleado");
      }
    } catch (error) {
      console.error("Error al obtener datos del empleado:", error);
    }
  };
  const fetchDocumentos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/nominas-api/empleado/${empleadoId}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setDocumentos(data.nominas);
      } else {
        console.error("Error al obtener documentos del empleado");
      }
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleGoBack = () => {
    navigate(`/dashboard/empleado-profile/${empleadoId}`);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Cargando documentos..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "gray", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          variant: "text",
          color: "white",
          onClick: handleGoBack,
          className: "mr-4",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-6 w-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "white", children: [
        "Documentos de ",
        empleadoData == null ? void 0 : empleadoData.prim_nom,
        " ",
        empleadoData == null ? void 0 : empleadoData.apell_pa
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: documentos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: documentos.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-1", children: doc.conceptoDePago }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", children: [
          "Fecha: ",
          doc.fecha
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", children: [
          "Monto: $",
          doc.salario
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          variant: "text",
          color: "blue-gray",
          onClick: () => window.open(`${"https://lead-inmobiliaria.com"}/api/nominas-api/descargar/${doc._id}`, "_blank"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentArrowDownIcon, { className: "h-6 w-6" })
        }
      )
    ] }) }) }, doc._id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-2", children: "No hay documentos disponibles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "mb-4", children: "Todavía no se han generado documentos para este empleado." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          color: "gray",
          onClick: () => navigate(`/dashboard/empleado/nomina/${empleadoId}`),
          children: "Crear Nueva Nómina"
        }
      )
    ] }) })
  ] }) });
}
function CrearEmpleado() {
  const navigate = useNavigate();
  const [formData, setFormData] = reactExports.useState({
    prim_nom: "",
    segun_nom: "",
    apell_pa: "",
    apell_ma: "",
    pust: "",
    fecha_na: "",
    calle: "",
    num_in: "",
    nun_ex: "",
    codigo: "",
    telefono: "",
    email: "",
    salario: "",
    fecha_ing: "",
    estado: "Activo",
    userId: ""
  });
  const [usuarios, setUsuarios] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const checkAdminStatus = async () => {
      var _a;
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.authenticated) {
          const userRole = ((_a = data.user) == null ? void 0 : _a.role) || "";
          const admin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
          setIsAdmin(admin);
          if (admin) {
            fetchUsuarios();
          }
        }
      } catch (error2) {
        console.error("Error al verificar permisos:", error2);
      }
    };
    checkAdminStatus();
  }, []);
  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.users) {
        setUsuarios(data.users);
      }
    } catch (error2) {
      console.error("Error al cargar usuarios:", error2);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/dashboard/empleados");
        }, 1500);
      } else {
        setError(data.message || "Error al crear el empleado");
      }
    } catch (error2) {
      console.error("Error:", error2);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.CardHeader,
      {
        variant: "gradient",
        color: "blue",
        className: "mb-4 grid h-28 place-items-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", color: "white", children: "Crear Nuevo Empleado" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "flex flex-col gap-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "green", className: "mb-4", children: "Empleado creado exitosamente. Redirigiendo..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Información Personal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Primer Nombre",
              name: "prim_nom",
              value: formData.prim_nom,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Segundo Nombre",
              name: "segun_nom",
              value: formData.segun_nom,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Apellido Paterno",
              name: "apell_pa",
              value: formData.apell_pa,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Apellido Materno",
              name: "apell_ma",
              value: formData.apell_ma,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "date",
              label: "Fecha de Nacimiento",
              name: "fecha_na",
              value: formData.fecha_na,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "email",
              type: "email",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.email,
              onChange: handleChange,
              label: "Correo electrónico (opcional)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "tel",
              label: "Teléfono",
              name: "telefono",
              value: formData.telefono,
              onChange: handleChange,
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Información Laboral" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Puesto",
              name: "pust",
              value: formData.pust,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "number",
              label: "Salario",
              name: "salario",
              value: formData.salario,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "date",
              label: "Fecha de Ingreso",
              name: "fecha_ing",
              value: formData.fecha_ing,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Select,
            {
              label: "Estado",
              name: "estado",
              value: formData.estado,
              onChange: (value) => handleSelectChange("estado", value),
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Activo", children: "Activo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Inactivo", children: "Inactivo" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3 mt-6", children: "Dirección" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Calle",
              name: "calle",
              value: formData.calle,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                type: "text",
                label: "Número Exterior",
                name: "nun_ex",
                value: formData.nun_ex,
                onChange: handleChange
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                type: "text",
                label: "Número Interior",
                name: "num_in",
                value: formData.num_in,
                onChange: handleChange
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Código Postal",
              name: "codigo",
              value: formData.codigo,
              onChange: handleChange
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Asociar con Usuario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Select,
              {
                label: "Usuario",
                value: formData.userId,
                onChange: (value) => handleSelectChange("userId", value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "", children: "Ninguno" }),
                  usuarios.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Option, { value: user._id, children: [
                    user.prim_nom,
                    " ",
                    user.apell_pa,
                    " (",
                    user.email,
                    ")"
                  ] }, user._id))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 md:col-span-2 flex justify-end gap-4 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              color: "red",
              onClick: () => navigate("/dashboard/empleados"),
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: "submit",
              color: "blue",
              disabled: loading,
              children: loading ? "Guardando..." : "Guardar Empleado"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function EditarEmpleado() {
  var _a;
  const navigate = useNavigate();
  const { empleadoId } = useParams();
  const [formData, setFormData] = reactExports.useState({
    prim_nom: "",
    segun_nom: "",
    apell_pa: "",
    apell_ma: "",
    pust: "",
    fecha_na: "",
    calle: "",
    num_in: "",
    nun_ex: "",
    codigo: "",
    telefono: "",
    email: "",
    salario: "",
    fecha_ing: "",
    estado: "Activo",
    userId: ""
  });
  const [usuarios, setUsuarios] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [fetchingData, setFetchingData] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    console.log("ID del empleado en edición:", empleadoId);
    checkAdminStatus();
    fetchEmpleado();
  }, [empleadoId]);
  reactExports.useEffect(() => {
    if (formData.userId && usuarios.length > 0) {
      const userExists = usuarios.some((u) => u._id === formData.userId);
      if (!userExists) {
        const fetchUsuario = async () => {
          try {
            const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users/${formData.userId}`, {
              credentials: "include"
            });
            const data = await response.json();
            if (data.success && data.user) {
              setUsuarios((prev) => {
                if (!prev.some((u) => u._id === data.user._id)) {
                  return [...prev, data.user];
                }
                return prev;
              });
            }
          } catch (error2) {
            console.error("Error al cargar usuario específico:", error2);
          }
        };
        fetchUsuario();
      }
    }
  }, [formData.userId, usuarios]);
  const checkAdminStatus = async () => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
        credentials: "include"
      });
      const data = await response.json();
      console.log("Respuesta de verificación de admin:", data);
      if (data.authenticated || data.success) {
        const user = data.user || data;
        const userRole = (user == null ? void 0 : user.role) || "";
        const admin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
        setIsAdmin(admin);
        if (admin) {
          fetchUsuarios();
        }
      }
    } catch (error2) {
      console.error("Error al verificar permisos:", error2);
    }
  };
  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/users`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.users) {
        setUsuarios(data.users);
      }
    } catch (error2) {
      console.error("Error al cargar usuarios:", error2);
    }
  };
  const fetchEmpleado = async () => {
    try {
      setFetchingData(true);
      console.log("Cargando datos del empleado ID:", empleadoId);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/${empleadoId}`, {
        credentials: "include"
      });
      const data = await response.json();
      console.log("Respuesta al cargar empleado:", data);
      if (data.success) {
        const empleado = data.empleado;
        if (empleado.fecha_na && empleado.fecha_na.length > 10) {
          empleado.fecha_na = empleado.fecha_na.substring(0, 10);
        }
        if (empleado.fecha_ing && empleado.fecha_ing.length > 10) {
          empleado.fecha_ing = empleado.fecha_ing.substring(0, 10);
        }
        console.log("Datos del empleado cargados:", empleado);
        setFormData(empleado);
      } else {
        setError("No se pudo cargar la información del empleado");
      }
    } catch (error2) {
      console.error("Error al cargar datos del empleado:", error2);
      setError("Error al conectar con el servidor");
    } finally {
      setFetchingData(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log("Enviando datos actualizados:", formData);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/${empleadoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log("Respuesta al actualizar empleado:", data);
      if (data.success && formData.userId) {
        const userResponse = await fetch(`${"https://lead-inmobiliaria.com"}/api/users/${formData.userId}/asociar-empleado`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ empleado_id: empleadoId })
        });
        const userData = await userResponse.json();
        console.log("Respuesta al asociar usuario:", userData);
      }
      setSuccess(true);
      setTimeout(() => {
        navigate(`/dashboard/empleado-profile/${empleadoId}`);
      }, 1500);
    } catch (error2) {
      console.error("Error al actualizar empleado:", error2);
      setError("Error al guardar los datos. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-8 max-w-5xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", color: "white", children: fetchingData ? "Cargando..." : "Editar Empleado" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "flex flex-col gap-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "green", className: "mb-4", children: "Empleado actualizado correctamente." }),
      fetchingData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Cargando información del empleado..." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Información Personal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Primer Nombre",
              name: "prim_nom",
              value: formData.prim_nom,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Segundo Nombre",
              name: "segun_nom",
              value: formData.segun_nom || "",
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Apellido Paterno",
              name: "apell_pa",
              value: formData.apell_pa,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Apellido Materno",
              name: "apell_ma",
              value: formData.apell_ma,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "date",
              label: "Fecha de Nacimiento",
              name: "fecha_na",
              value: formData.fecha_na,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "email",
              type: "email",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.email,
              onChange: handleChange,
              label: "Correo electrónico (opcional)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "tel",
              label: "Teléfono",
              name: "telefono",
              value: formData.telefono,
              onChange: handleChange,
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Información Laboral" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Puesto",
              name: "pust",
              value: formData.pust,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "number",
              label: "Salario",
              name: "salario",
              value: formData.salario,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "date",
              label: "Fecha de Ingreso",
              name: "fecha_ing",
              value: formData.fecha_ing,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Select,
            {
              label: "Estado",
              name: "estado",
              value: formData.estado,
              onChange: (value) => handleSelectChange("estado", value),
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Activo", children: "Activo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Inactivo", children: "Inactivo" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3 mt-6", children: "Dirección" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Calle",
              name: "calle",
              value: formData.calle,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                type: "text",
                label: "Número Exterior",
                name: "nun_ex",
                value: formData.nun_ex,
                onChange: handleChange
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                type: "text",
                label: "Número Interior",
                name: "num_in",
                value: formData.num_in || "",
                onChange: handleChange
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              type: "text",
              label: "Código Postal",
              name: "codigo",
              value: formData.codigo,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Asociar con Usuario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-blue-gray-700 font-medium", children: "Usuario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: formData.userId || "",
                  onChange: (e) => handleSelectChange("userId", e.target.value),
                  className: "w-full h-11 px-3 py-2 border border-blue-gray-200 rounded-lg bg-white text-blue-gray-700 outline-none focus:border-gray-900 transition-all",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Ninguno" }),
                    usuarios.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: user._id, children: [
                      user.prim_nom,
                      " ",
                      user.apell_pa,
                      " (",
                      user.email,
                      ")"
                    ] }, user._id))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" }) }) })
            ] }),
            formData.userId && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "mt-2", children: [
              "Usuario seleccionado: ",
              ((_a = usuarios.find((u) => u._id === formData.userId)) == null ? void 0 : _a.email) || "Cargando información del usuario..."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 md:col-span-2 flex justify-end gap-4 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              color: "red",
              onClick: () => navigate(`/dashboard/empleados/profile/${empleadoId}`),
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: "submit",
              color: "blue",
              disabled: loading,
              children: loading ? "Guardando..." : "Actualizar Empleado"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function CrearNomina() {
  const navigate = useNavigate();
  const { empleadoId } = useParams();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [empleadoData, setEmpleadoData] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    empleadoId,
    empleado: "",
    salario: "",
    fecha: "",
    concepto: ""
  });
  reactExports.useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          const user = data.user;
          const userRole = (user == null ? void 0 : user.role) || "";
          const admin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
          setIsAdmin(admin);
          if (!admin) {
            navigate("/dashboard/home");
          }
        } else {
          navigate("/dashboard/home");
        }
      } catch (error2) {
        console.error("Error al verificar permisos:", error2);
        navigate("/dashboard/home");
      }
    };
    checkAdminAccess();
  }, [navigate]);
  reactExports.useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/empleados-api/${empleadoId}`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setEmpleadoData(data.empleado);
          const nombreCompleto = `${data.empleado.prim_nom} ${data.empleado.segun_nom} ${data.empleado.apell_pa} ${data.empleado.apell_ma}`.trim();
          setFormData((prev) => ({
            ...prev,
            empleado: nombreCompleto,
            salario: data.empleado.salario || ""
          }));
        } else {
          setError("No se pudo cargar la información del empleado");
        }
      } catch (error2) {
        console.error("Error al cargar empleado:", error2);
        setError("Error al cargar la información del empleado");
      }
    };
    if (empleadoId) {
      fetchEmpleado();
    }
  }, [empleadoId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.append("empleadoId", formData.empleadoId);
      params.append("empleado", formData.empleado);
      params.append("salario", formData.salario);
      params.append("fecha", formData.fecha);
      params.append("conceptoDePago", formData.concepto);
      console.log("Enviando datos como application/x-www-form-urlencoded");
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/CrearNomina/${empleadoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: params
      });
      console.log("Respuesta del servidor:", response.status, response.statusText);
      if (response.redirected) {
        const redirectUrl = response.url.replace("https://lead-inmobiliaria.com", "/dashboard");
        navigate(redirectUrl);
        return;
      }
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/dashboard/empleado-profile/${empleadoId}`);
        }, 2e3);
      } else {
        try {
          const data = await response.json();
          setError(data.message || `Error al crear la nómina. Estado: ${response.status}`);
        } catch {
          const text = await response.text();
          console.error("Error response:", text);
          setError(`Error al crear la nómina. Estado: ${response.status}`);
        }
      }
    } catch (error2) {
      console.error("Error al crear nómina:", error2);
      setError("Error al crear la nómina. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  if (!empleadoData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: "Cargando información del empleado..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-10 max-w-4xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", color: "white", children: "Crear Nueva Nómina" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "flex flex-col gap-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "green", className: "mb-4", children: "Nómina creada correctamente. Redirigiendo..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-2", children: [
        "Empleado: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal", children: formData.empleado })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Información de Pago" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                type: "number",
                label: "Salario",
                name: "salario",
                value: formData.salario,
                onChange: handleChange,
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                type: "date",
                label: "Fecha de Pago",
                name: "fecha",
                value: formData.fecha,
                onChange: handleChange,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Textarea,
            {
              label: "Concepto de Pago",
              name: "concepto",
              value: formData.concepto,
              onChange: handleChange,
              required: true
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              color: "red",
              onClick: () => navigate(`/dashboard/empleado-profile/${empleadoId}`),
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: "submit",
              color: "blue",
              disabled: loading,
              children: loading ? "Creando..." : "Crear Nómina"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
const ProyectosMarketing = () => {
  const navigate = useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [captaciones, setCaptaciones] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [searchParams] = reactExports.useState({
    limit: 10,
    sort: "-createdAt"
  });
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      console.log("=== DEBUG: Verificando autenticación ===");
      try {
        console.log("Haciendo petición a:", `${"https://lead-inmobiliaria.com"}/api/check-auth`);
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include",
          headers: {
            "Accept": "application/json"
          }
        });
        console.log("Respuesta de autenticación:", response.status, response.ok);
        if (!response.ok) {
          console.log("Autenticación fallida, redirigiendo a /sign-in");
          navigate("/sign-in");
          return;
        }
        const data = await response.json();
        console.log("Usuario autenticado:", data.user);
        setUser(data.user);
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        console.log("Error de autenticación, redirigiendo a /sign-in");
        navigate("/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  reactExports.useEffect(() => {
    if (!user)
      return;
    const fetchProyectosMarketing = async () => {
      var _a;
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = `${"https://lead-inmobiliaria.com"}/api/marketing?page=${page}&limit=${searchParams.limit}&sort=${searchParams.sort}${user.role === "Supervisor" ? `&supervisor=${user._id}` : ""}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""}`;
        console.log("Consultando API de marketing:", apiUrl);
        const response = await fetch(apiUrl, {
          credentials: "include",
          headers: {
            "Accept": "application/json"
          }
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener proyectos de marketing: ${response.status}`);
        }
        const data = await response.json();
        if (!data.proyectos || data.proyectos.length === 0) {
          setCaptaciones([]);
          setTotalPages(0);
          return;
        }
        const proyectosMarketing = data.proyectos;
        console.log("Proyectos de marketing obtenidos:", proyectosMarketing);
        setCaptaciones(proyectosMarketing);
        setTotalPages(((_a = data.paginacion) == null ? void 0 : _a.paginas) || 1);
      } catch (error2) {
        console.error("Error al obtener proyectos de marketing:", error2);
        setError(error2.message || "No se pudieron cargar los proyectos de marketing");
        setCaptaciones([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProyectosMarketing();
  }, [user, page, searchParams, searchTerm]);
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };
  if (isLoading && !captaciones.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "green", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Proyectos de Marketing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "opacity-80", children: 'Propiedades en "Disponible para venta" y "Remodelacion"' })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "overflow-x-scroll px-0 pt-0 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Input,
        {
          label: "Buscar por propietario o dirección",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifyingGlassIcon, { className: "h-5 w-5" }),
          value: searchTerm,
          onChange: handleSearch
        }
      ) }) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mx-4 mt-4", children: error }),
      captaciones.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", className: "text-gray-600", children: "No hay proyectos disponibles para marketing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-gray-500 mt-2", children: 'Solo se muestran propiedades con estatus "Disponible para venta" y "Remodelacion"' })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Propiedad", "Propietario", "Ubicación", "Precio", "Estatus", "Publicación", "Imágenes", "Acciones"].map((header) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-6 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium leading-none opacity-70", children: header }) }, header)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: captaciones.map((proyecto, index2) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: proyecto.tipo || "Casa/Apartamento" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal opacity-70", children: proyecto.tituloMarketing || "Sin título personalizado" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: proyecto.propietario || "No especificado" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal opacity-70", children: proyecto.telefono || "Sin teléfono" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: proyecto.direccion || "Sin dirección" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "green", className: "font-bold", children: [
                  "$",
                  proyecto.precio || "Consultar"
                ] }),
                proyecto.precioOferta && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal opacity-70", children: [
                  "Oferta: $",
                  proyecto.precioOferta
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Chip,
                {
                  variant: "ghost",
                  size: "sm",
                  value: proyecto.estatusMarketing || "Sin estatus",
                  color: proyecto.estatusMarketing === "Disponible para venta" ? "green" : proyecto.estatusMarketing === "Remodelacion" ? "amber" : "blue"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Chip,
                {
                  variant: "ghost",
                  size: "sm",
                  value: proyecto.estatusPublicacion || "No publicada",
                  color: proyecto.estatusPublicacion === "Publicada" ? "green" : "red"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoIcon, { className: "h-5 w-5 text-blue-gray-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: [
                  ((_a = proyecto.imagenesMarketing) == null ? void 0 : _a.length) || 0,
                  "/15"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Ver detalles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.IconButton,
                  {
                    variant: "text",
                    color: "blue",
                    size: "sm",
                    onClick: () => navigate(`/dashboard/marketing/${proyecto.id || proyecto._id}/detalle`),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Editar marketing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.IconButton,
                  {
                    variant: "text",
                    color: "green",
                    size: "sm",
                    onClick: () => navigate(`/dashboard/marketing/${proyecto.id || proyecto._id}/editar`),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Ver vista pública", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.IconButton,
                  {
                    variant: "text",
                    color: "orange",
                    size: "sm",
                    onClick: () => {
                      const publicUrl = `http://localhost:4000/publico/property-details.html?id=${proyecto.id || proyecto._id}`;
                      window.open(publicUrl, "_blank");
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowTopRightOnSquareIcon, { className: "h-4 w-4" })
                  }
                ) })
              ] }) })
            ] }, proyecto.id || proyecto._id || index2);
          }) })
        ] }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center gap-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "outlined",
              size: "sm",
              onClick: handlePrevPage,
              disabled: page === 1,
              children: "Anterior"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: [
            "Página ",
            page,
            " de ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "outlined",
              size: "sm",
              onClick: handleNextPage,
              disabled: page === totalPages,
              children: "Siguiente"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
const API_URL = "https://lead-inmobiliaria.com";
function logCookies() {
  console.log("Cookies disponibles:", document.cookie);
}
const fetchAPI = async (endpoint, method = "GET", data = null) => {
  try {
    const url = `${API_URL}${endpoint}`;
    logCookies();
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    const authCookie = document.cookie.split("; ").find((cookie) => cookie.startsWith("Authorization="));
    if (authCookie) {
      const token = authCookie.split("=")[1];
      console.log("Token de autenticación encontrado en cookie");
      headers["Authorization"] = token;
    } else {
      console.warn("No se encontró cookie de autenticación");
    }
    const options = {
      method,
      headers,
      credentials: "include"
      // Para enviar cookies de sesión
    };
    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }
    console.log(`Realizando petición ${method} a ${url}`, options);
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("La respuesta del servidor no es JSON");
    }
    const responseData = await response.json();
    if (!response.ok) {
      console.error("Error en respuesta API:", response.status, responseData);
      throw new Error(responseData.mensaje || "Error en la petición");
    }
    return responseData;
  } catch (error) {
    console.error("Error en API:", error);
    throw error;
  }
};
const captacionesAPI = {
  /**
   * Obtener todas las captaciones
   * @returns {Promise} Lista de captaciones
   */
  getAll: async () => {
    return fetchAPI("/api/captaciones");
  },
  /**
   * Obtener una captación por ID
   * @param {string} id - ID de la captación
   * @returns {Promise} Datos de la captación
   */
  getById: async (id) => {
    return fetchAPI(`/api/captaciones/${id}`);
  },
  /**
   * Crear una nueva captación
   * @param {object} data - Datos de la captación
   * @returns {Promise} Respuesta del servidor
   */
  create: async (data) => {
    return fetchAPI("/api/captaciones", "POST", data);
  },
  /**
   * Actualizar una captación existente
   * @param {string} id - ID de la captación
   * @param {object} data - Datos actualizados
   * @returns {Promise} Respuesta del servidor
   */
  update: async (id, data) => {
    return fetchAPI(`/api/captaciones/${id}/unified`, "PUT", data);
  },
  /**
   * Eliminar una captación
   * @param {string} id - ID de la captación
   * @returns {Promise} Respuesta del servidor
   */
  delete: async (id) => {
    return fetchAPI(`/api/captaciones/${id}`, "DELETE");
  }
};
function EditarMarketing() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(null);
  const [proyecto, setProyecto] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [isMarketing, setIsMarketing] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    titulo: "",
    precioOferta: "",
    descripcionMarketing: "",
    estatusPublicacion: "No publicada",
    imagenesMarketing: []
  });
  const [nuevasImagenes, setNuevasImagenes] = reactExports.useState([]);
  const [imagenesAEliminar, setImagenesAEliminar] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      var _a2;
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          const userRole = ((_a2 = data.user) == null ? void 0 : _a2.role) || "";
          setIsAdmin(
            userRole.toLowerCase().includes("administrator") || userRole === "Admin" || userRole === "Superadministrator"
          );
          setIsMarketing(
            userRole === "Marketing" || userRole === "Asesor" || userRole === "User"
          );
        } else {
          navigate("/auth/sign-in");
        }
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        navigate("/auth/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  const fetchProyecto = async () => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n;
    setIsLoading(true);
    setError(null);
    try {
      console.log("=== DEBUG: fetchProyecto ejecutándose ===");
      console.log("ID del proyecto:", id);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/marketing/${id}`, {
        credentials: "include",
        headers: {
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
        throw new Error(errorData.mensaje || `Error al obtener el proyecto: ${response.status}`);
      }
      const data = await response.json();
      console.log("=== DEBUG: Respuesta completa del backend ===");
      console.log("data:", data);
      const proyectoData = data.proyecto || data;
      console.log("=== DEBUG: Estatus del proyecto ===");
      console.log("proyectoData.venta?.estatus_venta:", (_a2 = proyectoData.venta) == null ? void 0 : _a2.estatus_venta);
      console.log("proyectoData.estatus_actual:", proyectoData.estatus_actual);
      console.log("proyectoData.venta:", proyectoData.venta);
      const estatusValido = ((_b2 = proyectoData.venta) == null ? void 0 : _b2.estatus_venta) === "Disponible para venta" || proyectoData.estatus_actual === "En venta" || proyectoData.estatus_actual === "Disponible para venta" || proyectoData.estatus_actual === "Remodelacion";
      if (!estatusValido) {
        setError(`Este proyecto no está disponible para marketing. Estatus actual: ${((_c2 = proyectoData.venta) == null ? void 0 : _c2.estatus_venta) || proyectoData.estatus_actual || "No definido"}. Solo se pueden editar propiedades con estatus "Disponible para venta", "En venta" o "Remodelacion".`);
        return;
      }
      setProyecto(proyectoData);
      console.log("=== DEBUG: Datos del proyecto cargados ===");
      console.log("proyectoData:", proyectoData);
      console.log("propiedad:", proyectoData.propiedad);
      console.log("marketing:", proyectoData.marketing);
      console.log("imagenes en marketing:", (_d2 = proyectoData.marketing) == null ? void 0 : _d2.imagenes);
      const formDataInicial = {
        titulo: ((_e2 = proyectoData.marketing) == null ? void 0 : _e2.titulo) || ((_f2 = proyectoData.propiedad) == null ? void 0 : _f2.titulo) || ((_g2 = proyectoData.propiedad) == null ? void 0 : _g2.descripcion_adicional) || "",
        precioOferta: ((_h2 = proyectoData.marketing) == null ? void 0 : _h2.precioOferta) || ((_i2 = proyectoData.venta) == null ? void 0 : _i2.monto_venta) || ((_j2 = proyectoData.propiedad) == null ? void 0 : _j2.precio) || "",
        descripcionMarketing: ((_k2 = proyectoData.marketing) == null ? void 0 : _k2.descripcion) || ((_l2 = proyectoData.propiedad) == null ? void 0 : _l2.descripcion_adicional) || "",
        estatusPublicacion: ((_m2 = proyectoData.marketing) == null ? void 0 : _m2.estatus_publicacion) || "No publicada",
        imagenesMarketing: ((_n = proyectoData.marketing) == null ? void 0 : _n.imagenes) || []
      };
      setFormData(formDataInicial);
      console.log("=== DEBUG: Formulario inicializado ===");
      console.log("formDataInicial:", formDataInicial);
      console.log("proyectoData.marketing:", proyectoData.marketing);
    } catch (error2) {
      console.error("Error al obtener el proyecto:", error2);
      setError(error2.message || "No se pudo cargar el proyecto");
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (!user || !id)
      return;
    fetchProyecto();
  }, [user, id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleImageSelect = (e) => {
    var _a2, _b2;
    console.log("=== DEBUG: handleImageSelect ejecutándose ===");
    console.log("Evento:", e);
    console.log("Files:", e.target.files);
    const files = Array.from(e.target.files);
    console.log("Files convertidos a array:", files);
    const currentImagesCount = ((_b2 = (_a2 = proyecto == null ? void 0 : proyecto.marketing) == null ? void 0 : _a2.imagenes) == null ? void 0 : _b2.length) || 0;
    console.log("Imágenes actuales en marketing:", currentImagesCount);
    console.log("Nuevas imágenes ya seleccionadas:", nuevasImagenes.length);
    console.log("Nuevas imágenes a agregar:", files.length);
    if (currentImagesCount + nuevasImagenes.length + files.length > 15) {
      setError(`No se pueden subir más de 15 imágenes por propiedad. Actualmente tienes ${currentImagesCount} y estás intentando agregar ${files.length} más.`);
      return;
    }
    setNuevasImagenes((prev) => [...prev, ...files]);
    setError(null);
    console.log("Imágenes agregadas al estado. Total nuevas imágenes:", nuevasImagenes.length + files.length);
  };
  const removeNuevaImagen = (index2) => {
    setNuevasImagenes((prev) => prev.filter((_, i) => i !== index2));
  };
  const handleUploadImages = async () => {
    console.log("=== DEBUG: handleUploadImages ejecutándose ===");
    console.log("nuevasImagenes:", nuevasImagenes);
    console.log("ID del proyecto:", id);
    if (nuevasImagenes.length === 0) {
      setError("No hay imágenes seleccionadas para subir");
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const formData2 = new FormData();
      nuevasImagenes.forEach((imagen, index2) => {
        console.log(`Agregando imagen ${index2 + 1}:`, imagen);
        formData2.append("imagenesMarketing", imagen);
      });
      console.log("FormData creado, enviando petición...");
      console.log("URL:", `${"https://lead-inmobiliaria.com"}/api/marketing/${id}/imagenes`);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/marketing/${id}/imagenes`, {
        method: "POST",
        credentials: "include",
        body: formData2
      });
      console.log("=== DEBUG: Respuesta del servidor ===");
      console.log("Status:", response.status);
      console.log("StatusText:", response.statusText);
      console.log("Headers:", response.headers);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        throw new Error(errorData.message || "Error al subir imágenes");
      }
      const data = await response.json();
      console.log("Respuesta exitosa:", data);
      setSuccess(data.message);
      setNuevasImagenes([]);
      fetchProyecto();
    } catch (error2) {
      console.error("Error al subir imágenes:", error2);
      setError(error2.message || "Error al subir imágenes");
    } finally {
      setIsSaving(false);
    }
  };
  const handleDeleteImage = async (imageKey) => {
    var _a2, _b2, _c2;
    if (!confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      return;
    }
    try {
      console.log("=== DEBUG: Eliminando imagen ===");
      console.log("imageKey:", imageKey);
      console.log("Tipo de imageKey:", typeof imageKey);
      console.log("ID del proyecto:", id);
      const imagenEncontrada = (_b2 = (_a2 = proyecto == null ? void 0 : proyecto.marketing) == null ? void 0 : _a2.imagenes) == null ? void 0 : _b2.find((img) => img.key === imageKey || img.s3Key === imageKey);
      console.log("Imagen encontrada en el proyecto:", imagenEncontrada);
      console.log("Todas las imágenes del proyecto:", (_c2 = proyecto == null ? void 0 : proyecto.marketing) == null ? void 0 : _c2.imagenes);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/marketing/${id}/imagenes?imageKey=${encodeURIComponent(imageKey)}`, {
        method: "DELETE",
        credentials: "include"
      });
      console.log("=== DEBUG: Respuesta de eliminación ===");
      console.log("Status:", response.status);
      console.log("StatusText:", response.statusText);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        throw new Error(errorData.message || "Error al eliminar imagen");
      }
      const data = await response.json();
      console.log("Respuesta exitosa:", data);
      setSuccess(data.message);
      fetchProyecto();
    } catch (error2) {
      console.error("Error al eliminar imagen:", error2);
      setError(error2.message || "Error al eliminar imagen");
    }
  };
  const handleSave = async () => {
    if (!proyecto)
      return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titulo", formData.titulo);
      formDataToSend.append("precioOferta", formData.precioOferta);
      formDataToSend.append("descripcionMarketing", formData.descripcionMarketing);
      nuevasImagenes.forEach((imagen, index2) => {
        formDataToSend.append("imagenesMarketing", imagen);
      });
      if (imagenesAEliminar.length > 0) {
        formDataToSend.append("imagenesAEliminar", JSON.stringify(imagenesAEliminar));
      }
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/marketing/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tituloMarketing: formData.titulo,
          descripcionMarketing: formData.descripcionMarketing,
          precioOferta: formData.precioOferta,
          estatusPublicacion: formData.estatusPublicacion
        })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
        throw new Error(errorData.mensaje || `Error al actualizar el marketing: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        setSuccess("Marketing actualizado correctamente");
        setProyecto((prev) => ({
          ...prev,
          propiedad: {
            ...prev.propiedad,
            titulo: formData.titulo,
            descripcionMarketing: formData.descripcionMarketing,
            imagenesMarketing: [
              ...formData.imagenesMarketing.filter((img) => !imagenesAEliminar.includes(img)),
              ...nuevasImagenes.map((img) => URL.createObjectURL(img))
            ]
          },
          venta: {
            ...prev.venta,
            monto_venta: formData.precioOferta
          }
        }));
        setNuevasImagenes([]);
        setImagenesAEliminar([]);
        setTimeout(() => {
          navigate("/dashboard/marketing");
        }, 2e3);
      } else {
        throw new Error(result.message || "Error al actualizar el marketing");
      }
    } catch (error2) {
      console.error("Error al guardar:", error2);
      setError(error2.message || "Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }) });
  }
  if (error && !proyecto) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          color: "blue",
          onClick: () => navigate("/dashboard/marketing"),
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
            "Volver a Marketing"
          ]
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "green", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "white", children: [
        "Editar Marketing - ",
        ((_a = proyecto == null ? void 0 : proyecto.propiedad) == null ? void 0 : _a.tipo) || "Proyecto"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          size: "sm",
          variant: "text",
          color: "white",
          onClick: () => navigate("/dashboard/marketing"),
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
            "Volver"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "green", className: "mb-4", children: success }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Información del Proyecto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: [
              "Tipo: ",
              ((_b = proyecto == null ? void 0 : proyecto.propiedad) == null ? void 0 : _b.tipo) || "Sin especificar"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", children: [
              "Dirección: ",
              ((_d = (_c = proyecto == null ? void 0 : proyecto.propiedad) == null ? void 0 : _c.direccion) == null ? void 0 : _d.calle) || "Sin especificar",
              ", ",
              ((_f = (_e = proyecto == null ? void 0 : proyecto.propiedad) == null ? void 0 : _e.direccion) == null ? void 0 : _f.colonia) || "",
              ", ",
              ((_h = (_g = proyecto == null ? void 0 : proyecto.propiedad) == null ? void 0 : _g.direccion) == null ? void 0 : _h.ciudad) || ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: [
              "Recámaras: ",
              ((_j = (_i = proyecto == null ? void 0 : proyecto.propiedad) == null ? void 0 : _i.caracteristicas) == null ? void 0 : _j.habitaciones) || "Sin especificar"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", children: [
              "Construcción: ",
              ((_l = (_k = proyecto == null ? void 0 : proyecto.propiedad) == null ? void 0 : _k.caracteristicas) == null ? void 0 : _l.m2_construccion) || "Sin especificar",
              " m²"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Configuración de Marketing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                label: "Título para Marketing",
                name: "titulo",
                value: formData.titulo,
                onChange: handleInputChange,
                placeholder: "Ej: Hermosa casa en fraccionamiento exclusivo"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                label: "Precio de Oferta",
                name: "precioOferta",
                value: formData.precioOferta,
                onChange: handleInputChange,
                placeholder: "Ej: $2,500,000"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-2", children: "Estatus de Publicación" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "estatusPublicacion",
                    value: "No publicada",
                    checked: formData.estatusPublicacion === "No publicada",
                    onChange: handleInputChange,
                    className: "text-red-500"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "red", className: "font-medium", children: "No Publicada" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "estatusPublicacion",
                    value: "Publicada",
                    checked: formData.estatusPublicacion === "Publicada",
                    onChange: handleInputChange,
                    className: "text-green-500"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: "Publicada" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: 'Solo las propiedades marcadas como "Publicada" aparecerán en el sitio web público' })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Textarea,
            {
              label: "Descripción Personalizada para Marketing",
              name: "descripcionMarketing",
              value: formData.descripcionMarketing,
              onChange: handleInputChange,
              placeholder: "Describe las características más atractivas de la propiedad para el público...",
              rows: 4
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Imágenes de Marketing" }),
          ((_m = proyecto == null ? void 0 : proyecto.marketing) == null ? void 0 : _m.imagenes) && proyecto.marketing.imagenes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "mb-2", children: [
              "Imágenes actuales (",
              proyecto.marketing.imagenes.length,
              "/15):"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: proyecto.marketing.imagenes.map((imagen, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imagen.url,
                  alt: `Imagen ${index2 + 1}`,
                  className: "w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Eliminar imagen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.IconButton,
                {
                  variant: "text",
                  color: "red",
                  onClick: () => handleDeleteImage(imagen.key || imagen.s3Key),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon$1, { className: "h-5 w-5" })
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 bg-white bg-opacity-80 rounded px-2 py-1 text-xs text-gray-700", children: index2 + 1 })
            ] }, index2)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "mb-2", children: "Añadir nuevas imágenes:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "file",
                multiple: true,
                accept: "image/*",
                onChange: handleImageSelect,
                className: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: "Máximo 15 imágenes por propiedad. Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB por imagen." })
          ] }),
          nuevasImagenes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "mb-2", children: [
              "Nuevas imágenes a subir (",
              nuevasImagenes.length,
              "):"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: nuevasImagenes.map((imagen, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: URL.createObjectURL(imagen),
                  alt: `Nueva imagen ${index2 + 1}`,
                  className: "w-full h-32 object-cover rounded-lg border-2 border-green-200"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.IconButton,
                {
                  variant: "text",
                  color: "red",
                  size: "sm",
                  className: "absolute top-2 right-2 bg-white",
                  onClick: () => removeNuevaImagen(index2),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon$1, { className: "h-5 w-5" })
                }
              )
            ] }, index2)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Button,
              {
                color: "green",
                onClick: handleUploadImages,
                disabled: isSaving,
                className: "flex items-center gap-2",
                children: [
                  isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }) }),
                  isSaving ? "Subiendo..." : `Subir ${nuevasImagenes.length} imagen(es)`
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4 pt-4 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "text",
              color: "gray",
              onClick: () => navigate("/dashboard/marketing"),
              disabled: isSaving,
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              color: "green",
              onClick: handleSave,
              disabled: isSaving,
              className: "flex items-center gap-2",
              children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-4 w-4" }),
                "Guardando..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoIcon$1, { className: "h-4 w-4" }),
                "Guardar Marketing"
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function DetalleMarketing() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [proyecto, setProyecto] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          navigate("/auth/sign-in");
        }
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        navigate("/auth/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  reactExports.useEffect(() => {
    if (!user || !id)
      return;
    const fetchProyecto = async () => {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/marketing/${id}`, {
          credentials: "include",
          headers: {
            "Accept": "application/json"
          }
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener el proyecto: ${response.status}`);
        }
        const data = await response.json();
        console.log("=== DEBUG: Respuesta completa del backend ===");
        console.log("data:", data);
        const proyectoData = data.proyecto || data;
        console.log("=== DEBUG: Estatus del proyecto ===");
        console.log("proyectoData.venta?.estatus_venta:", (_a2 = proyectoData.venta) == null ? void 0 : _a2.estatus_venta);
        console.log("proyectoData.estatus_actual:", proyectoData.estatus_actual);
        console.log("proyectoData.venta:", proyectoData.venta);
        const estatusValido = ((_b2 = proyectoData.venta) == null ? void 0 : _b2.estatus_venta) === "Disponible para venta" || proyectoData.estatus_actual === "En venta" || proyectoData.estatus_actual === "Disponible para venta" || proyectoData.estatus_actual === "Remodelacion";
        if (!estatusValido) {
          setError(`Este proyecto no está disponible para marketing. Estatus actual: ${((_c2 = proyectoData.venta) == null ? void 0 : _c2.estatus_venta) || proyectoData.estatus_actual || "No definido"}. Solo se pueden ver propiedades con estatus "Disponible para venta", "En venta" o "Remodelacion".`);
          return;
        }
        setProyecto(proyectoData);
        console.log("=== DEBUG: Datos del proyecto cargados en DetalleMarketing ===");
        console.log("proyectoData:", proyectoData);
        console.log("marketing:", proyectoData.marketing);
        console.log("marketing.titulo:", (_d2 = proyectoData.marketing) == null ? void 0 : _d2.titulo);
        console.log("marketing.precioOferta:", (_e2 = proyectoData.marketing) == null ? void 0 : _e2.precioOferta);
        console.log("marketing.descripcion:", (_f2 = proyectoData.marketing) == null ? void 0 : _f2.descripcion);
      } catch (error2) {
        console.error("Error al obtener el proyecto:", error2);
        setError(error2.message || "No se pudo cargar el proyecto");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProyecto();
  }, [user, id]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }) });
  }
  if (error && !proyecto) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          color: "blue",
          onClick: () => navigate("/dashboard/marketing"),
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
            "Volver a Marketing"
          ]
        }
      )
    ] }) }) });
  }
  if (!proyecto) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "red", className: "mb-4", children: "Proyecto no encontrado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          color: "blue",
          onClick: () => navigate("/dashboard/marketing"),
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
            "Volver a Marketing"
          ]
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "green", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "white", children: [
        "Detalle de Marketing - ",
        ((_a = proyecto.propiedad) == null ? void 0 : _a.tipo) || "Proyecto"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "sm",
            variant: "text",
            color: "white",
            onClick: () => navigate("/dashboard/marketing"),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
              "Volver"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "sm",
            color: "white",
            onClick: () => navigate(`/dashboard/marketing/${id}/editar`),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon, { className: "h-4 w-4" }),
              "Editar Marketing"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-4", children: "Información del Proyecto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HomeIcon, { className: "h-6 w-6 text-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Tipo de Propiedad" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_b = proyecto.propiedad) == null ? void 0 : _b.tipo) || "Sin especificar" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPinIcon, { className: "h-6 w-6 text-green-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Ubicación" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "paragraph", color: "blue-gray", children: [
                ((_d = (_c = proyecto.propiedad) == null ? void 0 : _c.direccion) == null ? void 0 : _d.calle) || "Sin especificar",
                ", ",
                ((_f = (_e = proyecto.propiedad) == null ? void 0 : _e.direccion) == null ? void 0 : _f.colonia) || "",
                ", ",
                ((_h = (_g = proyecto.propiedad) == null ? void 0 : _g.direccion) == null ? void 0 : _h.ciudad) || ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 bg-amber-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon, { className: "h-6 w-6 text-amber-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: "Precio de Venta" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "paragraph", color: "blue-gray", children: [
                "$",
                ((_i = proyecto.venta) == null ? void 0 : _i.monto_venta) || "Sin precio definido"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: ((_k = (_j = proyecto.propiedad) == null ? void 0 : _j.caracteristicas) == null ? void 0 : _k.habitaciones) || "Sin especificar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Recámaras" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: ((_m = (_l = proyecto.propiedad) == null ? void 0 : _l.caracteristicas) == null ? void 0 : _m.m2_terreno) || "Sin especificar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "m² Terreno" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: ((_o = (_n = proyecto.propiedad) == null ? void 0 : _n.caracteristicas) == null ? void 0 : _o.m2_construccion) || "Sin especificar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "m² Construcción" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: ((_q = (_p = proyecto.propiedad) == null ? void 0 : _p.caracteristicas) == null ? void 0 : _q.baños) || "Sin especificar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Baños" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-4", children: "Configuración de Marketing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "mb-2", children: "Título para Marketing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_r = proyecto.marketing) == null ? void 0 : _r.titulo) || "Sin título personalizado" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "mb-2", children: "Precio de Oferta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h5", color: "green", className: "font-bold", children: [
              "$",
              ((_s = proyecto.marketing) == null ? void 0 : _s.precioOferta) || "Sin precio definido"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue", className: "mb-2", children: "Estatus de Publicación" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: ((_t = proyecto.marketing) == null ? void 0 : _t.estatus_publicacion) || "No publicada",
                color: ((_u = proyecto.marketing) == null ? void 0 : _u.estatus_publicacion) === "Publicada" ? "green" : "red",
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: ((_v = proyecto.marketing) == null ? void 0 : _v.estatus_publicacion) === "Publicada" ? "Visible en el sitio web público" : "No visible en el sitio web público" })
          ] })
        ] }),
        ((_w = proyecto.marketing) == null ? void 0 : _w.descripcion) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-blue-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue", className: "mb-2", children: "Descripción Personalizada" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: proyecto.marketing.descripcion })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-4", children: "Galería de Imágenes" }),
        ((_x = proyecto.marketing) == null ? void 0 : _x.imagenes) && proyecto.marketing.imagenes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "green", className: "mb-3", children: [
            "Imágenes de Marketing (",
            proyecto.marketing.imagenes.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4", children: proyecto.marketing.imagenes.map((imagen, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imagen.url,
                alt: `Imagen marketing ${index2 + 1}`,
                className: "w-full h-32 object-cover rounded-lg border-2 border-green-200 hover:border-green-500 transition-colors cursor-pointer",
                onClick: () => window.open(imagen.url, "_blank")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoIcon$1, { className: "h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded", children: "Marketing" })
          ] }, index2)) })
        ] }),
        (!((_y = proyecto.marketing) == null ? void 0 : _y.imagenes) || proyecto.marketing.imagenes.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoIcon$1, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", className: "mb-2", children: "No hay imágenes de marketing disponibles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Este proyecto aún no tiene imágenes de marketing cargadas" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-4", children: "Información del Propietario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue", className: "mb-2", children: "Nombre del Propietario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_z = proyecto.propietario) == null ? void 0 : _z.nombre) || "Sin especificar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue", className: "mb-2", children: "Teléfono" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_A = proyecto.propietario) == null ? void 0 : _A.telefono) || "Sin especificar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue", className: "mb-2", children: "Correo Electrónico" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_B = proyecto.propietario) == null ? void 0 : _B.correo) || "Sin especificar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue", className: "mb-2", children: "Estado Civil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_C = proyecto.propietario) == null ? void 0 : _C.estado_civil) || "Sin especificar" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-4", children: "Información de Captación" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "mb-2", children: "Tipo de Captación" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_D = proyecto.captacion) == null ? void 0 : _D.tipo_captacion) || "Sin especificar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "mb-2", children: "Fecha de Captación" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_E = proyecto.captacion) == null ? void 0 : _E.fecha) ? new Date(proyecto.captacion.fecha).toLocaleDateString() : "Sin especificar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "mb-2", children: "Asesor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: ((_G = (_F = proyecto.captacion) == null ? void 0 : _F.asesor) == null ? void 0 : _G.nombre) || "No asignado" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "mb-2", children: "Estatus Actual" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: proyecto.estatus_actual || "Desconocido",
                color: proyecto.estatus_actual === "Disponible para venta" ? "green" : proyecto.estatus_actual === "Remodelacion" ? "amber" : proyecto.estatus_actual === "En venta" ? "green" : proyecto.estatus_actual === "Vendida" ? "gray" : proyecto.estatus_actual === "Cancelada" ? "red" : "blue",
                size: "sm"
              }
            )
          ] })
        ] }),
        ((_H = proyecto.captacion) == null ? void 0 : _H.observaciones) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-purple-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "mb-2", children: "Observaciones" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", children: proyecto.captacion.observaciones })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 pt-6 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            variant: "text",
            color: "gray",
            onClick: () => navigate("/dashboard/marketing"),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
              "Volver a Marketing"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            color: "green",
            onClick: () => navigate(`/dashboard/marketing/${id}/editar`),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon, { className: "h-4 w-4" }),
              "Editar Marketing"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
const axiosInstance = axios.create({
  baseURL: "https://lead-inmobiliaria.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    var _a, _b;
    console.error("Error Response:", {
      message: error.message,
      status: (_a = error.response) == null ? void 0 : _a.status,
      data: (_b = error.response) == null ? void 0 : _b.data
    });
    return Promise.reject(error);
  }
);
function SignIn() {
  const [formData, setFormData] = reactExports.useState({
    email: "",
    password: ""
  });
  const [error, setError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const navigate = useNavigate();
  useAuth();
  reactExports.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get("/api/check-auth");
        if (response.data.success) {
          setIsAuthenticated(true);
        }
      } catch (error2) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleLogin = async () => {
    var _a, _b, _c;
    setError("");
    console.log("Iniciando login...");
    console.log("URL API:", "https://lead-inmobiliaria.com");
    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    try {
      console.log("Enviando petición...");
      const response = await axiosInstance.post("/api/signin", formData);
      console.log("Respuesta recibida:", response);
      if (response.data.success) {
        console.log("Login exitoso");
        navigate("/dashboard/home");
      }
    } catch (error2) {
      console.error("Error detallado:", {
        message: error2.message,
        response: (_a = error2.response) == null ? void 0 : _a.data,
        status: (_b = error2.response) == null ? void 0 : _b.status,
        headers: (_c = error2.response) == null ? void 0 : _c.headers
      });
      setError("El correo o la contraseña son incorrectos.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Cargando..." });
  }
  if (isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard/home", replace: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "m-8 flex gap-4 bg-[#e7efe0] items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-full lg:w-2/4 mt-20 mb-20 overflow-hidden rounded-3xl",
        style: {
          position: "relative",
          minHeight: "400px",
          maxWidth: "550px",
          marginRight: "40px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(/img/leadimagen.jpeg)",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "24px"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-2/4 mt-20 mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h2", className: "font-bold mb-4", children: "Sign In" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "text-lg font-normal", children: "Enter your email and password to Sign In." }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "mt-2", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-3/4", onSubmit: (e) => {
        e.preventDefault();
        handleLogin();
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "-mb-3 font-medium", children: "Your email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "email",
              size: "lg",
              placeholder: "name@mail.com",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.email,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "-mb-3 font-medium", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "password",
              type: "password",
              size: "lg",
              placeholder: "********",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.password,
              onChange: handleChange,
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLogin();
                }
              },
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            onClick: handleLogin,
            className: "mt-6",
            fullWidth: true,
            children: "Sign In"
          }
        )
      ] })
    ] })
  ] });
}
axios.defaults.baseURL = "https://lead-inmobiliaria.com";
axios.defaults.withCredentials = true;
function SignUp({ dashboard = false }) {
  const [formData, setFormData] = reactExports.useState({
    prim_nom: "",
    segun_nom: "",
    apell_pa: "",
    apell_ma: "",
    fecha_na: "",
    pust: "",
    calle: "",
    num_in: "",
    nun_ex: "",
    codigo: "",
    telefono: "",
    email: "",
    password: "",
    role: "user",
    empleado_id: ""
    // Nuevo campo para asociar con empleado existente
  });
  const [error, setError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [empleados, setEmpleados] = reactExports.useState([]);
  const [loadingEmpleados, setLoadingEmpleados] = reactExports.useState(false);
  const [useExistingEmployee, setUseExistingEmployee] = reactExports.useState(true);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  reactExports.useEffect(() => {
    const fetchEmpleados = async () => {
      var _a;
      if (dashboard) {
        try {
          setLoadingEmpleados(true);
          console.log("Solicitando empleados...");
          const response = await axios.get("/api/empleados-api");
          console.log("Respuesta completa:", response);
          if (response.data && response.data.success) {
            console.log("Número de empleados:", response.data.count || "no especificado");
            console.log("Primer empleado:", response.data.empleados[0]);
            const empleadosActivos = response.data.empleados.filter(
              (empleado) => empleado.estado === "Activo"
            );
            setEmpleados(empleadosActivos || []);
          } else {
            console.error("Error en la respuesta:", response.data);
            setEmpleados([]);
          }
        } catch (error2) {
          console.error("Error al cargar empleados:", error2);
          console.error("Detalles:", ((_a = error2.response) == null ? void 0 : _a.data) || error2.message);
          setEmpleados([]);
        } finally {
          setLoadingEmpleados(false);
        }
      }
    };
    fetchEmpleados();
  }, [dashboard]);
  reactExports.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/check-auth");
        if (dashboard) {
          if (response.data.success) {
            const user = response.data.user;
            const userRole = (user == null ? void 0 : user.role) || "";
            const isAdmin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
            if (!isAdmin) {
              navigate("/dashboard/home");
            }
            setIsAuthenticated(true);
          } else {
            navigate("/auth/sign-in");
          }
        } else if (!response.data.success) {
          setIsAuthenticated(false);
        } else {
          navigate("/dashboard/home");
        }
      } catch (error2) {
        if (dashboard) {
          navigate("/dashboard/home");
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [navigate, dashboard]);
  reactExports.useEffect(() => {
    console.log("Empleados cargados:", empleados);
  }, [empleados]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };
  const handleEmpleadoChange = async (empleadoId) => {
    setFormData({
      ...formData,
      empleado_id: empleadoId
    });
    if (empleadoId && useExistingEmployee) {
      try {
        const response = await axios.get(`/api/empleados-api/${empleadoId}`);
        if (response.data && response.data.success) {
          const empleado = response.data.empleado;
          setFormData((prevState) => ({
            ...prevState,
            empleado_id: empleadoId,
            prim_nom: empleado.prim_nom || "",
            segun_nom: empleado.segun_nom || "",
            apell_pa: empleado.apell_pa || "",
            apell_ma: empleado.apell_ma || "",
            fecha_na: empleado.fecha_na || "",
            pust: empleado.pust || "",
            calle: empleado.calle || "",
            num_in: empleado.num_in || "",
            nun_ex: empleado.nun_ex || "",
            codigo: empleado.codigo || "",
            telefono: empleado.telefono || ""
            // No sobreescribimos email y password
          }));
        }
      } catch (error2) {
        console.error("Error al cargar datos del empleado:", error2);
      }
    }
  };
  const toggleEmployeeMode = () => {
    setUseExistingEmployee(!useExistingEmployee);
    const { email, password, role } = formData;
    setFormData({
      prim_nom: "",
      segun_nom: "",
      apell_pa: "",
      apell_ma: "",
      fecha_na: "",
      pust: "",
      calle: "",
      num_in: "",
      nun_ex: "",
      codigo: "",
      telefono: "",
      email,
      password,
      role,
      empleado_id: ""
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleRegister = async () => {
    var _a, _b;
    try {
      setError("");
      console.log("Datos a enviar:", formData);
      if (!formData.prim_nom || !formData.apell_pa || !formData.apell_ma || !formData.fecha_na || !formData.pust || !formData.calle || !formData.nun_ex || !formData.codigo || !formData.telefono || !formData.email || !formData.password) {
        setError("Por favor complete todos los campos obligatorios.");
        return;
      }
      const response = await axios.post("/api/signup", formData);
      if (response.data.success) {
        if (selectedFile) {
          const userId = response.data.user._id;
          const formData2 = new FormData();
          formData2.append("foto_perfil", selectedFile);
          try {
            await axios.post(`${"https://lead-inmobiliaria.com"}/api/users/${userId}/upload-photo`, formData2, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            console.log("Foto de perfil subida correctamente");
          } catch (photoError) {
            console.error("Error al subir la foto de perfil:", photoError);
          }
        }
        if (dashboard) {
          setFormData({
            prim_nom: "",
            segun_nom: "",
            apell_pa: "",
            apell_ma: "",
            fecha_na: "",
            pust: "",
            calle: "",
            num_in: "",
            nun_ex: "",
            codigo: "",
            telefono: "",
            email: "",
            password: "",
            role: "user",
            empleado_id: ""
          });
          alert("Usuario creado exitosamente");
        } else {
          const loginSuccess = await login({
            email: formData.email,
            password: formData.password
          });
          if (loginSuccess) {
            navigate("/dashboard/home");
          }
        }
      }
    } catch (error2) {
      console.error("Error al registrar:", error2);
      setError(((_b = (_a = error2.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Error durante el registro");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Verificando autenticación..." });
  }
  if (!dashboard && !isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/auth/sign-in", replace: true });
  }
  const FieldDescription2 = ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1 text-xs", children });
  const renderForm = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 mb-2 mx-auto w-full max-w-screen-lg lg:w-3/4", onSubmit: (e) => e.preventDefault(), children: [
    dashboard && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Datos del Usuario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            variant: "text",
            color: useExistingEmployee ? "blue" : "gray",
            onClick: toggleEmployeeMode,
            className: "flex items-center gap-2",
            children: useExistingEmployee ? "Crear usuario sin empleado" : "Usar empleado existente"
          }
        )
      ] }),
      useExistingEmployee ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3 font-medium", children: "Asociar con Empleado Existente" }),
        loadingEmpleados ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-8 w-8 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: "Cargando empleados..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-blue-gray-700 font-medium", children: "Seleccionar Empleado *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: formData.empleado_id,
                onChange: (e) => handleEmpleadoChange(e.target.value),
                className: "w-full h-11 px-3 py-2 border border-blue-gray-200 rounded-lg bg-white text-blue-gray-700 outline-none focus:border-gray-900 transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Seleccione un empleado" }),
                  empleados && empleados.length > 0 ? empleados.map((empleado) => {
                    const nombreCompleto = `${empleado.prim_nom || ""} ${empleado.segun_nom || ""} ${empleado.apell_pa || ""} ${empleado.apell_ma || ""}`.trim();
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: empleado._id, children: [
                      nombreCompleto,
                      " - ",
                      empleado.pust || "Sin puesto"
                    ] }, empleado._id);
                  }) : /* @__PURE__ */ jsxRuntimeExports.jsx("option", { disabled: true, value: "", children: "No hay empleados disponibles" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "mt-2 text-gray-600 italic", children: "* Solo se muestran empleados con estado Activo" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "gray", className: "mb-4", children: "Creando un usuario sin asociación a empleado existente" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-col gap-6", children: [
      (!useExistingEmployee || !dashboard) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3 font-medium", children: "Datos Personales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "prim_nom",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.prim_nom,
              onChange: handleChange,
              required: true,
              label: "Primer nombre *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Nombre principal del usuario" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "segun_nom",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.segun_nom,
              onChange: handleChange,
              label: "Segundo nombre",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Si tiene un segundo nombre (opcional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "apell_pa",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.apell_pa,
              onChange: handleChange,
              required: true,
              label: "Apellido paterno *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Primer apellido del usuario" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "apell_ma",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.apell_ma,
              onChange: handleChange,
              required: true,
              label: "Apellido materno *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Segundo apellido del usuario" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "fecha_na",
              type: "date",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.fecha_na,
              onChange: handleChange,
              required: true,
              label: "Fecha de nacimiento *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Fecha de nacimiento en formato DD/MM/AAAA" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "telefono",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.telefono,
              onChange: handleChange,
              required: true,
              label: "Teléfono *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Número de teléfono con formato de 10 dígitos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mt-4 mb-3 font-medium", children: "Datos Laborales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "pust",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.pust,
              onChange: handleChange,
              required: true,
              label: "Puesto o cargo *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Puesto o cargo que ocupa en la empresa" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mt-4 mb-3 font-medium", children: "Dirección" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "calle",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.calle,
              onChange: handleChange,
              required: true,
              label: "Calle *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Nombre de la calle donde reside" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "num_in",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.num_in,
              onChange: handleChange,
              label: "Número interior",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Número interior del domicilio (si aplica)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "nun_ex",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.nun_ex,
              onChange: handleChange,
              required: true,
              label: "Número exterior *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Número exterior del domicilio" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "codigo",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.codigo,
              onChange: handleChange,
              required: true,
              label: "Código postal *",
              disabled: useExistingEmployee && formData.empleado_id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Código postal de 5 dígitos" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mt-4 mb-3 font-medium", children: "Datos de Cuenta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            name: "email",
            type: "email",
            size: "lg",
            className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
            value: formData.email,
            onChange: handleChange,
            required: true,
            label: "Correo electrónico *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Dirección de correo electrónico para acceso al sistema" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            name: "password",
            type: "password",
            size: "lg",
            className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
            value: formData.password,
            onChange: handleChange,
            required: true,
            label: "Contraseña *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Contraseña segura de al menos 8 caracteres" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Rol de usuario *",
            value: formData.role,
            onChange: handleRoleChange,
            className: "bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "user", children: "Usuario regular" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "administrator", children: "Administrador (Acceso completo)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "administrador", children: "Administrador de sistema" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "supervisor", children: "Supervisor de obra" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "contratista", children: "Contratista" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "ayudante de administrador", children: "Ayudante de administrador" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Nivel de acceso y permisos en el sistema" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mt-4 mb-3 font-medium", children: "Foto de Perfil (Opcional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "dropzone-file",
            className: "flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
            children: [
              previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: previewUrl,
                  alt: "Vista previa",
                  className: "max-h-44 max-w-full object-contain"
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CloudArrowUpIcon, { className: "w-8 h-8 mb-4 text-gray-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-sm text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Haz clic para subir" }),
                  " o arrastra y suelta"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "SVG, PNG, JPG o GIF (Máx. 2MB)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "dropzone-file",
                  type: "file",
                  className: "hidden",
                  accept: "image/*",
                  onChange: handleFileChange
                }
              )
            ]
          }
        ) }),
        selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 truncate", children: selectedFile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedFile(null);
                setPreviewUrl(null);
              },
              className: "text-xs text-red-500 hover:text-red-700",
              children: "Eliminar"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription2, { children: "Imagen para tu perfil de usuario (opcional)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "flex items-center justify-center gap-1 font-normal mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" }),
        " Campos obligatorios"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          onClick: handleRegister,
          className: "mt-2",
          fullWidth: true,
          color: "blue",
          children: "Registrar Nuevo Usuario"
        }
      )
    ] }),
    !dashboard && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "paragraph", className: "text-center text-blue-gray-500 font-medium mt-4", children: [
      "¿Ya tienes una cuenta?",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/sign-in", className: "text-blue-500 ml-1", children: "Iniciar sesión" })
    ] })
  ] });
  if (dashboard) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-10 max-w-4xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", color: "white", children: "Crear Nuevo Usuario" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center lg:w-3/4 mx-auto", children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "mt-2 mb-4 p-2 bg-red-50 rounded", children: error }) }),
        renderForm()
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "m-8 flex gap-4 bg-[#e7efe0] items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "lg:w-2/4 ml-10 mt-20 mb-20 overflow-hidden rounded-3xl",
        style: {
          position: "relative",
          minHeight: "400px",
          maxWidth: "550px",
          marginRight: "40px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(/img/leadimagen.jpeg)",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "24px"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-2/4 mt-20 mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center lg:w-3/4 mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h2", className: "font-bold mb-4", children: "Registro de Usuario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "text-lg font-normal", children: "Complete todos los campos para crear una cuenta." }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "mt-2 p-2 bg-red-50 rounded", children: error })
      ] }),
      renderForm()
    ] })
  ] });
}
function MiNominaPage() {
  const [userData, setUserData] = reactExports.useState(null);
  const [nominas, setNominas] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          withCredentials: true
        });
        console.log("Respuesta de check-auth:", userResponse.data);
        if (!userResponse.data.success) {
          setError("No se pudo obtener información del usuario");
          setLoading(false);
          return;
        }
        const user = userResponse.data.user;
        console.log("Usuario autenticado completo:", user);
        try {
          const empleadoResponse = await axios.get(`${"https://lead-inmobiliaria.com"}/api/empleados-api/by-user/${user.id}`, {
            withCredentials: true
          });
          if (empleadoResponse.data.success && empleadoResponse.data.empleado) {
            setUserData({
              ...user,
              empleado_id: empleadoResponse.data.empleado._id ? empleadoResponse.data.empleado._id : user.empleado_id,
              nombre_completo: `${empleadoResponse.data.empleado.prim_nom} ${empleadoResponse.data.empleado.apell_pa}`
            });
            setLoading(false);
            return;
          }
          if (!empleadoResponse.data.success) {
            const User = await axios.get(`${"https://lead-inmobiliaria.com"}/api/users/${user.id}`, {
              withCredentials: true
            });
            console.log("Respuesta de users:", User.data);
            if (User.data.success && User.data.user && User.data.user.empleado_id) {
              setUserData({
                ...user,
                empleado_id: User.data.user.empleado_id,
                nombre_completo: User.data.user.prim_nom && User.data.user.apell_pa ? `${User.data.user.prim_nom} ${User.data.user.apell_pa}` : "Usuario"
              });
              setLoading(false);
              console.log("Empleado encontrado, ID:", User.data.user.empleado_id);
              return;
            }
          }
        } catch (error2) {
          console.error("Error buscando empleado relacionado:", error2);
        }
        if (user.empleado_id) {
          setUserData({
            ...user,
            empleado_id: user.empleado_id
          });
          setLoading(false);
        } else {
          setError("No se encontró ningún empleado asociado a tu cuenta");
          setLoading(false);
        }
      } catch (error2) {
        console.error("Error obteniendo datos de usuario:", error2);
        setError("Error al conectar con el servidor");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  reactExports.useEffect(() => {
    const fetchNominas = async () => {
      if (!userData || !userData.empleado_id) {
        console.log("No hay ID de empleado disponible");
        return;
      }
      console.log("Intentando obtener nóminas para empleado ID:", userData.empleado_id);
      try {
        const url = `${"https://lead-inmobiliaria.com"}/api/nominas-api/empleado/${userData.empleado_id}`;
        console.log("Intentando URL:", url);
        const response = await axios.get(url, { withCredentials: true });
        console.log("Respuesta completa de nóminas:", response.data);
        if (response.data.success) {
          if (response.data.nominas) {
            console.log("Nóminas obtenidas correctamente:", response.data.nominas.length || 0);
            setNominas(response.data.nominas);
          } else if (response.data.data) {
            console.log("Nóminas obtenidas en data:", response.data.data.length || 0);
            setNominas(response.data.data);
          } else {
            console.log("No se encontraron datos de nóminas en la respuesta");
            setNominas([]);
          }
          setLoading(false);
          return;
        } else {
          throw new Error("La respuesta no fue exitosa");
        }
      } catch (err) {
        console.error("Error obteniendo nóminas:", err);
        setError("No se pudieron cargar las nóminas. Por favor intenta más tarde.");
        setLoading(false);
      }
    };
    fetchNominas();
  }, [userData]);
  const formatFecha = (fecha) => {
    if (!fecha)
      return "N/A";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-MX");
  };
  const formatSalario = (salario) => {
    if (!salario)
      return "$0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(salario);
  };
  const verPDF = async (nomina) => {
    try {
      console.log("Información completa de la nómina:", nomina);
      const response = await axios({
        url: `${"https://lead-inmobiliaria.com"}/api/nominas-api/download/${nomina._id}`,
        method: "GET",
        responseType: "blob",
        withCredentials: true
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `nomina-${nomina.fecha}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error2) {
      console.error("Error al descargar el PDF:", error2);
      if (nomina.url) {
        window.open(nomina.url, "_blank");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Nóminas Table" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "overflow-x-scroll px-0 pt-0 pb-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "red", className: "font-normal", children: error }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block min-w-full align-middle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden border-b border-gray-200 shadow sm:rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-bold leading-none opacity-70",
            children: "Fecha"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-32 max-w-xs text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-bold leading-none opacity-70",
            children: "Concepto"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-bold leading-none opacity-70",
            children: "Salario"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-bold leading-none opacity-70",
            children: "Acciones"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "4", className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: "Cargando datos..." }) }) }) : nominas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "4", className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: "No se encontraron nóminas para este empleado" }) }) }) : nominas.map((nomina, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: formatFecha(nomina.fecha) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 w-32 max-w-xs text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-normal truncate",
            children: nomina.conceptoDePago || "Sin concepto"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: formatSalario(nomina.salario) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            variant: "text",
            color: "blue-gray",
            size: "sm",
            onClick: () => verPDF(nomina),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentArrowDownIcon, { className: "h-4 w-4" })
          }
        ) }) })
      ] }, nomina._id || index2)) })
    ] }) }) }) }) })
  ] }) }) });
}
axios.defaults.baseURL = "https://lead-inmobiliaria.com";
axios.defaults.withCredentials = true;
const FieldDescription = ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1 font-normal", children });
function EditarUser({ dashboard = false }) {
  const { userId } = useParams();
  const [formData, setFormData] = reactExports.useState({
    prim_nom: "",
    segun_nom: "",
    apell_pa: "",
    apell_ma: "",
    fecha_na: "",
    pust: "",
    calle: "",
    num_in: "",
    nun_ex: "",
    codigo: "",
    telefono: "",
    email: "",
    role: "",
    empleado_id: ""
  });
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [empleados, setEmpleados] = reactExports.useState([]);
  const [loadingEmpleados, setLoadingEmpleados] = reactExports.useState(false);
  const [useExistingEmployee, setUseExistingEmployee] = reactExports.useState(true);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [linkedEmpleado, setLinkedEmpleado] = reactExports.useState(null);
  const [relationDirection, setRelationDirection] = reactExports.useState(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        if (response.data.success) {
          const userData = response.data.user;
          if (userData.foto_perfil) {
            setPreviewUrl(`${"https://lead-inmobiliaria.com"}${userData.foto_perfil}`);
          }
          if (userData.empleado_id) {
            setUseExistingEmployee(true);
            setLinkedEmpleado(userData.empleado_id);
            setRelationDirection("userToEmpleado");
            console.log("Relación encontrada: usuario -> empleado");
          } else {
            try {
              const empleadoResponse = await axios.get(`/api/empleados-api/by-user/${userId}`);
              if (empleadoResponse.data.success && empleadoResponse.data.empleado) {
                setUseExistingEmployee(true);
                setLinkedEmpleado(empleadoResponse.data.empleado._id);
                setRelationDirection("empleadoToUser");
                console.log("Relación encontrada: empleado -> usuario", empleadoResponse.data.empleado);
              } else {
                setUseExistingEmployee(false);
                console.log("No se encontró relación en ninguna dirección");
              }
            } catch (error2) {
              console.error("Error al buscar empleado por userId:", error2);
              setUseExistingEmployee(false);
            }
          }
          setFormData({
            prim_nom: userData.prim_nom || "",
            segun_nom: userData.segun_nom || "",
            apell_pa: userData.apell_pa || "",
            apell_ma: userData.apell_ma || "",
            fecha_na: userData.fecha_na || "",
            pust: userData.pust || "",
            calle: userData.calle || "",
            num_in: userData.num_in || "",
            nun_ex: userData.nun_ex || "",
            codigo: userData.codigo || "",
            telefono: userData.telefono || "",
            email: userData.email || "",
            role: userData.role || "user",
            empleado_id: userData.empleado_id || ""
          });
        } else {
          setError("No se pudo cargar la información del usuario");
        }
      } catch (error2) {
        console.error("Error al cargar datos del usuario:", error2);
        setError("Error al cargar datos del usuario");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);
  reactExports.useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        setLoadingEmpleados(true);
        const response = await axios.get("/api/empleados-api");
        if (response.data && response.data.success) {
          const empleadosActivos = response.data.empleados.filter(
            (empleado) => empleado.estado === "Activo"
          );
          setEmpleados(empleadosActivos || []);
        } else {
          console.error("Error en la respuesta:", response.data);
          setEmpleados([]);
        }
      } catch (error2) {
        console.error("Error al cargar empleados:", error2);
        setEmpleados([]);
      } finally {
        setLoadingEmpleados(false);
      }
    };
    fetchEmpleados();
  }, []);
  reactExports.useEffect(() => {
    const fetchEmpleadoData = async () => {
      if (linkedEmpleado && relationDirection === "empleadoToUser") {
        try {
          const response = await axios.get(`/api/empleados-api/${linkedEmpleado}`);
          if (response.data.success) {
            const empleado = response.data.empleado;
            setFormData((prevState) => ({
              ...prevState,
              prim_nom: empleado.prim_nom || prevState.prim_nom,
              segun_nom: empleado.segun_nom || prevState.segun_nom,
              apell_pa: empleado.apell_pa || prevState.apell_pa,
              apell_ma: empleado.apell_ma || prevState.apell_ma,
              fecha_na: empleado.fecha_na || prevState.fecha_na,
              pust: empleado.pust || prevState.pust,
              calle: empleado.calle || prevState.calle,
              num_in: empleado.num_in || prevState.num_in,
              nun_ex: empleado.nun_ex || prevState.nun_ex,
              codigo: empleado.codigo || prevState.codigo,
              telefono: empleado.telefono || prevState.telefono
            }));
          }
        } catch (error2) {
          console.error("Error al cargar datos del empleado vinculado:", error2);
        }
      }
    };
    fetchEmpleadoData();
  }, [linkedEmpleado, relationDirection]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes("image/")) {
        setError("Por favor selecciona una imagen válida");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadProfilePhoto = async () => {
    if (!selectedFile)
      return null;
    try {
      const formData2 = new FormData();
      formData2.append("foto_perfil", selectedFile);
      const endpoint = `/api/users/${userId}/upload-photo`;
      console.log("Subiendo foto a:", endpoint);
      console.log("Archivo a subir:", selectedFile);
      const response = await axios.post(endpoint, formData2, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        timeout: 3e4
        // 30 segundos de timeout
      });
      console.log("Respuesta de subida de foto:", response.data);
      if (response.data.success) {
        return response.data.foto_perfil;
      } else {
        console.error("Error al subir foto:", response.data.message);
        setError(`Error al subir la foto: ${response.data.message}`);
        return null;
      }
    } catch (error2) {
      console.error("Error al subir la foto:", error2);
      if (error2.response) {
        console.error("Respuesta del servidor:", error2.response.data);
        console.error("Status:", error2.response.status);
        setError(`Error del servidor: ${error2.response.data.message || "Error desconocido"}`);
      } else if (error2.request) {
        console.error("No se recibió respuesta del servidor");
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        console.error("Error en la configuración:", error2.message);
        setError(`Error de configuración: ${error2.message}`);
      }
      return null;
    }
  };
  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };
  const handleEmployeeChange = (value) => {
    setFormData({
      ...formData,
      empleado_id: value
    });
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.put(`/api/users/${userId}`, formData);
      if (selectedFile) {
        console.log("Subiendo foto de perfil...");
        const photoPath = await uploadProfilePhoto();
        if (photoPath) {
          console.log("Foto subida correctamente:", photoPath);
        }
      }
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/users");
      }, 1500);
    } catch (error2) {
      console.error("Error al actualizar usuario:", error2);
      if (error2.response && error2.response.data) {
        setError(error2.response.data.message || "Error al actualizar usuario");
      } else {
        setError("Error al conectar con el servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const renderForm = () => {
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 mb-2 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "col-span-1 lg:col-span-2 font-medium", children: "Información Personal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            name: "prim_nom",
            size: "lg",
            className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
            value: formData.prim_nom,
            onChange: handleChange,
            required: true,
            label: "Primer Nombre *"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            name: "segun_nom",
            size: "lg",
            className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
            value: formData.segun_nom,
            onChange: handleChange,
            label: "Segundo Nombre"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            name: "apell_pa",
            size: "lg",
            className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
            value: formData.apell_pa,
            onChange: handleChange,
            required: true,
            label: "Apellido Paterno *"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            name: "apell_ma",
            size: "lg",
            className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
            value: formData.apell_ma,
            onChange: handleChange,
            required: true,
            label: "Apellido Materno *"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            name: "fecha_na",
            type: "date",
            size: "lg",
            className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
            value: formData.fecha_na,
            onChange: handleChange,
            required: true,
            label: "Fecha de Nacimiento *"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 lg:col-span-2 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3 font-medium", children: "Vinculación con Empleado" }),
          relationDirection === "empleadoToUser" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 border rounded-lg border-blue-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: "Este usuario está vinculado al empleado desde los registros de empleados. Para cambiar esta relación, debe editarse desde la sección de Empleados." }),
            linkedEmpleado && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium mt-2", children: [
              "ID de Empleado vinculado: ",
              linkedEmpleado
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Switch,
            {
              checked: useExistingEmployee,
              onChange: () => setUseExistingEmployee(!useExistingEmployee),
              label: "Vincular con empleado existente"
            }
          ) }),
          useExistingEmployee && relationDirection !== "empleadoToUser" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Select,
              {
                label: "Selecciona un empleado",
                value: formData.empleado_id,
                onChange: handleEmployeeChange,
                className: "bg-white",
                disabled: loadingEmpleados,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "", children: "-- Sin vincular --" }),
                  empleados.map((empleado) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Option, { value: empleado._id, children: [
                    empleado.prim_nom,
                    " ",
                    empleado.apell_pa,
                    " ",
                    empleado.apell_ma,
                    empleado.pust ? ` - ${empleado.pust}` : ""
                  ] }, empleado._id))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "Selecciona un empleado para vincularlo con este usuario" })
          ] })
        ] }),
        !useExistingEmployee && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "col-span-1 lg:col-span-2 mt-4 mb-3 font-medium", children: "Información de Contacto y Dirección" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "calle",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.calle,
              onChange: handleChange,
              required: true,
              label: "Calle *"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                name: "nun_ex",
                size: "lg",
                className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
                value: formData.nun_ex,
                onChange: handleChange,
                required: true,
                label: "Número Exterior *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                name: "num_in",
                size: "lg",
                className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
                value: formData.num_in,
                onChange: handleChange,
                label: "Número Interior"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "codigo",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.codigo,
              onChange: handleChange,
              required: true,
              label: "Código Postal *"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "telefono",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.telefono,
              onChange: handleChange,
              required: true,
              label: "Teléfono *"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Input,
              {
                name: "pust",
                size: "lg",
                className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
                value: formData.pust,
                onChange: handleChange,
                required: true,
                label: "Puesto *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "Cargo o posición del usuario" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "col-span-1 lg:col-span-2 mt-4 mb-3 font-medium", children: "Información de la Cuenta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              name: "email",
              type: "email",
              size: "lg",
              className: "bg-white !border-t-blue-gray-200 focus:!border-t-gray-900",
              value: formData.email,
              onChange: handleChange,
              required: true,
              label: "Correo electrónico *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "Dirección de correo electrónico para acceso al sistema" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Select,
            {
              label: "Rol de usuario *",
              value: formData.role,
              onChange: handleRoleChange,
              className: "bg-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "user", children: "Usuario regular" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "administrator", children: "Administrador (Acceso completo)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "administrador", children: "Administrador de sistema" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "supervisor", children: "Supervisor de obra" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "ayudante de administrador", children: "Ayudante de administrador" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "Nivel de acceso y permisos en el sistema" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "col-span-1 lg:col-span-2 mt-4 mb-3 font-medium", children: "Foto de Perfil (Opcional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 lg:col-span-2 mt-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "dropzone-file",
              className: "flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
              children: [
                previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: previewUrl,
                    alt: "Vista previa",
                    className: "max-h-44 max-w-full object-contain"
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CloudArrowUpIcon, { className: "w-8 h-8 mb-4 text-gray-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Haz clic para subir" }),
                    " o arrastra y suelta"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "SVG, PNG, JPG o GIF (Máx. 2MB)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "dropzone-file",
                    type: "file",
                    className: "hidden",
                    accept: "image/*",
                    onChange: handleFileChange
                  }
                )
              ]
            }
          ) }),
          selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 truncate", children: selectedFile.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                },
                className: "text-xs text-red-500 hover:text-red-700",
                children: "Eliminar"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "Imagen para tu perfil de usuario (opcional)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "flex items-center justify-center gap-1 font-normal mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" }),
          " Campos obligatorios"
        ] }),
        success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 p-4 rounded-lg mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "green", className: "text-center", children: "¡Usuario actualizado correctamente! Redirigiendo..." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              onClick: () => navigate("/dashboard/users"),
              className: "mt-2 flex-1",
              color: "red",
              variant: "outlined",
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              onClick: handleUpdateUser,
              className: "mt-2 flex-1",
              color: "blue",
              children: "Guardar Cambios"
            }
          )
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-10 max-w-4xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h3", color: "white", children: "Editar Usuario" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center lg:w-3/4 mx-auto", children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "mt-2 mb-4 p-2 bg-red-50 rounded", children: error }) }),
      renderForm()
    ] })
  ] }) });
}
function TestUpload() {
  const [file, setFile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
    setResult(null);
    if (selectedFile) {
      console.log("=== ARCHIVO SELECCIONADO ===");
      console.log("Nombre:", selectedFile.name);
      console.log("Tipo:", selectedFile.type);
      console.log("Tamaño:", (selectedFile.size / 1024 / 1024).toFixed(2), "MB");
      console.log("Última modificación:", new Date(selectedFile.lastModified).toISOString());
    }
  };
  const testUpload = async () => {
    if (!file) {
      setError("Por favor selecciona un archivo");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("foto_perfil", file);
      console.log("=== INICIANDO PRUEBA DE UPLOAD ===");
      console.log("URL base:", "https://lead-inmobiliaria.com");
      console.log("FormData creado:", formData);
      console.log("Archivo en FormData:", formData.get("foto_perfil"));
      const testUserId = "6214ff3f62021ac0e041db76";
      const response = await axios.post(
        `${"https://lead-inmobiliaria.com"}/api/users/${testUserId}/upload-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
          timeout: 3e4
        }
      );
      console.log("=== RESPUESTA EXITOSA ===");
      console.log("Status:", response.status);
      console.log("Data:", response.data);
      setResult(response.data);
    } catch (error2) {
      console.error("=== ERROR EN LA PRUEBA ===");
      console.error("Error completo:", error2);
      if (error2.response) {
        console.error("Respuesta del servidor:", error2.response.data);
        console.error("Status:", error2.response.status);
        console.error("Headers:", error2.response.headers);
        setError(`Error del servidor: ${error2.response.status} - ${error2.response.data.message || "Error desconocido"}`);
      } else if (error2.request) {
        console.error("No se recibió respuesta del servidor");
        console.error("Request:", error2.request);
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        console.error("Error en la configuración:", error2.message);
        setError(`Error de configuración: ${error2.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-10 max-w-screen-lg px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", className: "mb-4", children: "🧪 Prueba de Subida de Fotos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Selecciona una imagen para probar:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            onChange: handleFileChange,
            className: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          }
        )
      ] }),
      file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue", className: "font-semibold mb-2", children: "📁 Archivo seleccionado:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nombre:" }),
            " ",
            file.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tipo:" }),
            " ",
            file.type
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tamaño:" }),
            " ",
            (file.size / 1024 / 1024).toFixed(2),
            " MB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Última modificación:" }),
            " ",
            new Date(file.lastModified).toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          onClick: testUpload,
          disabled: !file || loading,
          className: "flex items-center gap-2",
          color: "blue",
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-4 w-4" }),
            "Probando upload..."
          ] }) : "🚀 Probar Upload"
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "font-semibold", children: "❌ Error:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "text-sm", children: error })
      ] }),
      result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "green", className: "font-semibold", children: "✅ Éxito:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-sm text-green-800 mt-2 bg-white p-2 rounded border", children: JSON.stringify(result, null, 2) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-semibold mb-2", children: "💡 Información de debugging:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "VITE_API_URL:" }),
            " ",
            "https://lead-inmobiliaria.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "User Agent:" }),
            " ",
            navigator.userAgent
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cookies disponibles:" }),
            " ",
            document.cookie ? "Sí" : "No"
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
function TestImageDisplay() {
  const [images, setImages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const testImages = [
    {
      name: "Foto más reciente del usuario 6214ff3f62021ac0e041db76",
      url: `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`,
      expectedPath: "/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png"
    },
    {
      name: "Foto del usuario 67c6fb2a18215ab2fbce7a65",
      url: `${"https://lead-inmobiliaria.com"}/uploads/users/profile_67c6fb2a18215ab2fbce7a65_1741268375107.png`,
      expectedPath: "/uploads/users/profile_67c6fb2a18215ab2fbce7a65_1741268375107.png"
    }
  ];
  const testImageLoad = async (imageUrl) => {
    try {
      setLoading(true);
      setError(null);
      console.log("🧪 Probando carga de imagen:", imageUrl);
      const img = new Image();
      return new Promise((resolve, reject) => {
        img.onload = () => {
          console.log("✅ Imagen cargada exitosamente:", imageUrl);
          resolve({ success: true, width: img.width, height: img.height });
        };
        img.onerror = () => {
          console.error("❌ Error al cargar imagen:", imageUrl);
          reject(new Error("No se pudo cargar la imagen"));
        };
        img.src = `${imageUrl}?t=${Date.now()}`;
        setTimeout(() => {
          reject(new Error("Timeout al cargar imagen"));
        }, 1e4);
      });
    } catch (error2) {
      console.error("Error en prueba de imagen:", error2);
      throw error2;
    } finally {
      setLoading(false);
    }
  };
  const runAllTests = async () => {
    setImages([]);
    setError(null);
    const results = [];
    for (const testImage of testImages) {
      try {
        console.log(`
🧪 Probando: ${testImage.name}`);
        const result = await testImageLoad(testImage.url);
        results.push({
          ...testImage,
          ...result,
          status: "success"
        });
      } catch (error2) {
        console.error(`❌ Falló: ${testImage.name}`, error2);
        results.push({
          ...testImage,
          error: error2.message,
          status: "error"
        });
      }
    }
    setImages(results);
  };
  const checkImageDirectly = (imagePath) => {
    const fullUrl = `${"https://lead-inmobiliaria.com"}${imagePath}`;
    console.log("🔗 Abriendo imagen directamente:", fullUrl);
    window.open(fullUrl, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-10 max-w-screen-lg px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", className: "mb-4", children: "🧪 Prueba de Visualización de Imágenes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue", className: "font-semibold mb-2", children: "💡 Información de configuración:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "VITE_API_URL:" }),
            " ",
            "https://lead-inmobiliaria.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Navegador:" }),
            " ",
            navigator.userAgent
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cookies:" }),
            " ",
            document.cookie ? "Disponibles" : "No disponibles"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          onClick: runAllTests,
          disabled: loading,
          className: "flex items-center gap-2",
          color: "blue",
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-4 w-4" }),
            "Probando imágenes..."
          ] }) : "🚀 Ejecutar Pruebas de Imágenes"
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "font-semibold", children: "❌ Error:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "text-sm", children: error })
      ] }),
      images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "📊 Resultados de las Pruebas:" }),
        images.map((image, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `border rounded-md p-4 ${image.status === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-semibold mb-2", children: image.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "URL:" }),
                    " ",
                    image.url
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Ruta esperada:" }),
                    " ",
                    image.expectedPath
                  ] }),
                  image.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Dimensiones:" }),
                      " ",
                      image.width,
                      " x ",
                      image.height
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-600", children: "✅ Imagen cargada correctamente" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-600", children: [
                    "❌ Error: ",
                    image.error
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    onClick: () => checkImageDirectly(image.expectedPath),
                    color: "blue",
                    children: "🔗 Abrir"
                  }
                ),
                image.status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 border rounded overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: `${image.url}?t=${Date.now()}`,
                    alt: "Preview",
                    className: "w-full h-full object-cover"
                  }
                ) })
              ] })
            ] })
          },
          index2
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-semibold mb-2", children: "🔍 Instrucciones de debugging:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1. Ejecuta las pruebas para ver el estado de cada imagen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '2. Usa el botón "Abrir" para ver la imagen directamente en el navegador' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "3. Revisa la consola para logs detallados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "4. Si las imágenes se abren directamente pero no en el componente, es un problema de CORS" })
        ] })
      ] })
    ] })
  ] }) }) });
}
function TestCORS$1() {
  const [loading, setLoading] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const testCORS = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      console.log("🧪 Probando CORS...");
      console.log("VITE_API_URL:", "https://lead-inmobiliaria.com");
      const corsResponse = await axios.get("/api/test-cors", {
        withCredentials: true
      });
      console.log("✅ CORS test exitoso:", corsResponse.data);
      const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log("🖼️ Probando carga de imagen:", imageUrl);
      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log("✅ Imagen cargada exitosamente");
          resolve({ success: true, width: img.width, height: img.height });
        };
        img.onerror = (e) => {
          console.error("❌ Error al cargar imagen:", e);
          reject(new Error("No se pudo cargar la imagen"));
        };
        img.src = imageUrl;
      });
      const fetchResponse = await fetch(imageUrl, {
        method: "GET",
        credentials: "include"
      });
      console.log("📡 Fetch response status:", fetchResponse.status);
      console.log("📡 Fetch response headers:", Object.fromEntries(fetchResponse.headers.entries()));
      setResults({
        cors: corsResponse.data,
        image: imageTest,
        fetch: {
          status: fetchResponse.status,
          headers: Object.fromEntries(fetchResponse.headers.entries())
        }
      });
    } catch (error2) {
      console.error("❌ Error en prueba de CORS:", error2);
      setError(error2.message);
    } finally {
      setLoading(false);
    }
  };
  const testImageInNewTab = () => {
    const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
    console.log("🔗 Abriendo imagen en nueva pestaña:", imageUrl);
    window.open(imageUrl, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-10 max-w-screen-lg px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", className: "mb-4", children: "🧪 Prueba de Configuración CORS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue", className: "font-semibold mb-2", children: "💡 Información de configuración:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "VITE_API_URL:" }),
            " ",
            "https://lead-inmobiliaria.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Navegador:" }),
            " ",
            navigator.userAgent
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cookies:" }),
            " ",
            document.cookie ? "Disponibles" : "No disponibles"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            onClick: testCORS,
            disabled: loading,
            className: "flex items-center gap-2",
            color: "blue",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-4 w-4" }),
              "Probando CORS..."
            ] }) : "🚀 Probar CORS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            onClick: testImageInNewTab,
            color: "green",
            variant: "outlined",
            children: "🔗 Abrir Imagen"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "font-semibold", children: "❌ Error:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "red", className: "text-sm", children: error })
      ] }),
      results && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "📊 Resultados de las Pruebas:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-green-200 bg-green-50 rounded-md p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-semibold mb-2 text-green-800", children: "✅ Prueba CORS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-green-700 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Origin:" }),
                " ",
                results.cors.origin
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Timestamp:" }),
                " ",
                results.cors.timestamp
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Message:" }),
                " ",
                results.cors.message
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border rounded-md p-4 ${results.image.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", className: "font-semibold mb-2", children: [
              results.image.success ? "✅" : "❌",
              " Prueba Imagen"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs space-y-1", children: results.image.success ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Dimensiones:" }),
                " ",
                results.image.width,
                " x ",
                results.image.height
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-600", children: "Imagen cargada correctamente" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600", children: "Error al cargar imagen" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-blue-200 bg-blue-50 rounded-md p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-semibold mb-2 text-blue-800", children: "📡 Prueba Fetch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-blue-700 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Status:" }),
                " ",
                results.fetch.status
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Content-Type:" }),
                " ",
                results.fetch.headers["content-type"]
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "CORS:" }),
                " ",
                results.fetch.headers["access-control-allow-origin"]
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-md p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-semibold mb-2", children: "📋 Detalles Completos:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs text-gray-700 bg-white p-2 rounded border overflow-x-auto", children: JSON.stringify(results, null, 2) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-semibold mb-2", children: "🔍 Instrucciones de debugging:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '1. Ejecuta "Probar CORS" para verificar la configuración' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '2. Usa "Abrir Imagen" para ver si se puede acceder directamente' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "3. Revisa la consola para logs detallados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "4. Si CORS funciona pero la imagen no se muestra, es un problema de headers" })
        ] })
      ] })
    ] })
  ] }) }) });
}
function CrearCaptacion() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState(0);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const [user, setUser] = reactExports.useState(null);
  const tabs = [
    { label: "Propietario", value: 0 },
    { label: "Propiedad", value: 1 },
    { label: "Adeudos", value: 2 },
    { label: "Datos Laborales", value: 3 },
    { label: "Referencias", value: 4 },
    { label: "Documentos", value: 5 },
    { label: "Venta", value: 6 }
  ];
  const defaultValues = {
    propietario: {
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      identificacion: "",
      nss: "",
      rfc: "",
      curp: "",
      estado_civil: "",
      conyuge: {
        nombre: "",
        telefono: "",
        nss: "",
        rfc: "",
        curp: ""
      }
    },
    propiedad: {
      tipo: "",
      direccion: {
        calle: "",
        numero: "",
        colonia: "",
        ciudad: "",
        estado: "",
        codigo_postal: "",
        manzana: "",
        lote: ""
      },
      caracteristicas: {
        m2_terreno: "",
        m2_construccion: "",
        habitaciones: "",
        baños: "",
        cocheras: "",
        descripcion: ""
      },
      imagenes: [],
      adeudos: []
      // Array para almacenar los adeudos
    },
    datos_laborales: {
      empresa: "",
      direccion: "",
      telefono: "",
      area: "",
      puesto: "",
      turno: "",
      registro_patronal: "",
      antiguedad: "",
      ingresos_mensuales: ""
    },
    referencias_personales: [],
    // Array vacío para referencias personales
    documentos: {
      ine: null,
      curp: null,
      rfc: null,
      escrituras: null,
      predial: null,
      comprobante_domicilio: null,
      otros: []
    },
    venta: {
      precio_venta: "",
      comision_venta: "",
      fecha_venta: "",
      estatus_venta: "En proceso",
      en_venta: false,
      comprador: {
        nombre: "",
        telefono: "",
        correo: "",
        direccion: ""
      },
      tipo_credito: "",
      observaciones: "",
      documentos_entregados: {
        contrato: false,
        identificacion: false,
        constancia_credito: false
      }
    },
    captacion: {
      tipo_captacion: "Abierta",
      observaciones: ""
    },
    documentacion: {
      ine: false,
      curp: false,
      rfc: false,
      escrituras: false,
      predial_pagado: false,
      libre_gravamen: false,
      comprobante_domicilio: false
    },
    tipo_tramite: ""
    // Campo adicional para el tipo de trámite
  };
  const schema = create$3().shape({
    propietario: create$3().shape({
      nombre: create$6().required("El nombre del propietario es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
      telefono: create$6().required("El teléfono es requerido").matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos numéricos"),
      correo: create$6().email("El formato del correo electrónico no es válido").optional(),
      direccion: create$6().optional(),
      identificacion: create$6().optional(),
      nss: create$6().optional().matches(/^\d{11}$/, "El NSS debe contener 11 dígitos numéricos"),
      rfc: create$6().optional().matches(
        /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/,
        "El formato de RFC no es válido (ej. ABCD123456XXX)"
      ),
      curp: create$6().optional().matches(
        /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/,
        "El formato de CURP no es válido"
      ),
      estado_civil: create$6().required("El estado civil es requerido")
    }),
    propiedad: create$3().shape({
      tipo: create$6().required("El tipo de propiedad es requerido"),
      direccion: create$3().shape({
        calle: create$6().required("La calle es requerida"),
        numero: create$6().required("El número es requerido"),
        colonia: create$6().required("La colonia es requerida"),
        ciudad: create$6().required("La ciudad es requerida"),
        estado: create$6().required("El estado es requerido"),
        codigo_postal: create$6().required("El código postal es requerido"),
        manzana: create$6().transform((v) => v === "" ? "N/A" : v).optional(),
        lote: create$6().transform((v) => v === "" ? "N/A" : v).optional()
      }),
      caracteristicas: create$3().shape({
        m2_terreno: create$5().transform((value) => isNaN(value) ? void 0 : value).required("Los metros cuadrados de terreno son requeridos").positive("Debe ser un número mayor a 0"),
        m2_construccion: create$5().transform((value) => isNaN(value) ? void 0 : value).required("Los metros cuadrados de construcción son requeridos").positive("Debe ser un número mayor a 0"),
        habitaciones: create$5().transform((value) => isNaN(value) ? void 0 : value).required("El número de recámaras es requerido").min(0, "No puede ser un número negativo"),
        baños: create$5().transform((value) => isNaN(value) ? void 0 : value).required("El número de baños es requerido").min(0, "No puede ser un número negativo"),
        cocheras: create$5().transform((value) => isNaN(value) ? void 0 : value).optional().min(0, "No puede ser un número negativo")
      })
    }),
    referencias_personales: create$2().of(
      create$3().shape({
        nombre: create$6().required("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
        telefono: create$6().required("El teléfono es requerido").matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos numéricos"),
        relacion: create$6().required("El parentesco es requerido"),
        direccion: create$6().optional()
      })
    ).min(1, "Se requiere al menos 1 referencia personal").required("Las referencias personales son requeridas"),
    // Añadir validación para documentos
    documentacion: create$3().shape({
      ine: create$7().oneOf([true], "La identificación oficial (INE) es obligatoria").required("La identificación oficial (INE) es obligatoria"),
      escrituras: create$7().oneOf([true], "Las escrituras son obligatorias").required("Las escrituras son obligatorias"),
      curp: create$7().optional(),
      rfc: create$7().optional(),
      comprobante_domicilio: create$7().optional()
    }),
    // Validación condicional para detalle de adeudo 'Otro'
    propiedad: create$3().shape({
      adeudos: create$2().of(create$3().shape({
        tipo: create$6().required(),
        detalle: create$6().when("tipo", {
          is: "Otro",
          then: (schema2) => schema2.required('Debe especificar el detalle del adeudo cuando es "Otro"')
        })
      }))
    }),
    venta: create$3().shape({
      precio_venta: create$5().transform((value) => isNaN(value) || value === null || value === "" ? void 0 : value).nullable().optional(),
      tipo_credito: create$6().nullable().optional(),
      en_venta: create$7().default(false),
      comprador: create$3().shape({
        nombre: create$6().nullable().optional(),
        telefono: create$6().nullable().optional(),
        correo: create$6().nullable().optional()
      }),
      documentos_entregados: create$3().shape({
        contrato: create$7().default(false),
        identificacion: create$7().default(false),
        constancia_credito: create$7().default(false)
      }),
      observaciones: create$6().optional()
    }),
    captacion: create$3().shape({
      tipo_captacion: create$6().required("El tipo de captación es requerido"),
      observaciones: create$6().optional()
    }),
    datos_laborales: create$3().shape({
      empresa: create$6().optional(),
      direccion: create$6().optional(),
      telefono: create$6().optional(),
      area: create$6().optional(),
      puesto: create$6().optional(),
      turno: create$6().optional(),
      registro_patronal: create$6().optional(),
      antiguedad: create$5().transform((value) => isNaN(value) || value === null || value === "" ? void 0 : value).nullable().optional(),
      ingresos_mensuales: create$5().transform((value) => isNaN(value) || value === null || value === "" ? void 0 : value).nullable().optional()
    })
  });
  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
    getValues
  } = useForm({
    resolver: o(schema),
    defaultValues,
    mode: "onChange"
  });
  const [formData, setFormData] = reactExports.useState(defaultValues);
  const [formCompleto, setFormCompleto] = reactExports.useState(false);
  const getErrorSummary = () => {
    let summary = [];
    if (errors.propietario) {
      const propErrors = Object.keys(errors.propietario);
      summary.push(`Propietario: ${propErrors.join(", ")}`);
    }
    if (errors.propiedad) {
      let propErrors = [];
      if (errors.propiedad.tipo)
        propErrors.push("tipo");
      if (errors.propiedad.direccion)
        propErrors.push("dirección");
      if (errors.propiedad.caracteristicas)
        propErrors.push("características");
      if (errors.propiedad.adeudos)
        propErrors.push("adeudos");
      summary.push(`Propiedad: ${propErrors.join(", ")}`);
    }
    if (errors.referencias_personales) {
      if (typeof errors.referencias_personales === "object" && !Array.isArray(errors.referencias_personales)) {
        summary.push(`Referencias: ${errors.referencias_personales.message}`);
      } else {
        summary.push("Referencias personales: datos incompletos");
      }
    }
    if (errors.documentacion) {
      const docErrors = Object.keys(errors.documentacion);
      summary.push(`Documentación: ${docErrors.join(", ")}`);
    }
    if (errors.venta && watch("venta.en_venta")) {
      let ventaErrors = [];
      if (errors.venta.precio_venta)
        ventaErrors.push("precio");
      if (errors.venta.tipo_credito)
        ventaErrors.push("tipo de crédito");
      if (errors.venta.comprador)
        ventaErrors.push("datos del comprador");
      summary.push(`Venta: ${ventaErrors.join(", ")}`);
    }
    return summary.length > 0 ? summary : null;
  };
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      var _a2;
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          const userRole = ((_a2 = data.user) == null ? void 0 : _a2.role) || "";
          const isAuthorized = ["user", "administrator", "admin"].includes(userRole);
          if (!isAuthorized) {
            navigate("/dashboard/home");
          }
        } else {
          navigate("/auth/sign-in");
        }
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        navigate("/auth/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  reactExports.useEffect(() => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2;
    const errorSummary = getErrorSummary();
    if (errorSummary && !error) {
      setError(`Corrija los siguientes errores antes de guardar: ${errorSummary.join("; ")}`);
      const timer = setTimeout(() => {
        setError(null);
      }, 5e3);
      return () => clearTimeout(timer);
    }
    try {
      const valores = getValues();
      console.log("Estado actual del formulario:", {
        propietario: valores.propietario,
        propiedadDireccion: (_a2 = valores.propiedad) == null ? void 0 : _a2.direccion,
        propiedadCaracteristicas: (_b2 = valores.propiedad) == null ? void 0 : _b2.caracteristicas,
        referencias: valores.referencias_personales,
        documentacion: valores.documentacion
      });
      const propietarioCompleto = !!((_c2 = valores.propietario) == null ? void 0 : _c2.nombre) && !!((_d2 = valores.propietario) == null ? void 0 : _d2.telefono) && !!((_e2 = valores.propietario) == null ? void 0 : _e2.estado_civil);
      const propiedadCompleta = !!((_f2 = valores.propiedad) == null ? void 0 : _f2.tipo) && !!((_h2 = (_g2 = valores.propiedad) == null ? void 0 : _g2.direccion) == null ? void 0 : _h2.calle) && !!((_j2 = (_i2 = valores.propiedad) == null ? void 0 : _i2.direccion) == null ? void 0 : _j2.numero) && !!((_l2 = (_k2 = valores.propiedad) == null ? void 0 : _k2.direccion) == null ? void 0 : _l2.colonia) && !!((_n2 = (_m2 = valores.propiedad) == null ? void 0 : _m2.direccion) == null ? void 0 : _n2.ciudad) && !!((_p2 = (_o2 = valores.propiedad) == null ? void 0 : _o2.direccion) == null ? void 0 : _p2.estado) && !!((_r2 = (_q2 = valores.propiedad) == null ? void 0 : _q2.direccion) == null ? void 0 : _r2.codigo_postal);
      const caracteristicasCompletas = Number((_t2 = (_s2 = valores.propiedad) == null ? void 0 : _s2.caracteristicas) == null ? void 0 : _t2.m2_terreno) > 0 && Number((_v2 = (_u2 = valores.propiedad) == null ? void 0 : _u2.caracteristicas) == null ? void 0 : _v2.m2_construccion) > 0 && ((_x2 = (_w2 = valores.propiedad) == null ? void 0 : _w2.caracteristicas) == null ? void 0 : _x2.habitaciones) !== void 0 && ((_z2 = (_y2 = valores.propiedad) == null ? void 0 : _y2.caracteristicas) == null ? void 0 : _z2.baños) !== void 0;
      const referenciasCompletas = Array.isArray(valores.referencias_personales) && valores.referencias_personales.length >= 1 && valores.referencias_personales.every(
        (ref) => !!ref.nombre && !!ref.telefono && !!ref.relacion
      );
      const documentacionCompleta = ((_A2 = valores.documentacion) == null ? void 0 : _A2.ine) === true && ((_B2 = valores.documentacion) == null ? void 0 : _B2.escrituras) === true;
      const ventaCompleta = true;
      const formularioCompleto = propietarioCompleto && propiedadCompleta && caracteristicasCompletas && referenciasCompletas && documentacionCompleta;
      setFormCompleto(formularioCompleto);
      console.log({
        propietarioCompleto,
        propiedadCompleta,
        caracteristicasCompletas,
        referenciasCompletas,
        documentacionCompleta,
        ventaCompleta,
        formularioCompleto
      });
    } catch (e) {
      console.error("Error al verificar completitud del formulario:", e);
      setFormCompleto(false);
    }
  }, [getValues, error, watch]);
  const handleChange = (e, section, subsection, field) => {
    const { name, value, type, checked } = e.target;
    const actualValue = type === "checkbox" ? checked : value;
    if (section && subsection && field) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [field]: actualValue
          }
        }
      }));
      setValue(`${section}.${subsection}.${field}`, actualValue);
    } else if (section && subsection) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: actualValue
        }
      }));
      setValue(`${section}.${subsection}`, actualValue);
    } else if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: actualValue
      }));
      setValue(section, actualValue);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: actualValue
      }));
      setValue(name, actualValue);
    }
  };
  const handleEstadoCivilChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      propietario: {
        ...prev.propietario,
        estado_civil: value
      }
    }));
    setValue("propietario.estado_civil", value);
  };
  const handleAddAdeudo = () => {
    const nuevoAdeudo = {
      tipo: "",
      monto: "",
      numero_referencia: "",
      descripcion: ""
    };
    appendAdeudo(nuevoAdeudo);
    setFormData((prev) => ({
      ...prev,
      propiedad: {
        ...prev.propiedad,
        adeudos: [...prev.propiedad.adeudos, nuevoAdeudo]
      }
    }));
  };
  const handleAddReferencia = () => {
    const nuevaReferencia = {
      nombre: "",
      relacion: "",
      // Usar directamente 'relacion' como requiere el backend
      telefono: "",
      direccion: ""
    };
    appendReferencia(nuevaReferencia);
  };
  const handleUpdateReferencia = (index2, field, value) => {
    setValue(`referencias_personales.${index2}.${field}`, value);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData2 = getValues();
      if (formData2.documentacion) {
        formData2.documentos_entregados = { ...formData2.documentacion };
        delete formData2.documentacion;
      }
      if (formData2.referencias_personales && formData2.referencias_personales.length > 0) {
        formData2.referencias_personales = formData2.referencias_personales.map((referencia) => {
          const referenciaActualizada = { ...referencia };
          if (referenciaActualizada.parentesco) {
            delete referenciaActualizada.parentesco;
          }
          return referenciaActualizada;
        });
      }
      console.log("Datos a enviar:", formData2);
      const responseData = await captacionesAPI.create(formData2);
      console.log("Respuesta del servidor:", responseData);
      setSuccessMessage("Captación guardada exitosamente");
      setTimeout(() => {
        navigate("/dashboard/captaciones");
      }, 2e3);
    } catch (apiError) {
      console.error("Error al enviar formulario:", apiError);
      if (apiError.errores && apiError.errores.length > 0) {
        const mensajesError = apiError.errores.map((err) => `${err.param}: ${err.msg}`).join("\n");
        setError(mensajesError);
      } else {
        setError(apiError.message || "Error al guardar la captación");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const {
    fields: adeudosFields,
    append: appendAdeudo,
    remove: removeAdeudo
  } = useFieldArray({
    control,
    name: "propiedad.adeudos"
  });
  const {
    fields: referenciasFields,
    append: appendReferencia,
    remove: removeReferencia
  } = useFieldArray({
    control,
    name: "referencias_personales"
  });
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", children: "Cargando..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue", className: "mb-4 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Nueva Captación Inmobiliaria" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-4 md:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "mb-2", children: "Registro de Captación Inmobiliaria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-6", children: "Complete toda la información requerida para registrar una nueva propiedad. Los campos marcados con * son obligatorios." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { value: activeTab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabsHeader, { className: "mb-6 flex flex-wrap md:flex-nowrap h-auto md:h-12 py-2 gap-1 bg-blue-gray-50 overflow-x-auto md:overflow-x-auto hide-scrollbar", children: tabs.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Tab,
          {
            value,
            onClick: () => setActiveTab(value),
            className: `py-2 px-3 whitespace-nowrap rounded-md transition-all ${activeTab === value ? "bg-white shadow-sm font-medium" : ""}`,
            children: label
          },
          value
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsBody, { animate: {
          initial: { opacity: 0 },
          mount: { opacity: 1 },
          unmount: { opacity: 0 }
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 0, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información del Propietario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.nombre",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Nombre del Propietario *",
                            error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.nombre),
                            value: field.value || "",
                            onChange: (e) => {
                              field.onChange(e.target.value);
                              handleChange(e, "propietario", "nombre");
                            }
                          }
                        );
                      }
                    }
                  ),
                  ((_a = errors.propietario) == null ? void 0 : _a.nombre) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.nombre.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.telefono",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "tel",
                            label: "Teléfono *",
                            error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.telefono),
                            value: field.value || "",
                            onChange: (e) => {
                              field.onChange(e.target.value);
                              handleChange(e, "propietario", "telefono");
                            }
                          }
                        );
                      }
                    }
                  ),
                  ((_b = errors.propietario) == null ? void 0 : _b.telefono) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.telefono.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.correo",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "email",
                            label: "Correo Electrónico",
                            error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.correo),
                            value: field.value || "",
                            onChange: (e) => {
                              field.onChange(e.target.value);
                              handleChange(e, "propietario", "correo");
                            }
                          }
                        );
                      }
                    }
                  ),
                  ((_c = errors.propietario) == null ? void 0 : _c.correo) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.correo.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propietario.direccion",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Dirección Particular",
                        value: field.value || "",
                        onChange: (e) => {
                          field.onChange(e.target.value);
                          handleChange(e, "propietario", "direccion");
                        }
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propietario.identificacion",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Identificación",
                        value: field.value || "",
                        onChange: (e) => {
                          field.onChange(e.target.value);
                          handleChange(e, "propietario", "identificacion");
                        }
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.estado_civil",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          react.Select,
                          {
                            label: "Estado Civil *",
                            value: field.value || "",
                            onChange: (value) => {
                              field.onChange(value);
                              handleEstadoCivilChange(value);
                            },
                            error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.estado_civil),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Soltero", children: "Soltero(a)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Casado", children: "Casado(a)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Divorciado", children: "Divorciado(a)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Viudo", children: "Viudo(a)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Unión Libre", children: "Unión Libre" })
                            ]
                          }
                        );
                      }
                    }
                  ),
                  ((_d = errors.propietario) == null ? void 0 : _d.estado_civil) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.estado_civil.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.nss",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "NSS",
                            error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.nss),
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_e = errors.propietario) == null ? void 0 : _e.nss) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.nss.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.rfc",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "RFC",
                            error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.rfc),
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_f = errors.propietario) == null ? void 0 : _f.rfc) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.rfc.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.curp",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "CURP",
                            error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.curp),
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_g = errors.propietario) == null ? void 0 : _g.curp) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.curp.message })
                ] })
              ] }),
              watch("propietario.estado_civil") === "Casado" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-green-50 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "mb-3", children: "Datos de Esposa(o)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.conyuge.nombre",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "Nombre de Esposa(o)", value: field.value || "", onChange: (e) => field.onChange(e.target.value) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.conyuge.telefono",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "tel", label: "Teléfono de Esposa(o)", value: field.value || "", onChange: (e) => field.onChange(e.target.value) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.conyuge.nss",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "NSS de Esposa(o)", value: field.value || "", onChange: (e) => field.onChange(e.target.value) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.conyuge.rfc",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "RFC de Esposa(o)", value: field.value || "", onChange: (e) => field.onChange(e.target.value) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.conyuge.curp",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "CURP de Esposa(o)", value: field.value || "", onChange: (e) => field.onChange(e.target.value) })
                    }
                  )
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 1, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información de la Propiedad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propiedad.tipo",
                    control,
                    render: ({ field }) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        react.Select,
                        {
                          label: "Tipo de Propiedad *",
                          value: field.value,
                          onChange: (value) => field.onChange(value),
                          error: !!((_a2 = errors.propiedad) == null ? void 0 : _a2.tipo),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Casa", children: "Casa" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Departamento", children: "Departamento" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Condominio", children: "Condominio" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Terreno", children: "Terreno" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Local", children: "Local" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Bodega", children: "Bodega" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Edificio", children: "Edificio" })
                          ]
                        }
                      );
                    }
                  }
                ),
                ((_h = errors.propiedad) == null ? void 0 : _h.tipo) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.tipo.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Dirección de la Propiedad" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.direccion.calle",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "text",
                              label: "Calle *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.calle),
                              ...field
                            }
                          );
                        }
                      }
                    ),
                    ((_j = (_i = errors.propiedad) == null ? void 0 : _i.direccion) == null ? void 0 : _j.calle) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.calle.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.direccion.numero",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "text",
                              label: "Número *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.numero),
                              ...field
                            }
                          );
                        }
                      }
                    ),
                    ((_l = (_k = errors.propiedad) == null ? void 0 : _k.direccion) == null ? void 0 : _l.numero) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.numero.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.direccion.colonia",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "text",
                              label: "Colonia *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.colonia),
                              ...field
                            }
                          );
                        }
                      }
                    ),
                    ((_n = (_m = errors.propiedad) == null ? void 0 : _m.direccion) == null ? void 0 : _n.colonia) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.colonia.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.direccion.ciudad",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "text",
                              label: "Ciudad *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.ciudad),
                              ...field
                            }
                          );
                        }
                      }
                    ),
                    ((_p = (_o = errors.propiedad) == null ? void 0 : _o.direccion) == null ? void 0 : _p.ciudad) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.ciudad.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.direccion.estado",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            react.Select,
                            {
                              label: "Estado *",
                              className: "bg-white",
                              value: field.value,
                              onChange: (value) => field.onChange(value),
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.estado),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Aguascalientes", children: "Aguascalientes" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Baja California", children: "Baja California" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Baja California Sur", children: "Baja California Sur" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Campeche", children: "Campeche" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Chiapas", children: "Chiapas" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Chihuahua", children: "Chihuahua" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Ciudad de México", children: "Ciudad de México" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Coahuila", children: "Coahuila" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Colima", children: "Colima" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Durango", children: "Durango" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Estado de México", children: "Estado de México" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Guanajuato", children: "Guanajuato" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Guerrero", children: "Guerrero" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Hidalgo", children: "Hidalgo" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Jalisco", children: "Jalisco" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Michoacán", children: "Michoacán" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Morelos", children: "Morelos" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Nayarit", children: "Nayarit" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Nuevo León", children: "Nuevo León" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Oaxaca", children: "Oaxaca" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Puebla", children: "Puebla" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Querétaro", children: "Querétaro" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Quintana Roo", children: "Quintana Roo" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "San Luis Potosí", children: "San Luis Potosí" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Sinaloa", children: "Sinaloa" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Sonora", children: "Sonora" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Tabasco", children: "Tabasco" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Tamaulipas", children: "Tamaulipas" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Tlaxcala", children: "Tlaxcala" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Veracruz", children: "Veracruz" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Yucatán", children: "Yucatán" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Zacatecas", children: "Zacatecas" })
                              ]
                            }
                          );
                        }
                      }
                    ),
                    ((_r = (_q = errors.propiedad) == null ? void 0 : _q.direccion) == null ? void 0 : _r.estado) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.estado.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.direccion.codigo_postal",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "text",
                              label: "Código Postal *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.codigo_postal),
                              ...field
                            }
                          );
                        }
                      }
                    ),
                    ((_t = (_s = errors.propiedad) == null ? void 0 : _s.direccion) == null ? void 0 : _t.codigo_postal) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.codigo_postal.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.manzana",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Manzana (opcional)",
                          placeholder: "N/A",
                          className: "bg-white",
                          value: field.value || "",
                          onChange: (e) => field.onChange(e.target.value)
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.lote",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Lote (opcional)",
                          placeholder: "N/A",
                          className: "bg-white",
                          value: field.value || "",
                          onChange: (e) => field.onChange(e.target.value)
                        }
                      )
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Características Físicas" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.caracteristicas.m2_terreno",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "number",
                              label: "Terreno (m²) *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.m2_terreno),
                              ...field,
                              onChange: (e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                              }
                            }
                          );
                        }
                      }
                    ),
                    ((_v = (_u = errors.propiedad) == null ? void 0 : _u.caracteristicas) == null ? void 0 : _v.m2_terreno) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.m2_terreno.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.caracteristicas.m2_construccion",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "number",
                              label: "Construcción (m²) *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.m2_construccion),
                              ...field,
                              onChange: (e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                              }
                            }
                          );
                        }
                      }
                    ),
                    ((_x = (_w = errors.propiedad) == null ? void 0 : _w.caracteristicas) == null ? void 0 : _x.m2_construccion) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.m2_construccion.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.caracteristicas.habitaciones",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "number",
                              label: "Recámaras *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.habitaciones),
                              ...field,
                              onChange: (e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                              }
                            }
                          );
                        }
                      }
                    ),
                    ((_z = (_y = errors.propiedad) == null ? void 0 : _y.caracteristicas) == null ? void 0 : _z.habitaciones) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.habitaciones.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.caracteristicas.baños",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "number",
                              label: "Baños *",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.baños),
                              ...field,
                              onChange: (e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                              }
                            }
                          );
                        }
                      }
                    ),
                    ((_B = (_A = errors.propiedad) == null ? void 0 : _A.caracteristicas) == null ? void 0 : _B.baños) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.baños.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propiedad.caracteristicas.cocheras",
                        control,
                        render: ({ field }) => {
                          var _a2, _b2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "number",
                              label: "Cocheras",
                              className: "bg-white",
                              error: !!((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.cocheras),
                              ...field,
                              onChange: (e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                              }
                            }
                          );
                        }
                      }
                    ),
                    ((_D = (_C = errors.propiedad) == null ? void 0 : _C.caracteristicas) == null ? void 0 : _D.cocheras) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.cocheras.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.caracteristicas.año_construccion",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "number",
                          label: "Año de Construcción",
                          className: "bg-white",
                          ...field,
                          onChange: (e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? "" : Number(value));
                          }
                        }
                      )
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propiedad.caracteristicas.descripcion",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Textarea,
                      {
                        label: "Descripción adicional de la propiedad",
                        className: "bg-white",
                        ...field
                      }
                    )
                  }
                ) })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 2, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Adeudos de la Propiedad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Registre los adeudos que tiene la propiedad (predial, agua, hipotecas, etc.)" }),
              adeudosFields.map((field, index2) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 border rounded bg-white", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: `propiedad.adeudos.${index2}.tipo`,
                          control,
                          render: ({ field: field2 }) => {
                            var _a3, _b3, _c3;
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              react.Select,
                              {
                                label: "Tipo de Adeudo *",
                                value: field2.value,
                                onChange: (value) => field2.onChange(value),
                                error: !!((_c3 = (_b3 = (_a3 = errors.propiedad) == null ? void 0 : _a3.adeudos) == null ? void 0 : _b3[index2]) == null ? void 0 : _c3.tipo),
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Predial", children: "Predial" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Agua", children: "Agua" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Hipoteca", children: "Hipoteca" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "CFE", children: "CFE" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Mantenimiento", children: "Mantenimiento" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Otro", children: "Otro" })
                                ]
                              }
                            );
                          }
                        }
                      ),
                      ((_c2 = (_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.adeudos) == null ? void 0 : _b2[index2]) == null ? void 0 : _c2.tipo) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.adeudos[index2].tipo.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: `propiedad.adeudos.${index2}.monto`,
                          control,
                          render: ({ field: field2 }) => {
                            var _a3, _b3, _c3;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "number",
                                label: "Monto *",
                                min: "0",
                                className: ((_c3 = (_b3 = (_a3 = errors.propiedad) == null ? void 0 : _a3.adeudos) == null ? void 0 : _b3[index2]) == null ? void 0 : _c3.monto) ? "border-red-500" : "",
                                ...field2,
                                onChange: (e) => field2.onChange(e.target.value === "" ? "" : Number(e.target.value))
                              }
                            );
                          }
                        }
                      ),
                      ((_f2 = (_e2 = (_d2 = errors.propiedad) == null ? void 0 : _d2.adeudos) == null ? void 0 : _e2[index2]) == null ? void 0 : _f2.monto) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.adeudos[index2].monto.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: `propiedad.adeudos.${index2}.numero_referencia`,
                          control,
                          render: ({ field: field2 }) => {
                            var _a3, _b3, _c3;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "text",
                                label: "Número de Referencia o número de crédito *",
                                className: ((_c3 = (_b3 = (_a3 = errors.propiedad) == null ? void 0 : _a3.adeudos) == null ? void 0 : _b3[index2]) == null ? void 0 : _c3.numero_referencia) ? "border-red-500" : "",
                                ...field2
                              }
                            );
                          }
                        }
                      ),
                      ((_i2 = (_h2 = (_g2 = errors.propiedad) == null ? void 0 : _g2.adeudos) == null ? void 0 : _h2[index2]) == null ? void 0 : _i2.numero_referencia) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.adeudos[index2].numero_referencia.message })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Button,
                    {
                      color: "red",
                      variant: "text",
                      size: "sm",
                      onClick: () => removeAdeudo(index2),
                      children: "Eliminar"
                    }
                  ) }),
                  watch(`propiedad.adeudos.${index2}.tipo`) === "Otro" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: `propiedad.adeudos.${index2}.detalle`,
                      control,
                      render: ({ field: field2 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Detalle del adeudo (obligatorio si seleccionó 'Otro')",
                          value: field2.value || "",
                          onChange: (e) => field2.onChange(e.target.value)
                        }
                      )
                    }
                  ) })
                ] }, field.id);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  className: "mt-2",
                  color: "blue",
                  variant: "text",
                  size: "sm",
                  onClick: handleAddAdeudo,
                  children: "+ Agregar Adeudo"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 3, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Datos Laborales del Propietario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Información sobre la situación laboral del propietario" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "text",
                    label: "Empresa",
                    value: formData.datos_laborales.empresa,
                    onChange: (e) => handleChange(e, "datos_laborales", "empresa"),
                    className: "bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "text",
                    label: "Puesto",
                    value: formData.datos_laborales.puesto,
                    onChange: (e) => handleChange(e, "datos_laborales", "puesto"),
                    className: "bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "text",
                    label: "Área o Departamento",
                    value: formData.datos_laborales.area,
                    onChange: (e) => handleChange(e, "datos_laborales", "area"),
                    className: "bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "text",
                    label: "Turno",
                    value: formData.datos_laborales.turno,
                    onChange: (e) => handleChange(e, "datos_laborales", "turno"),
                    className: "bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "text",
                    label: "Registro Patronal",
                    value: formData.datos_laborales.registro_patronal,
                    onChange: (e) => handleChange(e, "datos_laborales", "registro_patronal"),
                    className: "bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "tel",
                    label: "Teléfono del Trabajo",
                    value: formData.datos_laborales.telefono,
                    onChange: (e) => handleChange(e, "datos_laborales", "telefono"),
                    className: "bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "number",
                    label: "Antigüedad (años)",
                    value: formData.datos_laborales.antiguedad,
                    onChange: (e) => handleChange(e, "datos_laborales", "antiguedad"),
                    className: "bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "number",
                    label: "Ingresos Mensuales",
                    value: formData.datos_laborales.ingresos_mensuales,
                    onChange: (e) => handleChange(e, "datos_laborales", "ingresos_mensuales"),
                    className: "bg-white"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium mb-2 text-blue-gray-500", children: "Dirección del Trabajo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Textarea,
                  {
                    label: "Dirección completa del trabajo",
                    value: formData.datos_laborales.direccion,
                    onChange: (e) => handleChange(e, "datos_laborales", "direccion"),
                    className: "bg-white"
                  }
                )
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 4, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Referencias Personales" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Proporcione al menos dos referencias personales que puedan validar la información del propietario" }),
              referenciasFields.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4 bg-white rounded-lg border border-blue-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "italic", children: "No hay referencias registradas. Se requiere al menos 1 referencia." }) }) : referenciasFields.map((field, index2) => {
                var _a2, _b2, _c2, _d2, _e2, _f2;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 bg-white rounded-lg border border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", children: [
                      "Referencia #",
                      index2 + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Button,
                      {
                        color: "red",
                        variant: "text",
                        size: "sm",
                        onClick: () => removeReferencia(index2),
                        children: "Eliminar"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: `referencias_personales.${index2}.nombre`,
                          control,
                          render: ({ field: field2 }) => {
                            var _a3, _b3;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "text",
                                label: "Nombre Completo *",
                                error: !!((_b3 = (_a3 = errors.referencias_personales) == null ? void 0 : _a3[index2]) == null ? void 0 : _b3.nombre),
                                ...field2
                              }
                            );
                          }
                        }
                      ),
                      ((_b2 = (_a2 = errors.referencias_personales) == null ? void 0 : _a2[index2]) == null ? void 0 : _b2.nombre) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.referencias_personales[index2].nombre.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: `referencias_personales.${index2}.relacion`,
                          control,
                          render: ({ field: field2 }) => {
                            var _a3, _b3;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                label: "Parentesco o Relación *",
                                error: !!((_b3 = (_a3 = errors == null ? void 0 : errors.referencias_personales) == null ? void 0 : _a3[index2]) == null ? void 0 : _b3.relacion),
                                value: field2.value || "",
                                onChange: (e) => {
                                  field2.onChange(e);
                                  handleUpdateReferencia(index2, "relacion", e.target.value);
                                }
                              }
                            );
                          }
                        }
                      ),
                      ((_d2 = (_c2 = errors.referencias_personales) == null ? void 0 : _c2[index2]) == null ? void 0 : _d2.relacion) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.referencias_personales[index2].relacion.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: `referencias_personales.${index2}.telefono`,
                          control,
                          render: ({ field: field2 }) => {
                            var _a3, _b3;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "tel",
                                label: "Teléfono de Contacto *",
                                error: !!((_b3 = (_a3 = errors.referencias_personales) == null ? void 0 : _a3[index2]) == null ? void 0 : _b3.telefono),
                                ...field2
                              }
                            );
                          }
                        }
                      ),
                      ((_f2 = (_e2 = errors.referencias_personales) == null ? void 0 : _e2[index2]) == null ? void 0 : _f2.telefono) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.referencias_personales[index2].telefono.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: `referencias_personales.${index2}.direccion`,
                        control,
                        render: ({ field: field2 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Dirección",
                            ...field2
                          }
                        )
                      }
                    ) })
                  ] })
                ] }, field.id);
              }),
              errors.referencias_personales && !Array.isArray(errors.referencias_personales) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-sm mt-1 mb-3 font-medium", children: errors.referencias_personales.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  variant: "filled",
                  color: "blue",
                  className: "flex items-center gap-2",
                  onClick: handleAddReferencia,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }),
                    "Agregar Referencia"
                  ]
                }
              ) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 5, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Documentos Requeridos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: [
                "Marque los documentos que ha recibido del propietario.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-medium", children: " Los documentos marcados con * son obligatorios." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-lg border border-blue-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "documentacion.ine",
                        control,
                        defaultValue: false,
                        render: ({ field }) => {
                          var _a2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "ine-check", className: "flex items-center cursor-pointer", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "ine-check",
                                type: "checkbox",
                                className: `w-5 h-5 mr-3 ${((_a2 = errors.documentacion) == null ? void 0 : _a2.ine) ? "border-red-500" : ""}`,
                                checked: field.value === true,
                                onChange: (e) => {
                                  field.onChange(e.target.checked);
                                  setFormData((prev) => ({
                                    ...prev,
                                    documentacion: {
                                      ...prev.documentacion,
                                      ine: e.target.checked
                                    }
                                  }));
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Identificación oficial (INE) *" })
                          ] }) });
                        }
                      }
                    ),
                    ((_E = errors.documentacion) == null ? void 0 : _E.ine) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs ml-8 mt-1", children: errors.documentacion.ine.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "documentacion.escrituras",
                        control,
                        defaultValue: false,
                        render: ({ field }) => {
                          var _a2;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "escrituras-check", className: "flex items-center cursor-pointer", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "escrituras-check",
                                type: "checkbox",
                                className: `w-5 h-5 mr-3 ${((_a2 = errors.documentacion) == null ? void 0 : _a2.escrituras) ? "border-red-500" : ""}`,
                                checked: field.value === true,
                                onChange: (e) => {
                                  field.onChange(e.target.checked);
                                  setFormData((prev) => ({
                                    ...prev,
                                    documentacion: {
                                      ...prev.documentacion,
                                      escrituras: e.target.checked
                                    }
                                  }));
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Escrituras *" })
                          ] }) });
                        }
                      }
                    ),
                    ((_F = errors.documentacion) == null ? void 0 : _F.escrituras) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs ml-8 mt-1", children: errors.documentacion.escrituras.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "documentacion.curp",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "curp-check", className: "flex items-center cursor-pointer", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "curp-check",
                            type: "checkbox",
                            className: "w-5 h-5 mr-3",
                            checked: field.value,
                            onChange: (e) => field.onChange(e.target.checked)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "CURP" })
                      ] }) })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "documentacion.rfc",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "rfc-check", className: "flex items-center cursor-pointer", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "rfc-check",
                            type: "checkbox",
                            className: "w-5 h-5 mr-3",
                            checked: field.value,
                            onChange: (e) => field.onChange(e.target.checked)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "RFC" })
                      ] }) })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "documentacion.comprobante_domicilio",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "comprobante-check", className: "flex items-center cursor-pointer", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "comprobante-check",
                            type: "checkbox",
                            className: "w-5 h-5 mr-3",
                            checked: field.value,
                            onChange: (e) => field.onChange(e.target.checked)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Comprobante de Domicilio" })
                      ] }) })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-2", children: "Observaciones sobre documentación" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "documentacion.observaciones",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Textarea,
                        {
                          label: "Notas adicionales sobre los documentos",
                          className: "bg-white",
                          ...field
                        }
                      )
                    }
                  )
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 6, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información de Venta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Controller,
                {
                  name: "venta.en_venta",
                  control,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "en-venta-check", className: "flex items-center cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "en-venta-check",
                        type: "checkbox",
                        className: "w-5 h-5 mr-3",
                        checked: field.value,
                        onChange: (e) => field.onChange(e.target.checked)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-lg", children: "¿La propiedad está en venta?" })
                  ] }) })
                }
              ) }),
              watch("venta.en_venta") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-white p-4 rounded-lg border border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Datos de la Operación" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: "venta.precio_venta",
                          control,
                          render: ({ field }) => {
                            var _a2;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "number",
                                label: "Precio de Venta *",
                                className: "bg-white",
                                error: !!((_a2 = errors.venta) == null ? void 0 : _a2.precio_venta),
                                ...field,
                                onChange: (e) => {
                                  const value = e.target.value;
                                  field.onChange(value === "" ? "" : Number(value));
                                }
                              }
                            );
                          }
                        }
                      ),
                      ((_G = errors.venta) == null ? void 0 : _G.precio_venta) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.venta.precio_venta.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "venta.comision_venta",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "number",
                            label: "Comisión de Venta",
                            className: "bg-white",
                            ...field,
                            onChange: (e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? "" : Number(value));
                            }
                          }
                        )
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "venta.fecha_venta",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "date",
                            label: "Fecha de Venta",
                            className: "bg-white",
                            ...field
                          }
                        )
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: "venta.tipo_credito",
                          control,
                          render: ({ field }) => {
                            var _a2;
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              react.Select,
                              {
                                label: "Tipo de Crédito *",
                                className: "bg-white",
                                value: field.value,
                                onChange: (value) => field.onChange(value),
                                error: !!((_a2 = errors.venta) == null ? void 0 : _a2.tipo_credito),
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Contado", children: "Contado" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "INFONAVIT", children: "INFONAVIT" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Crédito Bancario", children: "Crédito Bancario" })
                                ]
                              }
                            );
                          }
                        }
                      ),
                      ((_H = errors.venta) == null ? void 0 : _H.tipo_credito) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.venta.tipo_credito.message })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-white p-4 rounded-lg border border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Datos del Comprador" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: "venta.comprador.nombre",
                          control,
                          render: ({ field }) => {
                            var _a2, _b2;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "text",
                                label: "Nombre del Comprador *",
                                className: "bg-white",
                                error: !!((_b2 = (_a2 = errors.venta) == null ? void 0 : _a2.comprador) == null ? void 0 : _b2.nombre),
                                ...field
                              }
                            );
                          }
                        }
                      ),
                      ((_J = (_I = errors.venta) == null ? void 0 : _I.comprador) == null ? void 0 : _J.nombre) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.venta.comprador.nombre.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: "venta.comprador.telefono",
                          control,
                          render: ({ field }) => {
                            var _a2, _b2;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "tel",
                                label: "Teléfono del Comprador *",
                                className: "bg-white",
                                error: !!((_b2 = (_a2 = errors.venta) == null ? void 0 : _a2.comprador) == null ? void 0 : _b2.telefono),
                                ...field
                              }
                            );
                          }
                        }
                      ),
                      ((_L = (_K = errors.venta) == null ? void 0 : _K.comprador) == null ? void 0 : _L.telefono) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.venta.comprador.telefono.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          name: "venta.comprador.correo",
                          control,
                          render: ({ field }) => {
                            var _a2, _b2;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              react.Input,
                              {
                                type: "email",
                                label: "Correo Electrónico",
                                className: "bg-white",
                                error: !!((_b2 = (_a2 = errors.venta) == null ? void 0 : _a2.comprador) == null ? void 0 : _b2.correo),
                                ...field
                              }
                            );
                          }
                        }
                      ),
                      ((_N = (_M = errors.venta) == null ? void 0 : _M.comprador) == null ? void 0 : _N.correo) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.venta.comprador.correo.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "venta.comprador.direccion",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Dirección",
                            className: "bg-white",
                            ...field
                          }
                        )
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-white p-4 rounded-lg border border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Documentos de la Venta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "venta.documentos_entregados.contrato",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "contrato-check", className: "flex items-center cursor-pointer", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "contrato-check",
                              type: "checkbox",
                              className: "w-5 h-5 mr-3",
                              checked: field.value,
                              onChange: (e) => field.onChange(e.target.checked)
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Contrato de Compraventa" })
                        ] }) })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "venta.documentos_entregados.identificacion",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "identificacion-check", className: "flex items-center cursor-pointer", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "identificacion-check",
                              type: "checkbox",
                              className: "w-5 h-5 mr-3",
                              checked: field.value,
                              onChange: (e) => field.onChange(e.target.checked)
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Identificación del Comprador" })
                        ] }) })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "venta.documentos_entregados.constancia_credito",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "credito-check", className: "flex items-center cursor-pointer", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "credito-check",
                              type: "checkbox",
                              className: "w-5 h-5 mr-3",
                              checked: field.value,
                              onChange: (e) => field.onChange(e.target.checked)
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Constancia/Aprobación de Crédito" })
                        ] }) })
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg border border-blue-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Observaciones de la Venta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.observaciones",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Textarea,
                        {
                          label: "Notas o comentarios adicionales sobre la venta",
                          className: "bg-white",
                          ...field
                        }
                      )
                    }
                  )
                ] })
              ] }),
              !watch("venta.en_venta") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4 bg-white rounded-lg border border-blue-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "italic", children: "La propiedad no está en venta actualmente." }) })
            ] }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardFooter, { className: "flex justify-between p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          variant: "outlined",
          color: "red",
          onClick: () => navigate("/dashboard/captaciones"),
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          variant: "filled",
          color: "green",
          onClick: submitForm,
          disabled: isLoading,
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Guardando..." })
          ] }) : "Guardar Captación"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.Alert,
      {
        color: "red",
        variant: "filled",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75a1.5 1.5 0 01-1.5 1.5 1.5 0 01-1.5-1.5 1.5 0 011.5-1.5z" }) }),
        onClose: () => setError(null),
        animate: {
          mount: { y: 0, opacity: 1 },
          unmount: { y: 25, opacity: 0 }
        },
        children: error
      }
    ) }),
    successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.Alert,
      {
        color: "green",
        variant: "filled",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        onClose: () => setSuccessMessage(""),
        children: successMessage
      }
    ) })
  ] }) });
}
function EditarCaptacion() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S;
  console.log("=== COMPONENTE EditarCaptacion EJECUTÁNDOSE ===");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("ID de la URL:", id);
  const [activeTab, setActiveTab] = reactExports.useState(0);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const [user, setUser] = reactExports.useState(null);
  const [initialData, setInitialData] = reactExports.useState(null);
  const [supervisores, setSupervisores] = reactExports.useState([]);
  const tabs = [
    { label: "Propietario", value: 0 },
    { label: "Propiedad", value: 1 },
    { label: "Adeudos", value: 2 },
    { label: "Datos Laborales", value: 3 },
    { label: "Referencias", value: 4 },
    { label: "Documentos", value: 5 },
    { label: "Venta", value: 6 },
    { label: "Estatus y Configuración", value: 7 }
  ];
  const defaultValues = {
    propietario: {
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      identificacion: "",
      nss: "",
      rfc: "",
      curp: "",
      estado_civil: "",
      tiene_conyuge: false,
      conyuge: {
        nombre: "",
        telefono: "",
        nss: "",
        rfc: "",
        curp: ""
      }
    },
    propiedad: {
      tipo: "",
      direccion: {
        calle: "",
        numero: "",
        colonia: "",
        ciudad: "",
        estado: "",
        codigo_postal: "",
        manzana: "",
        lote: ""
      },
      caracteristicas: {
        m2_terreno: "",
        m2_construccion: "",
        habitaciones: "",
        baños: "",
        cocheras: "",
        descripcion: ""
      },
      imagenes: [],
      adeudos: []
    },
    datos_laborales: {
      empresa: "",
      direccion: "",
      telefono: "",
      area: "",
      puesto: "",
      turno: "",
      registro_patronal: "",
      antiguedad: "",
      ingresos_mensuales: ""
    },
    referencias_personales: [],
    documentos: {
      ine: null,
      curp: null,
      rfc: null,
      escrituras: null,
      predial: null,
      comprobante_domicilio: null,
      otros: []
    },
    venta: {
      precio_venta: "",
      comision_venta: "",
      fecha_venta: "",
      en_venta: false,
      comprador: {
        nombre: "",
        telefono: "",
        correo: "",
        direccion: ""
      },
      tipo_credito: "",
      observaciones: "",
      documentos_entregados: {
        contrato: false,
        identificacion: false,
        constancia_credito: false
      }
    },
    captacion: {
      tipo_captacion: "Abierta",
      estatus_actual: "Captación",
      presupuesto_estimado: "",
      supervisor_id: "",
      observaciones: ""
    },
    documentacion: {
      ine: false,
      curp: false,
      rfc: false,
      escrituras: false,
      predial_pagado: false,
      libre_gravamen: false,
      comprobante_domicilio: false
    },
    tipo_tramite: ""
  };
  const schema = create$3().shape({
    propietario: create$3().shape({
      nombre: create$6().required("El nombre del propietario es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
      telefono: create$6().required("El teléfono es requerido").matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos numéricos"),
      correo: create$6().email("El formato del correo electrónico no es válido").optional(),
      direccion: create$6().optional(),
      identificacion: create$6().optional(),
      nss: create$6().optional().matches(/^\d{11}$/, "El NSS debe contener 11 dígitos numéricos"),
      rfc: create$6().optional().matches(
        /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/,
        "El formato de RFC no es válido (ej. ABCD123456XXX)"
      ),
      curp: create$6().optional().matches(
        /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/,
        "El formato de CURP no es válido"
      ),
      estado_civil: create$6().required("El estado civil es requerido"),
      tiene_conyuge: create$7().optional(),
      conyuge: create$3().shape({
        nombre: create$6().optional(),
        telefono: create$6().optional(),
        nss: create$6().optional(),
        rfc: create$6().optional(),
        curp: create$6().optional()
      })
    }),
    propiedad: create$3().shape({
      tipo: create$6().required("El tipo de propiedad es requerido"),
      direccion: create$3().shape({
        calle: create$6().required("La calle es requerida"),
        numero: create$6().required("El número es requerido"),
        colonia: create$6().required("La colonia es requerida"),
        ciudad: create$6().required("La ciudad es requerida"),
        estado: create$6().required("El estado es requerido"),
        codigo_postal: create$6().required("El código postal es requerido"),
        manzana: create$6().transform((v) => v === "" ? "N/A" : v).optional(),
        lote: create$6().transform((v) => v === "" ? "N/A" : v).optional()
      }),
      caracteristicas: create$3().shape({
        m2_terreno: create$5().transform((value) => isNaN(value) ? void 0 : value).required("Los metros cuadrados de terreno son requeridos").positive("Debe ser un número mayor a 0"),
        m2_construccion: create$5().transform((value) => isNaN(value) ? void 0 : value).required("Los metros cuadrados de construcción son requeridos").positive("Debe ser un número mayor a 0"),
        habitaciones: create$5().transform((value) => isNaN(value) ? void 0 : value).required("El número de recámaras es requerido").min(0, "No puede ser un número negativo"),
        baños: create$5().transform((value) => isNaN(value) ? void 0 : value).required("El número de baños es requerido").min(0, "No puede ser un número negativo"),
        cocheras: create$5().transform((value) => isNaN(value) ? void 0 : value).optional().min(0, "No puede ser un número negativo")
      })
    }),
    referencias_personales: create$2().of(
      create$3().shape({
        nombre: create$6().required("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
        telefono: create$6().required("El teléfono es requerido").matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos numéricos"),
        relacion: create$6().required("El parentesco es requerido"),
        direccion: create$6().optional()
      })
    ).min(1, "Se requiere al menos 1 referencia personal").required("Las referencias personales son requeridas"),
    documentacion: create$3().shape({
      ine: create$7().oneOf([true], "La identificación oficial (INE) es obligatoria").required("La identificación oficial (INE) es obligatoria"),
      escrituras: create$7().oneOf([true], "Las escrituras son obligatorias").required("Las escrituras son obligatorias"),
      curp: create$7().optional(),
      rfc: create$7().optional(),
      comprobante_domicilio: create$7().optional()
    }),
    venta: create$3().shape({
      precio_venta: create$5().transform((value) => isNaN(value) || value === null || value === "" ? void 0 : value).nullable().optional(),
      tipo_credito: create$6().nullable().optional(),
      en_venta: create$7().default(false),
      comprador: create$3().shape({
        nombre: create$6().nullable().optional(),
        telefono: create$6().nullable().optional(),
        correo: create$6().nullable().optional()
      }),
      documentos_entregados: create$3().shape({
        contrato: create$7().default(false),
        identificacion: create$7().default(false),
        constancia_credito: create$7().default(false)
      }),
      observaciones: create$6().optional()
    }),
    captacion: create$3().shape({
      tipo_captacion: create$6().optional(),
      estatus_actual: create$6().required("El estatus actual es requerido"),
      presupuesto_estimado: create$5().transform((value) => isNaN(value) || value === null || value === "" ? void 0 : value).nullable().when("estatus_actual", (estatus_actual, schema2) => {
        return estatus_actual === "Remodelacion" ? schema2.required("El presupuesto estimado es requerido cuando el estatus es Remodelacion").min(0, "El presupuesto debe ser mayor o igual a 0") : schema2.nullable().optional();
      }),
      supervisor_id: create$6().nullable().when("estatus_actual", (estatus_actual, schema2) => {
        return estatus_actual === "Remodelacion" ? schema2.required("El supervisor es requerido cuando el estatus es Remodelacion") : schema2.nullable().optional();
      }),
      observaciones: create$6().optional()
    }),
    datos_laborales: create$3().shape({
      empresa: create$6().optional(),
      direccion: create$6().optional(),
      telefono: create$6().optional(),
      area: create$6().optional(),
      puesto: create$6().optional(),
      turno: create$6().optional(),
      registro_patronal: create$6().optional(),
      antiguedad: create$5().transform((value) => isNaN(value) || value === null || value === "" ? void 0 : value).nullable().optional(),
      ingresos_mensuales: create$5().transform((value) => isNaN(value) || value === null || value === "" ? void 0 : value).nullable().optional()
    })
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: o(schema),
    defaultValues
  });
  const { fields: adeudosFields, append: appendAdeudo, remove: removeAdeudo } = useFieldArray({
    control,
    name: "propiedad.adeudos"
  });
  const { fields: referenciasFields, append: appendReferencia, remove: removeReferencia } = useFieldArray({
    control,
    name: "referencias_personales"
  });
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      var _a2;
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          const userRole = ((_a2 = data.user) == null ? void 0 : _a2.role) || "";
          const isAuthorized = ["user", "administrator", "admin"].includes(userRole);
          if (!isAuthorized) {
            navigate("/dashboard/home");
          }
        } else {
          navigate("/auth/sign-in");
        }
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        navigate("/auth/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  reactExports.useEffect(() => {
    const loadInitialData = async () => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2;
      try {
        setIsLoading(true);
        const data = await captacionesAPI.getById(id);
        console.log("Datos recibidos:", data);
        console.log("Propietario:", data.propietario);
        console.log("Propiedad:", data.propiedad);
        console.log("Venta:", data.venta);
        console.log("Documentos:", data.documentos_entregados);
        console.log("🔍 Datos de remodelacion:", data.remodelacion);
        console.log("🔍 Supervisor en remodelacion:", (_a2 = data.remodelacion) == null ? void 0 : _a2.supervisor);
        console.log("🔍 Supervisor ID en remodelacion:", (_b2 = data.remodelacion) == null ? void 0 : _b2.supervisor_id);
        const formData = {
          propietario: {
            nombre: ((_c2 = data.propietario) == null ? void 0 : _c2.nombre) || "",
            telefono: ((_d2 = data.propietario) == null ? void 0 : _d2.telefono) || "",
            correo: ((_e2 = data.propietario) == null ? void 0 : _e2.correo) || "",
            direccion: ((_f2 = data.propietario) == null ? void 0 : _f2.direccion) || "",
            identificacion: ((_g2 = data.propietario) == null ? void 0 : _g2.identificacion) || "",
            nss: ((_h2 = data.propietario) == null ? void 0 : _h2.nss) || "",
            rfc: ((_i2 = data.propietario) == null ? void 0 : _i2.rfc) || "",
            curp: ((_j2 = data.propietario) == null ? void 0 : _j2.curp) || "",
            estado_civil: ((_k2 = data.propietario) == null ? void 0 : _k2.estado_civil) || "",
            tiene_conyuge: ((_l2 = data.propietario) == null ? void 0 : _l2.tiene_conyuge) || false,
            conyuge: ((_m2 = data.propietario) == null ? void 0 : _m2.conyuge) || {
              nombre: "",
              telefono: "",
              nss: "",
              rfc: "",
              curp: ""
            }
          },
          propiedad: {
            tipo: ((_n2 = data.propiedad) == null ? void 0 : _n2.tipo) || "",
            direccion: {
              calle: ((_p2 = (_o2 = data.propiedad) == null ? void 0 : _o2.direccion) == null ? void 0 : _p2.calle) || "",
              numero: ((_r2 = (_q2 = data.propiedad) == null ? void 0 : _q2.direccion) == null ? void 0 : _r2.numero) || "",
              colonia: ((_t2 = (_s2 = data.propiedad) == null ? void 0 : _s2.direccion) == null ? void 0 : _t2.colonia) || "",
              ciudad: ((_v2 = (_u2 = data.propiedad) == null ? void 0 : _u2.direccion) == null ? void 0 : _v2.ciudad) || "",
              estado: ((_x2 = (_w2 = data.propiedad) == null ? void 0 : _w2.direccion) == null ? void 0 : _x2.estado) || "",
              codigo_postal: ((_z2 = (_y2 = data.propiedad) == null ? void 0 : _y2.direccion) == null ? void 0 : _z2.codigo_postal) || "",
              manzana: ((_B2 = (_A2 = data.propiedad) == null ? void 0 : _A2.direccion) == null ? void 0 : _B2.manzana) || "",
              lote: ((_D2 = (_C2 = data.propiedad) == null ? void 0 : _C2.direccion) == null ? void 0 : _D2.lote) || ""
            },
            caracteristicas: {
              m2_terreno: ((_F2 = (_E2 = data.propiedad) == null ? void 0 : _E2.caracteristicas) == null ? void 0 : _F2.m2_terreno) || "",
              m2_construccion: ((_H2 = (_G2 = data.propiedad) == null ? void 0 : _G2.caracteristicas) == null ? void 0 : _H2.m2_construccion) || "",
              habitaciones: ((_J2 = (_I2 = data.propiedad) == null ? void 0 : _I2.caracteristicas) == null ? void 0 : _J2.habitaciones) || "",
              baños: ((_L2 = (_K2 = data.propiedad) == null ? void 0 : _K2.caracteristicas) == null ? void 0 : _L2.baños) || "",
              cocheras: ((_N2 = (_M2 = data.propiedad) == null ? void 0 : _M2.caracteristicas) == null ? void 0 : _N2.cocheras) || "",
              descripcion: ((_P2 = (_O2 = data.propiedad) == null ? void 0 : _O2.caracteristicas) == null ? void 0 : _P2.descripcion) || ""
            },
            adeudos: ((_Q2 = data.propiedad) == null ? void 0 : _Q2.adeudos) || []
          },
          datos_laborales: data.datos_laborales ? {
            empresa: data.datos_laborales.empresa || "",
            direccion: data.datos_laborales.direccion || "",
            telefono: data.datos_laborales.telefono || "",
            area: data.datos_laborales.area || "",
            puesto: data.datos_laborales.puesto || "",
            turno: data.datos_laborales.turno || "",
            registro_patronal: data.datos_laborales.registro_patronal || "",
            antiguedad: data.datos_laborales.antiguedad || "",
            ingresos_mensuales: data.datos_laborales.ingresos_mensuales || ""
          } : defaultValues.datos_laborales,
          referencias_personales: data.referencias_personales || [],
          venta: data.venta ? {
            precio_venta: data.venta.monto_venta || data.venta.precio_venta || "",
            comision_venta: data.venta.comision_total || data.venta.comision_venta || "",
            fecha_venta: data.venta.fecha_venta || "",
            en_venta: data.estatus_actual === "Disponible para venta" || false,
            comprador: data.venta.comprador ? {
              nombre: data.venta.comprador.nombre || "",
              telefono: data.venta.comprador.telefono || "",
              correo: data.venta.comprador.correo || "",
              direccion: data.venta.comprador.direccion || ""
            } : defaultValues.venta.comprador,
            tipo_credito: data.venta.tipo_de_pago || data.venta.tipo_credito || "",
            observaciones: data.venta.notas_adicionales || data.venta.observaciones || "",
            documentos_entregados: data.venta.documentos_entregados ? {
              contrato: data.venta.documentos_entregados.contrato || false,
              identificacion: data.venta.documentos_entregados.identificacion || false,
              constancia_credito: data.venta.documentos_entregados.constancia_credito || false
            } : defaultValues.venta.documentos_entregados
          } : defaultValues.venta,
          captacion: data.captacion ? {
            tipo_captacion: data.captacion.tipo_captacion || "Abierta",
            estatus_actual: data.estatus_actual || "Captación",
            presupuesto_estimado: ((_R2 = data.remodelacion) == null ? void 0 : _R2.presupuesto_estimado) || "",
            supervisor_id: (() => {
              var _a3, _b3, _c3, _d3;
              let supervisorId = "";
              if ((_a3 = data.remodelacion) == null ? void 0 : _a3.supervisor) {
                supervisorId = typeof data.remodelacion.supervisor === "object" ? data.remodelacion.supervisor._id : data.remodelacion.supervisor;
              } else if ((_b3 = data.remodelacion) == null ? void 0 : _b3.supervisor_id) {
                supervisorId = data.remodelacion.supervisor_id;
              }
              console.log("🔍 Mapeando supervisor_id:", supervisorId);
              console.log("🔍 De supervisor object:", (_c3 = data.remodelacion) == null ? void 0 : _c3.supervisor);
              console.log("🔍 De supervisor_id directo:", (_d3 = data.remodelacion) == null ? void 0 : _d3.supervisor_id);
              return supervisorId;
            })(),
            observaciones: data.captacion.observaciones || ""
          } : defaultValues.captacion,
          documentacion: data.documentos_entregados ? {
            ine: data.documentos_entregados.ine || false,
            curp: data.documentos_entregados.curp || false,
            rfc: data.documentos_entregados.rfc || false,
            escrituras: data.documentos_entregados.escrituras || false,
            predial_pagado: data.documentos_entregados.predial_pagado || false,
            libre_gravamen: data.documentos_entregados.libre_gravamen || false,
            comprobante_domicilio: data.documentos_entregados.comprobante_domicilio || false
          } : defaultValues.documentacion
        };
        console.log("Datos mapeados:", formData);
        setInitialData(formData);
        reset(formData);
      } catch (error2) {
        console.error("Error al cargar datos:", error2);
        setError("Error al cargar los datos de la captación");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      loadInitialData();
    }
  }, [id, reset]);
  reactExports.useEffect(() => {
    const cargarSupervisores = async () => {
      try {
        axios.defaults.baseURL = "http://localhost:4000";
        axios.defaults.withCredentials = true;
        const response = await axios.get("/api/users", {
          params: { role: "supervisor" }
        });
        console.log("🔍 Respuesta de supervisores:", response.data);
        if (response.data && response.data.success && Array.isArray(response.data.users)) {
          console.log("✅ Supervisores encontrados:", response.data.users);
          setSupervisores(response.data.users);
        } else {
          console.log("❌ No se encontraron supervisores o formato incorrecto");
          setSupervisores([]);
        }
      } catch (error2) {
        console.error("Error al cargar supervisores:", error2);
        setSupervisores([]);
      }
    };
    cargarSupervisores();
  }, []);
  const sincronizarEstatus = (data) => {
    var _a2;
    const estatusActual = (_a2 = data.captacion) == null ? void 0 : _a2.estatus_actual;
    if (estatusActual === "Disponible para venta") {
      data.venta = data.venta || {};
      data.venta.en_venta = true;
    }
    return data;
  };
  const onSubmit = async (data) => {
    try {
      console.log("=== INICIANDO ENVÍO DEL FORMULARIO ===");
      console.log("Datos del formulario a enviar:", data);
      console.log("ID de la captación:", id);
      const datosSincronizados = sincronizarEstatus(data);
      console.log("Datos sincronizados:", datosSincronizados);
      setIsLoading(true);
      setError(null);
      console.log("Llamando a captacionesAPI.update...");
      const response = await captacionesAPI.update(id, datosSincronizados);
      console.log("Respuesta del servidor:", response);
      setSuccessMessage("Captación actualizada exitosamente");
      setTimeout(() => {
        navigate("/dashboard/captaciones");
      }, 2e3);
    } catch (error2) {
      console.error("=== ERROR AL ACTUALIZAR ===");
      console.error("Error completo:", error2);
      console.error("Error response:", error2.response);
      console.error("Error message:", error2.message);
      setError(error2.message || "Error al actualizar la captación");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading && !initialData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Editar Captación" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "px-0 pt-0 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit((data) => {
      console.log("=== FORMULARIO ENVIADO ===");
      console.log("Datos del formulario:", data);
      onSubmit(data);
    }), className: "mt-12 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { value: activeTab, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.TabsHeader,
          {
            className: "rounded-none border-b border-blue-gray-50 bg-transparent p-0",
            indicatorProps: {
              className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none"
            },
            children: tabs.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Tab,
              {
                value,
                onClick: () => setActiveTab(value),
                className: activeTab === value ? "text-blue-500" : "",
                children: label
              },
              value
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsBody, { animate: {
          initial: { opacity: 0 },
          mount: { opacity: 1 },
          unmount: { opacity: 0 }
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 0, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información del Propietario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Complete la información personal del propietario de la propiedad. Los campos marcados con * son obligatorios." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propietario.nombre",
                    control,
                    render: ({ field }) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Nombre Completo *",
                          className: ((_a2 = errors.propietario) == null ? void 0 : _a2.nombre) ? "border-red-500" : "",
                          ...field
                        }
                      );
                    }
                  }
                ),
                ((_a = errors.propietario) == null ? void 0 : _a.nombre) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.nombre.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propietario.telefono",
                    control,
                    render: ({ field }) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "tel",
                          label: "Teléfono *",
                          className: ((_a2 = errors.propietario) == null ? void 0 : _a2.telefono) ? "border-red-500" : "",
                          ...field
                        }
                      );
                    }
                  }
                ),
                ((_b = errors.propietario) == null ? void 0 : _b.telefono) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.telefono.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propietario.correo",
                    control,
                    render: ({ field }) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "email",
                          label: "Correo Electrónico",
                          className: ((_a2 = errors.propietario) == null ? void 0 : _a2.correo) ? "border-red-500" : "",
                          ...field
                        }
                      );
                    }
                  }
                ),
                ((_c = errors.propietario) == null ? void 0 : _c.correo) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.correo.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propietario.estado_civil",
                    control,
                    render: ({ field }) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        react.Select,
                        {
                          label: "Estado Civil *",
                          value: field.value,
                          onChange: (value) => field.onChange(value),
                          error: !!((_a2 = errors.propietario) == null ? void 0 : _a2.estado_civil),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Soltero", children: "Soltero(a)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Casado", children: "Casado(a)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Divorciado", children: "Divorciado(a)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Viudo", children: "Viudo(a)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Unión Libre", children: "Unión Libre" })
                          ]
                        }
                      );
                    }
                  }
                ),
                ((_d = errors.propietario) == null ? void 0 : _d.estado_civil) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.estado_civil.message })
              ] }),
              watch("propietario.estado_civil") === "Casado" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-green-50 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "mb-3", children: "Datos de Esposa(o)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { name: "propietario.conyuge.nombre", control, render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "Nombre de Esposa(o)", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { name: "propietario.conyuge.telefono", control, render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "tel", label: "Teléfono de Esposa(o)", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { name: "propietario.conyuge.nss", control, render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "NSS de Esposa(o)", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { name: "propietario.conyuge.rfc", control, render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "RFC de Esposa(o)", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { name: "propietario.conyuge.curp", control, render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { type: "text", label: "CURP de Esposa(o)", ...field }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium mb-2 text-blue-gray-500", children: "Documentos de Identificación" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.identificacion",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Número de Identificación",
                          ...field
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.nss",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Número de Seguridad Social",
                            className: ((_a2 = errors.propietario) == null ? void 0 : _a2.nss) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_e = errors.propietario) == null ? void 0 : _e.nss) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.nss.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.rfc",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "RFC",
                            className: ((_a2 = errors.propietario) == null ? void 0 : _a2.rfc) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_f = errors.propietario) == null ? void 0 : _f.rfc) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.rfc.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propietario.curp",
                      control,
                      render: ({ field }) => {
                        var _a2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "CURP",
                            className: ((_a2 = errors.propietario) == null ? void 0 : _a2.curp) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_g = errors.propietario) == null ? void 0 : _g.curp) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.curp.message })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium mb-2 text-blue-gray-500", children: "Dirección del Propietario" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propietario.direccion",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Textarea,
                      {
                        label: "Dirección completa",
                        ...field
                      }
                    )
                  }
                )
              ] }),
              watch("propietario.estado_civil") === "Casado" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información del Conyuge" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Complete la información del conyuge del propietario." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propietario.conyuge.nombre",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Nombre Completo del Conyuge",
                            ...field
                          }
                        )
                      }
                    ),
                    ((_i = (_h = errors.propietario) == null ? void 0 : _h.conyuge) == null ? void 0 : _i.nombre) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.conyuge.nombre.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propietario.conyuge.telefono",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "tel",
                            label: "Teléfono del Conyuge",
                            ...field
                          }
                        )
                      }
                    ),
                    ((_k = (_j = errors.propietario) == null ? void 0 : _j.conyuge) == null ? void 0 : _k.telefono) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.conyuge.telefono.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propietario.conyuge.nss",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Número de Seguridad Social del Conyuge",
                            ...field
                          }
                        )
                      }
                    ),
                    ((_m = (_l = errors.propietario) == null ? void 0 : _l.conyuge) == null ? void 0 : _m.nss) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.conyuge.nss.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propietario.conyuge.rfc",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "RFC del Conyuge",
                            ...field
                          }
                        )
                      }
                    ),
                    ((_o = (_n = errors.propietario) == null ? void 0 : _n.conyuge) == null ? void 0 : _o.rfc) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.conyuge.rfc.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "propietario.conyuge.curp",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "CURP del Conyuge",
                            ...field
                          }
                        )
                      }
                    ),
                    ((_q = (_p = errors.propietario) == null ? void 0 : _p.conyuge) == null ? void 0 : _q.curp) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propietario.conyuge.curp.message })
                  ] })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 1, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información de la Propiedad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Complete la información de la propiedad. Los campos marcados con * son obligatorios." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propiedad.tipo",
                    control,
                    render: ({ field }) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        react.Select,
                        {
                          label: "Tipo de Propiedad *",
                          value: field.value,
                          onChange: (value) => field.onChange(value),
                          error: !!((_a2 = errors.propiedad) == null ? void 0 : _a2.tipo),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Casa", children: "Casa" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Departamento", children: "Departamento" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Terreno", children: "Terreno" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Condominio", children: "Condominio" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Local Comercial", children: "Local Comercial" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Oficina", children: "Oficina" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Condominio", children: "Condominio" })
                          ]
                        }
                      );
                    }
                  }
                ),
                ((_r = errors.propiedad) == null ? void 0 : _r.tipo) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.tipo.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium mb-2 text-blue-gray-500", children: "Dirección de la Propiedad" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.calle",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Calle *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.calle) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_t = (_s = errors.propiedad) == null ? void 0 : _s.direccion) == null ? void 0 : _t.calle) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.calle.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.numero",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Número *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.numero) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_v = (_u = errors.propiedad) == null ? void 0 : _u.direccion) == null ? void 0 : _v.numero) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.numero.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.colonia",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Colonia *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.colonia) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_x = (_w = errors.propiedad) == null ? void 0 : _w.direccion) == null ? void 0 : _x.colonia) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.colonia.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.ciudad",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Ciudad *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.ciudad) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_z = (_y = errors.propiedad) == null ? void 0 : _y.direccion) == null ? void 0 : _z.ciudad) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.ciudad.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.estado",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Estado *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.estado) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_B = (_A = errors.propiedad) == null ? void 0 : _A.direccion) == null ? void 0 : _B.estado) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.estado.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.codigo_postal",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Código Postal *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b2.codigo_postal) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_D = (_C = errors.propiedad) == null ? void 0 : _C.direccion) == null ? void 0 : _D.codigo_postal) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.codigo_postal.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.manzana",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Manzana",
                          ...field
                        }
                      )
                    }
                  ),
                  ((_F = (_E = errors.propiedad) == null ? void 0 : _E.direccion) == null ? void 0 : _F.manzana) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.manzana.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.direccion.lote",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Lote",
                          ...field
                        }
                      )
                    }
                  ),
                  ((_H = (_G = errors.propiedad) == null ? void 0 : _G.direccion) == null ? void 0 : _H.lote) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.direccion.lote.message })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium mb-2 text-blue-gray-500", children: "Características de la Propiedad" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.caracteristicas.m2_terreno",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "number",
                            label: "Metros Cuadrados de Terreno *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.m2_terreno) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_J = (_I = errors.propiedad) == null ? void 0 : _I.caracteristicas) == null ? void 0 : _J.m2_terreno) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.m2_terreno.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.caracteristicas.m2_construccion",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "number",
                            label: "Metros Cuadrados de Construcción *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.m2_construccion) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_L = (_K = errors.propiedad) == null ? void 0 : _K.caracteristicas) == null ? void 0 : _L.m2_construccion) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.m2_construccion.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.caracteristicas.habitaciones",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "number",
                            label: "Número de Recámaras *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.habitaciones) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_N = (_M = errors.propiedad) == null ? void 0 : _M.caracteristicas) == null ? void 0 : _N.habitaciones) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.habitaciones.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.caracteristicas.baños",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "number",
                            label: "Número de Baños *",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.baños) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_P = (_O = errors.propiedad) == null ? void 0 : _O.caracteristicas) == null ? void 0 : _P.baños) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.baños.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "propiedad.caracteristicas.cocheras",
                      control,
                      render: ({ field }) => {
                        var _a2, _b2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "number",
                            label: "Número de Cocheras",
                            className: ((_b2 = (_a2 = errors.propiedad) == null ? void 0 : _a2.caracteristicas) == null ? void 0 : _b2.cocheras) ? "border-red-500" : "",
                            ...field
                          }
                        );
                      }
                    }
                  ),
                  ((_R = (_Q = errors.propiedad) == null ? void 0 : _Q.caracteristicas) == null ? void 0 : _R.cocheras) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.propiedad.caracteristicas.cocheras.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propiedad.caracteristicas.descripcion",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Textarea,
                      {
                        label: "Descripción Adicional",
                        ...field
                      }
                    )
                  }
                ) })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 2, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Adeudos de la Propiedad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Registre los adeudos relacionados con la propiedad." }),
              adeudosFields.map((field, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 border rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", className: "font-medium", children: [
                    "Adeudo ",
                    index2 + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Button,
                    {
                      size: "sm",
                      color: "red",
                      variant: "text",
                      onClick: () => removeAdeudo(index2),
                      children: "Eliminar"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: `propiedad.adeudos.${index2}.tipo`,
                      control,
                      render: ({ field: field2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        react.Select,
                        {
                          label: "Tipo de Adeudo",
                          value: field2.value,
                          onChange: (value) => field2.onChange(value),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Predial", children: "Predial" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Agua", children: "Agua" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Hipoteca", children: "Hipoteca" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "CFE", children: "CFE (Luz)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Mantenimiento", children: "Mantenimiento" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Gas", children: "Gas" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Otro", children: "Otro" })
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: `propiedad.adeudos.${index2}.monto`,
                      control,
                      render: ({ field: field2 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "number",
                          label: "Monto",
                          ...field2
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: `propiedad.adeudos.${index2}.numero_referencia`,
                      control,
                      render: ({ field: field2 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Número de Referencia o número de crédito",
                          ...field2
                        }
                      )
                    }
                  ),
                  watch(`propiedad.adeudos.${index2}.tipo`) === "Otro" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: `propiedad.adeudos.${index2}.detalle`,
                      control,
                      render: ({ field: field2 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Detalle del adeudo (si seleccionó 'Otro')",
                          ...field2
                        }
                      )
                    }
                  )
                ] })
              ] }, field.id)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  size: "sm",
                  color: "blue",
                  variant: "outlined",
                  onClick: () => appendAdeudo({ tipo: "", monto: "", numero_referencia: "" }),
                  className: "mt-4",
                  children: "Agregar Adeudo"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 3, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Datos Laborales del Propietario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Complete la información laboral del propietario." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.empresa",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Nombre de la Empresa",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.direccion",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Dirección de la Empresa",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.telefono",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "tel",
                        label: "Teléfono de la Empresa",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.area",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Área o Departamento",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.puesto",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Puesto",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.turno",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      react.Select,
                      {
                        label: "Turno",
                        value: field.value,
                        onChange: (value) => field.onChange(value),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Matutino", children: "Matutino" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Vespertino", children: "Vespertino" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Nocturno", children: "Nocturno" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Mixto", children: "Mixto" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.registro_patronal",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Registro Patronal",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.antiguedad",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "text",
                        label: "Antigüedad",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "datos_laborales.ingresos_mensuales",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "number",
                        label: "Ingresos Mensuales",
                        ...field
                      }
                    )
                  }
                )
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 4, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Referencias Personales" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Agregue al menos dos referencias personales del propietario." }),
              referenciasFields.map((field, index2) => {
                var _a2, _b2, _c2, _d2, _e2, _f2;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 border rounded-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", className: "font-medium", children: [
                      "Referencia ",
                      index2 + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Button,
                      {
                        size: "sm",
                        color: "red",
                        variant: "text",
                        onClick: () => removeReferencia(index2),
                        children: "Eliminar"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: `referencias_personales.${index2}.nombre`,
                        control,
                        render: ({ field: field2 }) => {
                          var _a3, _b3;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "text",
                              label: "Nombre Completo *",
                              className: ((_b3 = (_a3 = errors.referencias_personales) == null ? void 0 : _a3[index2]) == null ? void 0 : _b3.nombre) ? "border-red-500" : "",
                              ...field2
                            }
                          );
                        }
                      }
                    ),
                    ((_b2 = (_a2 = errors.referencias_personales) == null ? void 0 : _a2[index2]) == null ? void 0 : _b2.nombre) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.referencias_personales[index2].nombre.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: `referencias_personales.${index2}.telefono`,
                        control,
                        render: ({ field: field2 }) => {
                          var _a3, _b3;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            react.Input,
                            {
                              type: "tel",
                              label: "Teléfono *",
                              className: ((_b3 = (_a3 = errors.referencias_personales) == null ? void 0 : _a3[index2]) == null ? void 0 : _b3.telefono) ? "border-red-500" : "",
                              ...field2
                            }
                          );
                        }
                      }
                    ),
                    ((_d2 = (_c2 = errors.referencias_personales) == null ? void 0 : _c2[index2]) == null ? void 0 : _d2.telefono) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.referencias_personales[index2].telefono.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: `referencias_personales.${index2}.relacion`,
                        control,
                        render: ({ field: field2 }) => {
                          var _a3, _b3;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            react.Select,
                            {
                              label: "Parentesco *",
                              value: field2.value,
                              onChange: (value) => field2.onChange(value),
                              error: !!((_b3 = (_a3 = errors.referencias_personales) == null ? void 0 : _a3[index2]) == null ? void 0 : _b3.relacion),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "", children: "Seleccionar parentesco" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Familiar", children: "Familiar" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Amigo", children: "Amigo" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Vecino", children: "Vecino" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Compañero de Trabajo", children: "Compañero de Trabajo" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Otro", children: "Otro" })
                              ]
                            }
                          );
                        }
                      }
                    ),
                    ((_f2 = (_e2 = errors.referencias_personales) == null ? void 0 : _e2[index2]) == null ? void 0 : _f2.relacion) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.referencias_personales[index2].relacion.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: `referencias_personales.${index2}.direccion`,
                        control,
                        render: ({ field: field2 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          react.Input,
                          {
                            type: "text",
                            label: "Dirección",
                            ...field2
                          }
                        )
                      }
                    )
                  ] })
                ] }, field.id);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  size: "sm",
                  color: "blue",
                  variant: "outlined",
                  onClick: () => appendReferencia({ nombre: "", telefono: "", relacion: "", direccion: "" }),
                  className: "mt-4",
                  children: "Agregar Referencia"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 5, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Documentos Requeridos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Marque los documentos que el propietario ha proporcionado." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "documentacion.ine",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "INE/IFE *" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "documentacion.curp",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "CURP *" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "documentacion.rfc",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "RFC *" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "documentacion.escrituras",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Escrituras *" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "documentacion.predial_pagado",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Predial Pagado *" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "documentacion.libre_gravamen",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Libre de Gravamen *" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "documentacion.comprobante_domicilio",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Comprobante de Domicilio *" })
                    ] })
                  }
                )
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 6, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información de Venta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Complete la información relacionada con la venta de la propiedad." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "venta.en_venta",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: field.value,
                          onChange: (e) => field.onChange(e.target.checked),
                          className: "mr-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Propiedad en Venta" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "venta.precio_venta",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "number",
                        label: "Precio de Venta",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "venta.comision_venta",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "number",
                        label: "Comisión de Venta (%)",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "venta.fecha_venta",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "date",
                        label: "Fecha de Venta",
                        ...field
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium mb-2", children: "Estatus de Venta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "text-sm", children: 'El estatus de venta se controla desde el tab "Estatus y Configuración". Cuando el estatus general sea "Disponible para venta", esta propiedad aparecerá automáticamente en la sección de Publicidad.' })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "venta.tipo_credito",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      react.Select,
                      {
                        label: "Tipo de Crédito",
                        value: field.value,
                        onChange: (value) => field.onChange(value),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Contado", children: "Contado" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Infonavit", children: "Infonavit" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Fovissste", children: "Fovissste" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Bancario", children: "Bancario" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Mixto", children: "Mixto" })
                        ]
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium mb-2 text-blue-gray-500", children: "Información del Comprador" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.comprador.nombre",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Nombre del Comprador",
                          ...field
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.comprador.telefono",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "tel",
                          label: "Teléfono del Comprador",
                          ...field
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.comprador.correo",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "email",
                          label: "Correo del Comprador",
                          ...field
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.comprador.direccion",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        react.Input,
                        {
                          type: "text",
                          label: "Dirección del Comprador",
                          ...field
                        }
                      )
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium mb-2 text-blue-gray-500", children: "Documentos Entregados" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.documentos_entregados.contrato",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: field.value,
                            onChange: (e) => field.onChange(e.target.checked),
                            className: "mr-2"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Contrato de Compra-Venta" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.documentos_entregados.identificacion",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: field.value,
                            onChange: (e) => field.onChange(e.target.checked),
                            className: "mr-2"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Identificación del Comprador" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Controller,
                    {
                      name: "venta.documentos_entregados.constancia_credito",
                      control,
                      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: field.value,
                            onChange: (e) => field.onChange(e.target.checked),
                            className: "mr-2"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Constancia de Crédito" })
                      ] })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Controller,
                {
                  name: "venta.observaciones",
                  control,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Textarea,
                    {
                      label: "Observaciones",
                      ...field
                    }
                  )
                }
              ) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabPanel, { value: 7, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Estatus y Configuración de la Captación" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "paragraph", color: "blue-gray", className: "mb-4", children: "Configure el estatus general de la captación y parámetros adicionales." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-3 rounded-lg mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "ℹ️ Información sobre Estatus Unificado:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", children: [
                  "• ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Estatus Principal:" }),
                  " Controla todo el flujo del proyecto desde un solo lugar",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "• ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "No hay duplicados:" }),
                  " Solo existe este campo de estatus para evitar confusión",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "• ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Disponible para venta:" }),
                  " Se activa automáticamente en Publicidad y Marketing",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "• ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Remodelacion:" }),
                  " Habilita gestión de presupuesto y materiales"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "captacion.estatus_actual",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      react.Select,
                      {
                        label: "Estatus Actual *",
                        value: field.value,
                        onChange: (value) => field.onChange(value),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Captación", children: "Captación" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "En trámite legal", children: "En trámite legal" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Remodelacion", children: "Remodelacion" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Disponible para venta", children: "Disponible para venta" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Vendida", children: "Vendida" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Cancelada", children: "Cancelada" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "captacion.presupuesto_estimado",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Input,
                      {
                        type: "number",
                        label: "Presupuesto Estimado (MXN)",
                        placeholder: "0.00",
                        step: "0.01",
                        min: "0",
                        ...field,
                        disabled: watch("captacion.estatus_actual") !== "Remodelacion"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "captacion.supervisor_id",
                    control,
                    render: ({ field }) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        react.Select,
                        {
                          label: "Supervisor Asignado",
                          value: field.value || "",
                          onChange: (value) => field.onChange(value),
                          disabled: watch("captacion.estatus_actual") !== "Remodelacion",
                          error: !!((_a2 = errors.captacion) == null ? void 0 : _a2.supervisor_id),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "", children: "Seleccionar supervisor" }),
                            supervisores.map((supervisor) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: supervisor._id, children: supervisor.name }, supervisor._id))
                          ]
                        }
                      );
                    }
                  }
                ),
                ((_S = errors.captacion) == null ? void 0 : _S.supervisor_id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.captacion.supervisor_id.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "captacion.tipo_captacion",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      react.Select,
                      {
                        label: "Tipo de Captación (Opcional)",
                        value: field.value,
                        onChange: (value) => field.onChange(value),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Abierta", children: "Abierta" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Cerrada", children: "Cerrada" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Exclusiva", children: "Exclusiva" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "captacion.observaciones",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      react.Textarea,
                      {
                        label: "Observaciones Generales (Opcional)",
                        placeholder: "Observaciones sobre el estatus y configuración...",
                        ...field
                      }
                    )
                  }
                )
              ] }),
              watch("captacion.estatus_actual") === "Remodelacion" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-green-50 border border-green-200 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "mb-2", children: "Configuración de Remodelación" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "mb-4", children: 'Al cambiar el estatus a "Remodelacion", se habilitará la gestión de presupuesto y materiales.' }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Presupuesto Estimado:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "font-bold", children: watch("captacion.presupuesto_estimado") ? `$${parseFloat(watch("captacion.presupuesto_estimado")).toLocaleString("es-MX", { minimumFractionDigits: 2 })}` : "Sin presupuesto" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Acciones Disponibles:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", children: [
                      "• Gestión de presupuesto",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "• Control de materiales",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "• Solicitudes de contratistas",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "• Reportes de gastos"
                    ] })
                  ] })
                ] })
              ] })
            ] }) })
          ] })
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mt-4", children: error }),
      successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "green", className: "mt-4", children: successMessage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            variant: "outlined",
            color: "blue-gray",
            onClick: () => navigate("/dashboard/captaciones"),
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            type: "submit",
            color: "blue",
            disabled: isLoading,
            children: isLoading ? "Guardando..." : "Guardar Cambios"
          }
        )
      ] })
    ] }) })
  ] });
}
function MisProyectos() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [captaciones, setCaptaciones] = reactExports.useState([]);
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [isAsesor, setIsAsesor] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [searchParams, setSearchParams] = reactExports.useState({
    limit: 10,
    sort: "-captacion.fecha"
    // Ordenar por fecha más reciente primero
  });
  const [refreshKey, setRefreshKey] = reactExports.useState(0);
  const statusColors = {
    "Captación": "blue",
    "En trámite legal": "purple",
    "Remodelacion": "amber",
    "En venta": "green",
    "Disponible para venta": "green",
    "Vendida": "gray",
    "Cancelada": "red"
  };
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      var _a;
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          const userRole = ((_a = data.user) == null ? void 0 : _a.role) || "";
          setIsAdmin(
            userRole.toLowerCase().includes("administrator") || userRole === "Admin" || userRole === "Superadministrator"
          );
          setIsAsesor(userRole === "Asesor");
        } else {
          navigate("/auth/sign-in");
        }
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        navigate("/auth/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  reactExports.useEffect(() => {
    if (!user)
      return;
    const fetchCaptaciones = async () => {
      var _a;
      setIsLoading(true);
      setError(null);
      try {
        let apiUrl = `${"https://lead-inmobiliaria.com"}/api/captaciones?page=${page}&limit=${searchParams.limit}&sort=${searchParams.sort}`;
        console.log("🔍 DEBUG - Usuario:", user ? `${user.name} (${user.role})` : "No user");
        console.log("🔍 DEBUG - URL de consulta:", apiUrl);
        if (searchTerm) {
          apiUrl += `&search=${encodeURIComponent(searchTerm)}`;
        }
        console.log("Consultando API:", apiUrl);
        const response = await fetch(apiUrl, {
          credentials: "include",
          headers: {
            "Accept": "application/json"
          }
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener captaciones: ${response.status}`);
        }
        const data = await response.json();
        if (!data.captaciones || data.captaciones.length === 0) {
          setCaptaciones([]);
          setTotalPages(0);
          return;
        }
        const captacionesProcesadas = data.captaciones.map((captacion, idx) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
          console.log(`
--- Procesando captación #${idx + 1} ---`);
          console.log("Raw captacion:", captacion);
          const direccionCompleta = ((_b = (_a2 = captacion.propiedad) == null ? void 0 : _a2.direccion) == null ? void 0 : _b.completa) || [
            (_d = (_c = captacion.propiedad) == null ? void 0 : _c.direccion) == null ? void 0 : _d.calle,
            (_f = (_e = captacion.propiedad) == null ? void 0 : _e.direccion) == null ? void 0 : _f.colonia,
            (_h = (_g = captacion.propiedad) == null ? void 0 : _g.direccion) == null ? void 0 : _h.ciudad,
            (_j = (_i = captacion.propiedad) == null ? void 0 : _i.direccion) == null ? void 0 : _j.estado
          ].filter(Boolean).join(", ");
          let asesorNombre = "No asignado";
          if ((_k = captacion.captacion) == null ? void 0 : _k.asesor) {
            if (typeof captacion.captacion.asesor === "object" && captacion.captacion.asesor.name) {
              asesorNombre = captacion.captacion.asesor.name;
            } else if (typeof captacion.captacion.asesor === "string") {
              if (user && user._id === captacion.captacion.asesor) {
                asesorNombre = `${user.prim_nom || ""} ${user.segun_nom || ""} ${user.apell_pa || ""} ${user.apell_ma || ""}`.trim() || `Usuario actual`;
              } else {
                try {
                  console.log("Asesor solo ID:", captacion.captacion.asesor);
                  fetch(`${"https://lead-inmobiliaria.com"}/api/users/${captacion.captacion.asesor}`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Accept": "application/json" }
                  }).then((response2) => response2.json()).then((userData) => {
                    if (userData) {
                      const nombreCompleto = `${userData.user.prim_nom || ""} ${userData.user.segun_nom || ""} ${userData.user.apell_pa || ""} ${userData.user.apell_ma || ""}`.trim();
                      if (nombreCompleto) {
                        setCaptaciones(
                          (prevCaptaciones) => prevCaptaciones.map(
                            (c) => c._id === captacion._id ? { ...c, captacion: { ...c.captacion, asesor: { ...c.captacion.asesor, nombre: nombreCompleto } } } : c
                          )
                        );
                      }
                    }
                  }).catch((err) => console.error("Error al obtener datos del asesor:", err));
                } catch (error2) {
                  console.error("Error al procesar datos del asesor:", error2);
                }
                asesorNombre = `Asesor ID: ${captacion.captacion.asesor.substring(0, 6)}`;
              }
            }
          }
          console.log("historial_estatus:", captacion.historial_estatus);
          if (Array.isArray(captacion.historial_estatus)) {
            captacion.historial_estatus.forEach((h, i) => {
              console.log(`  Historial #${i + 1}:`, h);
              if (h.usuario) {
                console.log(`    Usuario:`, h.usuario);
              }
            });
          }
          const obj = {
            _id: captacion._id || `temp-${Math.random()}`,
            propiedad: {
              tipo: ((_l = captacion.propiedad) == null ? void 0 : _l.tipo) || "Casa/Apartamento",
              direccion: {
                completa: direccionCompleta || "Sin dirección",
                ciudad: ((_n = (_m = captacion.propiedad) == null ? void 0 : _m.direccion) == null ? void 0 : _n.ciudad) || "No especificado",
                estado: ((_p = (_o = captacion.propiedad) == null ? void 0 : _o.direccion) == null ? void 0 : _p.estado) || ""
              }
            },
            propietario: {
              nombre: ((_q = captacion.propietario) == null ? void 0 : _q.nombre) || "No especificado",
              telefono: ((_r = captacion.propietario) == null ? void 0 : _r.telefono) || "---"
            },
            estatus_actual: captacion.estatus_actual || "Pendiente",
            captacion: {
              fecha: ((_s = captacion.captacion) == null ? void 0 : _s.fecha) || (/* @__PURE__ */ new Date()).toISOString(),
              asesor: {
                nombre: asesorNombre,
                id: typeof ((_t = captacion.captacion) == null ? void 0 : _t.asesor) === "string" ? captacion.captacion.asesor : null
              }
            },
            historial_estatus: captacion.historial_estatus || []
          };
          console.log("Objeto procesado para tabla:", obj);
          return obj;
        });
        console.log("captacionesProcesadas FINAL:", captacionesProcesadas);
        setCaptaciones(captacionesProcesadas);
        setTotalPages(((_a = data.paginacion) == null ? void 0 : _a.paginas) || 1);
      } catch (error2) {
        console.error("Error al obtener captaciones:", error2);
        setError(error2.message || "No se pudieron cargar las captaciones");
        setCaptaciones([{
          _id: "error12345",
          propiedad: {
            tipo: "Error de conexión",
            direccion: { ciudad: "Sin datos", estado: "disponibles" }
          },
          propietario: {
            nombre: "Error al cargar datos",
            telefono: "---"
          },
          estatus_actual: "Error",
          captacion: {
            fecha: (/* @__PURE__ */ new Date()).toISOString(),
            asesor: { nombre: "No disponible" }
          }
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaptaciones();
  }, [user, page, searchParams, searchTerm, refreshKey]);
  const refreshData = () => {
    setRefreshKey((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };
  const descargarPDF = async (captacion) => {
    try {
      if (!captacion || !captacion._id) {
        console.error("ID de captación no válido:", captacion);
        alert("Error: ID de captación no válido");
        return;
      }
      console.log("Descargando PDF de captación:", captacion._id);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/captaciones/download/${captacion._id}`, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error desconocido" }));
        throw new Error(errorData.message || `Error al descargar el PDF: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/pdf")) {
        throw new Error("La respuesta no es un PDF válido");
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `captacion_${captacion._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error2) {
      console.error("Error al descargar el PDF:", error2);
      alert(error2.message || "Error al descargar el PDF. Por favor intente nuevamente.");
    }
  };
  if (isLoading && !captaciones.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 flex flex-col gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { variant: "gradient", color: "blue", className: "mb-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Mis Proyectos de Captación" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "sm",
            className: "flex items-center gap-2",
            color: "white",
            variant: "outlined",
            onClick: refreshData,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-4 w-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0112.719-3.986" }) }),
              "Refrescar"
            ]
          }
        ),
        (isAdmin || isAsesor || (user == null ? void 0 : user.role) === "User") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "sm",
            className: "flex items-center gap-2",
            color: "white",
            onClick: () => navigate("/dashboard/captaciones/nueva"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon, { strokeWidth: 2, className: "h-4 w-4" }),
              "Nueva Captación"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "overflow-x-scroll px-0 pt-0 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Input,
        {
          label: "Buscar por propietario o dirección",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifyingGlassIcon$1, { className: "h-5 w-5" }),
          value: searchTerm,
          onChange: handleSearch
        }
      ) }) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mx-4 mt-4", children: error }),
      captaciones.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", className: "text-gray-600", children: "No hay proyectos disponibles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-gray-500 mt-2", children: isAdmin || isAsesor || (user == null ? void 0 : user.role) === "User" ? "¡Crea tu primera captación inmobiliaria!" : "No tienes proyectos asignados" }),
        (isAdmin || isAsesor || (user == null ? void 0 : user.role) === "User") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            className: "mt-4",
            color: "blue",
            onClick: () => navigate("/dashboard/captaciones/nueva"),
            children: "Crear Captación"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Propiedad", "Propietario", "Ubicación", "Última Actualización", "Estatus", "Fecha", "Acciones"].map((header) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "border-b border-blue-gray-50 py-3 px-5 text-left",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Typography,
                {
                  variant: "small",
                  className: "text-[11px] font-bold uppercase text-blue-gray-400",
                  children: header
                }
              )
            },
            header
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: captaciones.map(({ _id, propiedad, propietario, estatus_actual, captacion, historial_estatus }, index2) => {
            var _a, _b, _c;
            const isLast = index2 === captaciones.length - 1;
            const classes = isLast ? "py-3 px-5" : "py-3 px-5 border-b border-blue-gray-50";
            const propiedadTipo = (propiedad == null ? void 0 : propiedad.tipo) || "Sin especificar";
            const propietarioNombre = (propietario == null ? void 0 : propietario.nombre) || "Sin propietario";
            const propietarioTelefono = (propietario == null ? void 0 : propietario.telefono) || "---";
            const ciudad = ((_a = propiedad == null ? void 0 : propiedad.direccion) == null ? void 0 : _a.ciudad) || "N/A";
            const estado = ((_b = propiedad == null ? void 0 : propiedad.direccion) == null ? void 0 : _b.estado) || "";
            ((_c = captacion == null ? void 0 : captacion.asesor) == null ? void 0 : _c.nombre) || "No asignado";
            let fechaFormateada = "Fecha desconocida";
            try {
              if (captacion == null ? void 0 : captacion.fecha) {
                fechaFormateada = new Date(captacion.fecha).toLocaleDateString();
              }
            } catch (e) {
              console.error("Error al formatear fecha:", e);
            }
            let ultimaActualizacionNombre = "Nunca editado";
            let ultimaActualizacionFecha = "";
            const historial = historial_estatus || [];
            if (historial.length > 0) {
              const ultimo = historial[historial.length - 1];
              if (ultimo.usuario) {
                ultimaActualizacionNombre = ultimo.usuario.name || ultimo.usuario.nombre || [
                  ultimo.usuario.prim_nom,
                  ultimo.usuario.segun_nom,
                  ultimo.usuario.apell_pa,
                  ultimo.usuario.apell_ma
                ].filter(Boolean).join(" ") || ultimo.usuario.email || "Sin nombre";
                if (ultimo.fecha) {
                  try {
                    ultimaActualizacionFecha = new Date(ultimo.fecha).toLocaleDateString();
                  } catch {
                  }
                }
              }
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-blue-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-bold text-blue-gray-800", children: propiedadTipo.substring(0, 2).toUpperCase() }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-semibold", children: propiedad.direccion.completa || "Sin dirección" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-normal text-blue-gray-500", children: propiedadTipo })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: classes, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-semibold text-blue-gray-600", children: propietarioNombre }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-normal text-blue-gray-500", children: propietarioTelefono })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: classes, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-semibold text-blue-gray-600", children: ciudad }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-normal text-blue-gray-500", children: estado })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: classes, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-semibold text-blue-gray-600", children: ultimaActualizacionNombre }),
                ultimaActualizacionFecha && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs text-blue-gray-400", children: ultimaActualizacionFecha })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Chip,
                {
                  variant: "ghost",
                  size: "sm",
                  value: estatus_actual || "Desconocido",
                  color: statusColors[estatus_actual] || "blue-gray"
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "text-xs font-semibold text-blue-gray-600", children: fechaFormateada }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: classes, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Ver Detalles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => navigate(`/dashboard/captaciones/${_id}/detalle`), children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon$1, { className: "h-5 w-5" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Descargar PDF", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.IconButton,
                  {
                    variant: "text",
                    color: "blue-gray",
                    onClick: () => descargarPDF({ _id }),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownTrayIcon$1, { className: "h-5 w-5" })
                  }
                ) }),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", onClick: () => navigate(`/dashboard/captaciones/editar/${_id}`), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon, { className: "h-5 w-5" }) }) }),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Tooltip, { content: "Eliminar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.IconButton,
                  {
                    variant: "text",
                    color: "red",
                    onClick: async () => {
                      if (window.confirm("¿Estás seguro de que deseas eliminar esta captación? Esta acción no se puede deshacer.")) {
                        try {
                          setIsLoading(true);
                          setError(null);
                          await fetchAPI(`/api/captaciones/${_id}`, "DELETE");
                          setCaptaciones((prev) => prev.filter((c) => c._id !== _id));
                        } catch (err) {
                          setError("Error al eliminar la captación");
                        } finally {
                          setIsLoading(false);
                        }
                      }
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
                  }
                ) })
              ] }) })
            ] }, _id || index2);
          }) })
        ] }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 mt-6 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "text",
              color: "blue-gray",
              disabled: page === 1,
              onClick: handlePrevPage,
              children: "Anterior"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: [...Array(totalPages)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.IconButton,
            {
              variant: page === i + 1 ? "filled" : "text",
              color: "blue-gray",
              size: "sm",
              onClick: () => setPage(i + 1),
              children: i + 1
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "text",
              color: "blue-gray",
              disabled: page === totalPages,
              onClick: handleNextPage,
              children: "Siguiente"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function DetalleCaptacion() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
  const { id } = useParams();
  const navigate = useNavigate();
  const [captacion, setCaptacion] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("general");
  reactExports.useEffect(() => {
    cargarCaptacion();
  }, [id]);
  const cargarCaptacion = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await captacionesAPI.getById(id);
      setCaptacion(data);
    } catch (err) {
      console.error("Error al cargar captación:", err);
      setError("Error al cargar los datos de la captación");
    } finally {
      setLoading(false);
    }
  };
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  const mostrarValor = (valor) => {
    if (!valor)
      return "N/A";
    if (typeof valor === "object" && valor !== null) {
      if (valor.calle && valor.numero) {
        const direccion = `${valor.calle} ${valor.numero}`;
        const colonia = valor.colonia ? `, ${valor.colonia}` : "";
        const ciudad = valor.ciudad ? `, ${valor.ciudad}` : "";
        const estado = valor.estado ? `, ${valor.estado}` : "";
        const codigoPostal = valor.codigo_postal ? `, ${valor.codigo_postal}` : "";
        return `${direccion}${colonia}${ciudad}${estado}${codigoPostal}`.replace(/^,\s*/, "").replace(/,\s*,/g, ",");
      }
      if (valor.nombre) {
        return valor.nombre;
      }
      if (Array.isArray(valor)) {
        return valor.length > 0 ? valor.join(", ") : "N/A";
      }
      return JSON.stringify(valor);
    }
    return valor.toString();
  };
  const getStatusColor = (status) => {
    const colors = {
      "Captación": "blue",
      "En trámite legal": "amber",
      "Remodelacion": "green",
      "En venta": "purple",
      "Vendida": "green",
      "Cancelada": "red"
    };
    return colors[status] || "gray";
  };
  const formatCurrency = (amount) => {
    if (!amount || amount === 0)
      return "$0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  };
  const formatDate = (dateString) => {
    if (!dateString)
      return "N/A";
    return new Date(dateString).toLocaleDateString("es-MX");
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg", className: "mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", children: "Cargando captación..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationTriangleIcon$1, { className: "h-5 w-5" }),
      error
    ] }) });
  }
  if (!captacion) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", children: "Captación no encontrada" }) });
  }
  const TABS2 = [
    {
      label: "General",
      value: "general",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-5 w-5" })
    },
    {
      label: "Propietario",
      value: "propietario",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-5 w-5" })
    },
    {
      label: "Propiedad",
      value: "propiedad",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-5 w-5" })
    },
    {
      label: "Financiero",
      value: "financiero",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-5 w-5" })
    },
    {
      label: "Laboral",
      value: "laboral",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BriefcaseIcon$1, { className: "h-5 w-5" })
    },
    {
      label: "Referencias",
      value: "referencias",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserGroupIcon, { className: "h-5 w-5" })
    },
    {
      label: "Documentos",
      value: "documentos",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTextIcon, { className: "h-5 w-5" })
    },
    {
      label: "Adeudos",
      value: "adeudos",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentListIcon, { className: "h-5 w-5" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 mb-8 flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-8 w-8 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "white", children: "Detalle de Captación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "white", className: "mt-1", children: [
            ((_a = captacion.propiedad) == null ? void 0 : _a.tipo) || "Propiedad",
            " - ",
            mostrarValor((_b = captacion.propiedad) == null ? void 0 : _b.direccion)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            variant: "outlined",
            color: "white",
            className: "flex items-center gap-2",
            onClick: () => navigate(`/dashboard/captaciones/editar/${id}`),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-5 w-5" }),
              "Editar"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            variant: "outlined",
            color: "white",
            className: "flex items-center gap-2",
            onClick: () => navigate("/dashboard/captaciones"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon$1, { className: "h-4 w-4" }),
              "Volver"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Estatus:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Chip,
          {
            value: captacion.estatus_actual,
            color: getStatusColor(captacion.estatus_actual),
            size: "sm",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Fecha de Captación:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatDate(captacion.fecha_captacion) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Captador:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_c = captacion.captador) == null ? void 0 : _c.nombre) || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Propietario:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_d = captacion.propietario) == null ? void 0 : _d.nombre) || "N/A" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { value: activeTab, className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabsHeader, { className: "mb-6 flex flex-wrap md:flex-nowrap h-auto md:h-12 py-2 gap-1 bg-blue-gray-50 overflow-x-auto md:overflow-x-auto hide-scrollbar", children: TABS2.map(({ label, value, icon: icon2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Tab,
        {
          value,
          onClick: () => handleTabChange(value),
          className: `py-2 px-3 whitespace-nowrap rounded-md transition-all flex items-center gap-2 ${activeTab === value ? "bg-white shadow-sm font-medium" : ""}`,
          children: [
            icon2,
            label
          ]
        },
        value
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TabsBody, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "general", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información General de la Captación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "ID de Captación:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1 font-mono", children: captacion._id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Fecha de Creación:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatDate(captacion.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Última Actualización:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatDate(captacion.updatedAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Estatus Actual:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Chip,
                {
                  value: captacion.estatus_actual,
                  color: getStatusColor(captacion.estatus_actual),
                  size: "sm",
                  className: "mt-1"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "propietario", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-6 w-6" }),
            "Información del Propietario"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Nombre Completo:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_e = captacion.propietario) == null ? void 0 : _e.nombre) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Email:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_f = captacion.propietario) == null ? void 0 : _f.email) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Teléfono:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_g = captacion.propietario) == null ? void 0 : _g.telefono) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "CURP:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_h = captacion.propietario) == null ? void 0 : _h.curp) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "RFC:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_i = captacion.propietario) == null ? void 0 : _i.rfc) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Fecha de Nacimiento:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatDate((_j = captacion.propietario) == null ? void 0 : _j.fecha_nacimiento) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "propiedad", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-6 w-6" }),
            "Información de la Propiedad"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Tipo de Propiedad:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_k = captacion.propiedad) == null ? void 0 : _k.tipo) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Dirección:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_l = captacion.propiedad) == null ? void 0 : _l.direccion) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Colonia:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_m = captacion.propiedad) == null ? void 0 : _m.colonia) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Ciudad:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_n = captacion.propiedad) == null ? void 0 : _n.ciudad) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Estado:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_o = captacion.propiedad) == null ? void 0 : _o.estado) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Código Postal:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_p = captacion.propiedad) == null ? void 0 : _p.codigo_postal) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "financiero", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-6 w-6" }),
            "Información Financiera"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Precio de Venta:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1 font-bold text-green-600", children: formatCurrency(captacion.precio_venta) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Precio de Renta:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1 font-bold text-blue-600", children: formatCurrency(captacion.precio_renta) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Enganche:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatCurrency(captacion.enganche) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Plazo:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: captacion.plazo ? `${captacion.plazo} años` : "N/A" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "laboral", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BriefcaseIcon$1, { className: "h-6 w-6" }),
            "Datos Laborales del Propietario"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Empresa:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_q = captacion.datos_laborales) == null ? void 0 : _q.empresa) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Puesto:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_r = captacion.datos_laborales) == null ? void 0 : _r.puesto) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Área:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_s = captacion.datos_laborales) == null ? void 0 : _s.area) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Turno:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: mostrarValor((_t = captacion.datos_laborales) == null ? void 0 : _t.turno) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Antigüedad:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { className: "mt-1", children: [
                mostrarValor((_u = captacion.datos_laborales) == null ? void 0 : _u.antiguedad),
                " años"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Ingresos Mensuales:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatCurrency((_v = captacion.datos_laborales) == null ? void 0 : _v.ingresos_mensuales) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "referencias", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserGroupIcon, { className: "h-6 w-6" }),
            "Referencias Personales"
          ] }),
          captacion.referencias_personales && captacion.referencias_personales.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: captacion.referencias_personales.map((ref, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Avatar,
                {
                  src: ref.foto,
                  alt: ref.nombre,
                  size: "sm",
                  className: "border-2 border-white shadow-lg shadow-blue-gray-500/40"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: ref.nombre }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: ref.parentesco })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon$1, { className: "h-4 w-4 text-blue-gray-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: ref.telefono || "N/A" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EnvelopeIcon$1, { className: "h-4 w-4 text-blue-gray-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: ref.email || "N/A" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPinIcon$1, { className: "h-4 w-4 text-blue-gray-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: mostrarValor(ref.direccion) })
              ] })
            ] })
          ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 bg-blue-gray-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: "No hay referencias registradas." }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "documentos", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTextIcon, { className: "h-6 w-6" }),
            "Documentos del Propietario"
          ] }),
          captacion.documentos && captacion.documentos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: captacion.documentos.map((doc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: doc.tipo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: doc.descripcion })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Badge, { color: "green", className: "ml-2", children: doc.estatus })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { size: "sm", color: "blue", variant: "text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { size: "sm", color: "green", variant: "text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownTrayIcon, { className: "h-4 w-4" }) })
            ] })
          ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 bg-blue-gray-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: "No hay documentos registrados." }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabPanel, { value: "adeudos", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentListIcon, { className: "h-6 w-6" }),
            "Adeudos y Deudas"
          ] }),
          captacion.adeudos && captacion.adeudos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: captacion.adeudos.map((adeudo, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: adeudo.tipo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Badge, { color: "red", className: "ml-2", children: formatCurrency(adeudo.monto) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "mb-2", children: adeudo.descripcion }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Vencimiento: ",
                formatDate(adeudo.fecha_vencimiento)
              ] })
            ] })
          ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 bg-blue-gray-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: "No hay adeudos registrados." }) })
        ] }) })
      ] })
    ] }) }) })
  ] });
}
axios.defaults.baseURL = "https://lead-inmobiliaria.com";
axios.defaults.withCredentials = true;
const RemodelacionPage = () => {
  var _a, _b, _c, _d;
  const navigate = useNavigate();
  const [proyectos, setProyectos] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const formatearDireccion = (direccion) => {
    if (!direccion || typeof direccion !== "object")
      return "N/A";
    const { calle, numero, colonia, ciudad } = direccion;
    return `${calle || ""} ${numero || ""}, ${colonia || ""}, ${ciudad || ""}`.replace(/,\s*,/g, ",").replace(/^,\s*|,\s*$/g, "") || "N/A";
  };
  const [filtros, setFiltros] = reactExports.useState({
    busqueda: "",
    supervisor: "todos",
    presupuesto: "todos"
  });
  const [contratistas, setContratistas] = reactExports.useState([]);
  const [showAsignarModal, setShowAsignarModal] = reactExports.useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = reactExports.useState(null);
  const [contratistaSeleccionado, setContratistaSeleccionado] = reactExports.useState("");
  const [estadisticas, setEstadisticas] = reactExports.useState({
    total: 0,
    conPresupuesto: 0,
    sinPresupuesto: 0,
    gastosTotales: 0
  });
  const [showSolicitudMaterialModal, setShowSolicitudMaterialModal] = reactExports.useState(false);
  const [showRequerimientosModal, setShowRequerimientosModal] = reactExports.useState(false);
  const [solicitudMaterial, setSolicitudMaterial] = reactExports.useState({
    material: "",
    cantidad: "",
    descripcion: "",
    urgencia: "Media"
  });
  const [requerimientos, setRequerimientos] = reactExports.useState([]);
  const [costosTemporales, setCostosTemporales] = reactExports.useState({});
  const [guardandoCostos, setGuardandoCostos] = reactExports.useState(false);
  const [showCostosModal, setShowCostosModal] = reactExports.useState(false);
  const [listaParaCostos, setListaParaCostos] = reactExports.useState(null);
  const [costosMateriales, setCostosMateriales] = reactExports.useState([]);
  const [totalCalculado, setTotalCalculado] = reactExports.useState(0);
  const [showListasCompraModal, setShowListasCompraModal] = reactExports.useState(false);
  const [listasCompra, setListasCompra] = reactExports.useState([]);
  const [showDetallesListaModal, setShowDetallesListaModal] = reactExports.useState(false);
  const [listaSeleccionada, setListaSeleccionada] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          navigate("/auth/sign-in");
        }
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        navigate("/auth/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  reactExports.useEffect(() => {
    if (user) {
      cargarProyectosRemodelacion();
    }
  }, [user]);
  reactExports.useEffect(() => {
    if (user && (user.role === "supervisor" || user.role === "Supervisor")) {
      cargarContratistas();
    }
  }, [user]);
  const cargarContratistas = async () => {
    try {
      const response = await axios.get("/api/users", {
        params: { role: "contratista" }
      });
      if (response.data && response.data.success && Array.isArray(response.data.users)) {
        setContratistas(response.data.users);
      }
    } catch (error2) {
      console.error("Error al cargar contratistas:", error2);
    }
  };
  const cargarProyectosRemodelacion = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Cargando proyectos de remodelación...");
      const params = {
        estatus: "Remodelacion",
        page: 1,
        limit: 100
      };
      console.log("🔍 RemodelacionPage - Usuario actual:", user ? `${user.name} (${user.role})` : "No user");
      console.log("🔍 RemodelacionPage - Parámetros:", params);
      const response = await axios.get("/api/captaciones", {
        params,
        withCredentials: true
      });
      console.log("Respuesta del servidor:", response.data);
      let captaciones = [];
      if (Array.isArray(response.data)) {
        captaciones = response.data;
      } else if (response.data && Array.isArray(response.data.captaciones)) {
        captaciones = response.data.captaciones;
      } else {
        console.error("Respuesta inválida del servidor:", response.data);
        setError("Error al cargar los proyectos - formato de respuesta inválido");
        return;
      }
      const proyectosRemodelacion = captaciones.filter(
        (proyecto) => proyecto.estatus_actual === "Remodelacion"
      );
      console.log("Total captaciones recibidas:", captaciones.length);
      console.log("Proyectos en Remodelación encontrados:", proyectosRemodelacion.length);
      console.log("Proyectos filtrados:", proyectosRemodelacion);
      setProyectos(proyectosRemodelacion);
      calcularEstadisticas(proyectosRemodelacion);
    } catch (error2) {
      console.error("Error al cargar proyectos de remodelación:", error2);
      setError(`Error al cargar los proyectos de remodelación: ${error2.message}`);
    } finally {
      setLoading(false);
    }
  };
  const calcularEstadisticas = (proyectos2) => {
    const total = proyectos2.length;
    const conPresupuesto = proyectos2.filter((p) => {
      var _a2;
      return (_a2 = p.remodelacion) == null ? void 0 : _a2.presupuesto_estimado;
    }).length;
    const sinPresupuesto = total - conPresupuesto;
    const gastosTotales = proyectos2.reduce((total2, proyecto) => {
      var _a2;
      const gastos = ((_a2 = proyecto.remodelacion) == null ? void 0 : _a2.gastos) || [];
      return total2 + gastos.reduce((sum, gasto) => sum + (gasto.costo || 0), 0);
    }, 0);
    setEstadisticas({
      total,
      conPresupuesto,
      sinPresupuesto,
      gastosTotales
    });
  };
  const handleFiltroChange = (name, value) => {
    setFiltros((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const aplicarFiltros = () => {
  };
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      supervisor: "todos",
      presupuesto: "todos"
    });
  };
  const abrirModalAsignar = (proyecto) => {
    var _a2, _b2;
    setProyectoSeleccionado(proyecto);
    setContratistaSeleccionado(((_b2 = (_a2 = proyecto.remodelacion) == null ? void 0 : _a2.contratista) == null ? void 0 : _b2._id) || "");
    setShowAsignarModal(true);
  };
  const cerrarModalAsignar = () => {
    setShowAsignarModal(false);
    setProyectoSeleccionado(null);
    setContratistaSeleccionado("");
  };
  const asignarContratista = async () => {
    var _a2, _b2;
    try {
      setLoading(true);
      setError(null);
      console.log("🔧 Asignando contratista:", {
        proyecto: proyectoSeleccionado._id,
        contratista: contratistaSeleccionado
      });
      const requestData = {
        captacion: {
          contratista_id: contratistaSeleccionado || null
          // Permite desasignar si está vacío
        }
      };
      console.log("📤 Datos a enviar:", JSON.stringify(requestData, null, 2));
      const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}`, requestData);
      console.log("📡 Respuesta del servidor:", response.data);
      if (response.data.success || response.data.captacion) {
        const contratistaData = contratistaSeleccionado ? contratistas.find((c) => c._id === contratistaSeleccionado) : null;
        setProyectos(
          (prevProyectos) => prevProyectos.map(
            (p) => p._id === proyectoSeleccionado._id ? {
              ...p,
              remodelacion: {
                ...p.remodelacion,
                contratista: contratistaData
              }
            } : p
          )
        );
        console.log("✅ Contratista asignado exitosamente");
        cerrarModalAsignar();
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error2) {
      console.error("❌ Error al asignar contratista:", error2);
      const mensajeError = ((_b2 = (_a2 = error2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.mensaje) || error2.message || "Error al asignar contratista";
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };
  const abrirModalSolicitudMaterial = (proyecto) => {
    setProyectoSeleccionado(proyecto);
    setSolicitudMaterial({
      material: "",
      cantidad: "",
      descripcion: "",
      urgencia: "Media"
    });
    setShowSolicitudMaterialModal(true);
  };
  const cerrarModalSolicitudMaterial = () => {
    setShowSolicitudMaterialModal(false);
    setProyectoSeleccionado(null);
    setSolicitudMaterial({
      material: "",
      cantidad: "",
      descripcion: "",
      urgencia: "Media"
    });
  };
  const enviarSolicitudMaterial = async () => {
    var _a2, _b2;
    try {
      setLoading(true);
      setError(null);
      console.log("📦 Enviando solicitud de material:", {
        proyecto: proyectoSeleccionado._id,
        solicitud: solicitudMaterial
      });
      const requestData = {
        tipo: solicitudMaterial.material.trim(),
        cantidad: parseInt(solicitudMaterial.cantidad) || 1,
        notas: solicitudMaterial.descripcion.trim() + (solicitudMaterial.urgencia ? ` [Urgencia: ${solicitudMaterial.urgencia}]` : "")
      };
      const response = await axios.post(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/solicitar-material`, requestData);
      if (response.data.success) {
        console.log("✅ Solicitud de material enviada exitosamente");
        cerrarModalSolicitudMaterial();
        cargarProyectosRemodelacion();
      } else {
        throw new Error(response.data.message || "Error al enviar solicitud");
      }
    } catch (error2) {
      console.error("❌ Error al enviar solicitud de material:", error2);
      const mensajeError = ((_b2 = (_a2 = error2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || error2.message || "Error al enviar solicitud de material";
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };
  const verRequerimientos = async (proyecto) => {
    try {
      console.log("🚀 INICIANDO verRequerimientos para proyecto:", proyecto._id);
      setProyectoSeleccionado(proyecto);
      setLoading(true);
      console.log("📋 Cargando listas de compra del proyecto:", proyecto._id);
      const response = await axios.get(`/api/lista-compra/proyecto/${proyecto._id}`);
      console.log("📡 Respuesta del servidor:", response.data);
      if (response.data.success) {
        console.log("✅ Listas de compra recibidas:", response.data.data);
        console.log("🔍 Verificando estados de las listas:");
        response.data.data.forEach((lista2, index2) => {
          console.log(`  Lista ${index2 + 1}: ${lista2.titulo} - Estado: ${lista2.estatus_general}`);
        });
        setRequerimientos(response.data.data || []);
        setShowRequerimientosModal(true);
      } else {
        throw new Error("Error al cargar listas de compra");
      }
    } catch (error2) {
      console.error("❌ Error al cargar listas de compra:", error2);
      setError("Error al cargar listas de compra del proyecto");
    } finally {
      setLoading(false);
    }
  };
  const cerrarModalRequerimientos = () => {
    setShowRequerimientosModal(false);
    setProyectoSeleccionado(null);
    setRequerimientos([]);
    setCostosTemporales({});
  };
  const abrirModalCostos = (lista2) => {
    setListaParaCostos(lista2);
    const costosIniciales = lista2.materiales.map((material) => ({
      index: lista2.materiales.indexOf(material),
      costo_final: material.costo_final || 0,
      notas: material.notas_supervisor || ""
    }));
    setCostosMateriales(costosIniciales);
    calcularTotal(costosIniciales);
    setShowCostosModal(true);
  };
  const cerrarModalCostos = () => {
    setShowCostosModal(false);
    setListaParaCostos(null);
    setCostosMateriales([]);
    setTotalCalculado(0);
  };
  const actualizarCostoMaterial = (index2, campo, valor) => {
    const nuevosCostos = [...costosMateriales];
    nuevosCostos[index2] = {
      ...nuevosCostos[index2],
      [campo]: campo === "costo_final" ? parseFloat(valor) || 0 : valor
    };
    setCostosMateriales(nuevosCostos);
    calcularTotal(nuevosCostos);
  };
  const calcularTotal = (costos) => {
    const total = costos.reduce((sum, costo) => sum + (costo.costo_final || 0), 0);
    setTotalCalculado(total);
  };
  const guardarCostosYContinuar = async () => {
    var _a2, _b2;
    try {
      setLoading(true);
      const costosFaltantes = costosMateriales.filter((costo) => !costo.costo_final || costo.costo_final <= 0);
      if (costosFaltantes.length > 0) {
        setError("Debe ingresar un costo válido para todos los materiales");
        return;
      }
      const response = await axios.post(`/api/lista-compra/${listaParaCostos._id}/ingresar-costos`, {
        materiales_costos: costosMateriales
      });
      if (response.data.success) {
        console.log("✅ Costos guardados exitosamente");
        console.log("📊 Respuesta del servidor:", response.data);
        setError("");
        if (proyectoSeleccionado) {
          await verRequerimientos(proyectoSeleccionado);
        }
        cerrarModalCostos();
      } else {
        throw new Error(response.data.message || "Error al guardar costos");
      }
    } catch (error2) {
      console.error("❌ Error al guardar costos:", error2);
      setError(((_b2 = (_a2 = error2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || error2.message || "Error al guardar costos");
    } finally {
      setLoading(false);
    }
  };
  const aprobarListaConCostos = async (listaId) => {
    var _a2, _b2;
    try {
      setLoading(true);
      const response = await axios.post(`/api/lista-compra/${listaId}/revisar`, {
        accion: "aprobar",
        comentarios: "Lista de compra aprobada por supervisor con costos verificados"
      });
      if (response.data.success) {
        console.log("✅ Lista de compra aprobada exitosamente");
        if (proyectoSeleccionado) {
          await verRequerimientos(proyectoSeleccionado);
        }
      } else {
        throw new Error(response.data.message || "Error al aprobar lista de compra");
      }
    } catch (error2) {
      console.error("❌ Error al aprobar lista de compra:", error2);
      setError(((_b2 = (_a2 = error2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || error2.message || "Error al aprobar lista de compra");
    } finally {
      setLoading(false);
    }
  };
  const rechazarListaCompra = async (listaId) => {
    var _a2, _b2;
    try {
      setLoading(true);
      const motivo = prompt("¿Motivo del rechazo?");
      if (!motivo) {
        setLoading(false);
        return;
      }
      const response = await axios.post(`/api/lista-compra/${listaId}/revisar`, {
        accion: "rechazar",
        comentarios: motivo
      });
      if (response.data.success) {
        console.log("✅ Lista de compra rechazada exitosamente");
        if (proyectoSeleccionado) {
          await verRequerimientos(proyectoSeleccionado);
        }
      } else {
        throw new Error(response.data.message || "Error al rechazar lista de compra");
      }
    } catch (error2) {
      console.error("❌ Error al rechazar lista de compra:", error2);
      setError(((_b2 = (_a2 = error2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || error2.message || "Error al rechazar lista de compra");
    } finally {
      setLoading(false);
    }
  };
  const verListasCompraAdmin = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📋 Cargando listas de compra para administración...");
      const response = await axios.get("/api/lista-compra/admin/todas");
      console.log("📡 Respuesta del servidor:", response.data);
      if (response.data.success) {
        setListasCompra(response.data.data || []);
        setShowListasCompraModal(true);
        console.log("✅ Listas de compra cargadas:", response.data.data.length);
      } else {
        throw new Error("Error al cargar listas de compra");
      }
    } catch (error2) {
      console.error("❌ Error al cargar listas de compra:", error2);
      setError(`Error al cargar las listas de compra: ${error2.message}`);
    } finally {
      setLoading(false);
    }
  };
  const abrirModalDetallesLista = (lista2) => {
    setListaSeleccionada(lista2);
    setShowDetallesListaModal(true);
  };
  const cerrarModalDetallesLista = () => {
    setShowDetallesListaModal(false);
    setListaSeleccionada(null);
  };
  const cerrarModalListasCompra = () => {
    setShowListasCompraModal(false);
    setListasCompra([]);
  };
  const imprimirOrdenCompra = (lista2) => {
    console.log("🖨️ Imprimiendo orden de compra para:", lista2._id);
    alert("Funcionalidad de impresión será implementada próximamente");
  };
  const getProyectosFiltrados = () => {
    let filtrados = [...proyectos];
    if (filtros.busqueda) {
      filtrados = filtrados.filter(
        (proyecto) => {
          var _a2, _b2, _c2, _d2, _e, _f;
          return ((_b2 = (_a2 = proyecto.propietario) == null ? void 0 : _a2.nombre) == null ? void 0 : _b2.toLowerCase().includes(filtros.busqueda.toLowerCase())) || ((_d2 = (_c2 = proyecto.propiedad) == null ? void 0 : _c2.direccion) == null ? void 0 : _d2.toLowerCase().includes(filtros.busqueda.toLowerCase())) || ((_f = (_e = proyecto.propiedad) == null ? void 0 : _e.tipo) == null ? void 0 : _f.toLowerCase().includes(filtros.busqueda.toLowerCase()));
        }
      );
    }
    if (filtros.supervisor !== "todos") {
      filtrados = filtrados.filter(
        (proyecto) => {
          var _a2;
          return ((_a2 = proyecto.remodelacion) == null ? void 0 : _a2.supervisor) === filtros.supervisor;
        }
      );
    }
    if (filtros.presupuesto === "con") {
      filtrados = filtrados.filter(
        (proyecto) => {
          var _a2;
          return (_a2 = proyecto.remodelacion) == null ? void 0 : _a2.presupuesto_estimado;
        }
      );
    } else if (filtros.presupuesto === "sin") {
      filtrados = filtrados.filter(
        (proyecto) => {
          var _a2;
          return !((_a2 = proyecto.remodelacion) == null ? void 0 : _a2.presupuesto_estimado);
        }
      );
    }
    return filtrados;
  };
  const formatCurrency = (amount) => {
    if (!amount || amount === 0)
      return "$0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  };
  const formatDate = (dateString) => {
    if (!dateString)
      return "N/A";
    return new Date(dateString).toLocaleDateString("es-MX");
  };
  const getStatusColor = (status) => {
    const colors = {
      "Remodelacion": "blue",
      "En trámite legal": "amber",
      "En venta": "green",
      "Vendida": "green",
      "Cancelada": "red"
    };
    return colors[status] || "gray";
  };
  const getListaCompraStatusColor = (status) => {
    const colors = {
      "Aprobada": "green",
      "Rechazada": "red",
      "En revisión": "blue",
      "Enviada": "orange",
      "Borrador": "gray",
      "En compra": "purple",
      "Completada": "purple"
    };
    return colors[status] || "gray";
  };
  const getPresupuestoColor = (proyecto) => {
    var _a2, _b2, _c2;
    if (!((_a2 = proyecto.remodelacion) == null ? void 0 : _a2.presupuesto_estimado))
      return "red";
    const presupuesto = proyecto.remodelacion.presupuesto_estimado;
    const gastos = ((_c2 = (_b2 = proyecto.remodelacion) == null ? void 0 : _b2.gastos) == null ? void 0 : _c2.reduce((sum, gasto) => sum + (gasto.costo || 0), 0)) || 0;
    const porcentaje = gastos / presupuesto * 100;
    if (porcentaje > 90)
      return "red";
    if (porcentaje > 75)
      return "orange";
    if (porcentaje > 50)
      return "amber";
    return "green";
  };
  const proyectosFiltrados = getProyectosFiltrados();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 mb-8 flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-8 w-8 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "white", children: "Proyectos en Remodelación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "mt-1", children: "Gestión y seguimiento de proyectos en proceso de remodelación" })
        ] })
      ] }),
      user && !["supervisor", "contratista"].includes(user.role) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-4 md:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          variant: "outlined",
          color: "white",
          className: "flex items-center gap-2",
          onClick: () => navigate("/dashboard/captaciones"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-5 w-5" }),
            "Ver Captaciones"
          ]
        }
      ) })
    ] }) }) }),
    user && user.role !== "contratista" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 lg:mx-4 grid grid-cols-1 md:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-1", children: "Total Proyectos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "blue", className: "font-bold", children: estadisticas.total })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-8 w-8 text-blue-500" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-1", children: "Con Presupuesto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "green", className: "font-bold", children: estadisticas.conPresupuesto })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-8 w-8 text-green-500" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-1", children: "Sin Presupuesto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "red", className: "font-bold", children: estadisticas.sinPresupuesto })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationCircleIcon, { className: "h-8 w-8 text-red-500" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-1", children: "Gastos Totales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "purple", className: "font-bold", children: formatCurrency(estadisticas.gastosTotales) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-8 w-8 text-purple-500" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Filtros de Búsqueda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              color: "blue",
              size: "sm",
              onClick: aplicarFiltros,
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelIcon, { className: "h-4 w-4" }),
                "Aplicar"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              color: "gray",
              size: "sm",
              variant: "outlined",
              onClick: limpiarFiltros,
              children: "Limpiar"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            type: "text",
            label: "Buscar por nombre, dirección o tipo",
            value: filtros.busqueda,
            onChange: (e) => handleFiltroChange("busqueda", e.target.value),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Supervisor",
            value: filtros.supervisor,
            onChange: (value) => handleFiltroChange("supervisor", value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "todos", children: "Todos los supervisores" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "sin_asignar", children: "Sin supervisor asignado" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Presupuesto",
            value: filtros.presupuesto,
            onChange: (value) => handleFiltroChange("presupuesto", value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "todos", children: "Todos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "con", children: "Con presupuesto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "sin", children: "Sin presupuesto" })
            ]
          }
        )
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationCircleIcon, { className: "h-5 w-5" }),
      error
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "mx-3 lg:mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "green", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h5", color: "white", children: [
          "Proyectos en Remodelación (",
          proyectosFiltrados.length,
          ")"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) }) : proyectosFiltrados.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-16 w-16 text-gray-300 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", className: "mb-2", children: "No hay proyectos en remodelación" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: filtros.busqueda || filtros.supervisor !== "todos" || filtros.presupuesto !== "todos" ? "Ajusta los filtros para ver más resultados" : 'Los proyectos aparecerán aquí cuando cambien a estatus "Remodelacion"' })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Propiedad" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Propietario" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Supervisor" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Contratista" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Presupuesto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Gastos" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Estado" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Acciones" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: proyectosFiltrados.map((proyecto) => {
          var _a2, _b2, _c2, _d2, _e, _f, _g, _h;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: ((_a2 = proyecto.propiedad) == null ? void 0 : _a2.tipo) || "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: formatearDireccion((_b2 = proyecto.propiedad) == null ? void 0 : _b2.direccion) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: ((_c2 = proyecto.propietario) == null ? void 0 : _c2.nombre) || "N/A" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4 text-gray-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: ((_d2 = proyecto.remodelacion) == null ? void 0 : _d2.supervisor) ? `${proyecto.remodelacion.supervisor.prim_nom || ""} ${proyecto.remodelacion.supervisor.apell_pa || ""}`.trim() || proyecto.remodelacion.supervisor.email : "Sin asignar" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4 text-gray-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: ((_e = proyecto.remodelacion) == null ? void 0 : _e.contratista) ? `${proyecto.remodelacion.contratista.prim_nom || ""} ${proyecto.remodelacion.contratista.apell_pa || ""}`.trim() || proyecto.remodelacion.contratista.email : "Sin asignar" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: ((_f = proyecto.remodelacion) == null ? void 0 : _f.presupuesto_estimado) ? formatCurrency(proyecto.remodelacion.presupuesto_estimado) : "Sin presupuesto",
                color: getPresupuestoColor(proyecto),
                size: "sm"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: formatCurrency(
              ((_h = (_g = proyecto.remodelacion) == null ? void 0 : _g.gastos) == null ? void 0 : _h.reduce((sum, gasto) => sum + (gasto.costo || 0), 0)) || 0
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: proyecto.estatus_actual,
                color: getStatusColor(proyecto.estatus_actual),
                size: "sm"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: (user == null ? void 0 : user.role) === "contratista" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "sm",
                  color: "orange",
                  variant: "outlined",
                  className: "flex items-center gap-1 px-3 py-1",
                  onClick: () => abrirModalSolicitudMaterial(proyecto),
                  title: "Solicitar Material",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingStorefrontIcon, { className: "h-4 w-4" }),
                    "Material"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "sm",
                  color: "blue",
                  variant: "outlined",
                  className: "flex items-center gap-1 px-3 py-1",
                  onClick: () => verRequerimientos(proyecto),
                  title: "Ver Requerimientos",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ListBulletIcon, { className: "h-4 w-4" }),
                    "Requerimientos"
                  ]
                }
              )
            ] }) : (user == null ? void 0 : user.role) === "supervisor" || (user == null ? void 0 : user.role) === "Supervisor" ? (
              /* Vista específica para supervisores */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    color: "blue",
                    variant: "text",
                    className: "p-2",
                    onClick: () => navigate(`/dashboard/remodelacion/${proyecto._id}`),
                    title: "Ver detalles",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  react.Button,
                  {
                    size: "sm",
                    color: "green",
                    variant: "outlined",
                    className: "flex items-center gap-1 px-3 py-1",
                    onClick: () => verRequerimientos(proyecto),
                    title: "Gestionar Requerimientos y Costos",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-4 w-4" }),
                      "Costos"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    color: "blue",
                    variant: "text",
                    className: "p-2",
                    onClick: () => abrirModalAsignar(proyecto),
                    title: "Asignar contratista",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4" })
                  }
                )
              ] })
            ) : (
              /* Otros roles (administradores): Mantener funcionalidad original */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    color: "blue",
                    variant: "text",
                    className: "p-2",
                    onClick: () => navigate(`/dashboard/remodelacion/${proyecto._id}`),
                    title: "Ver detalles",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    color: "green",
                    variant: "text",
                    className: "p-2",
                    onClick: () => navigate(`/dashboard/remodelacion/${proyecto._id}/editar`),
                    title: "Editar proyecto",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" })
                  }
                ),
                ["administrator", "administrador", "ayudante de administrador"].includes(user == null ? void 0 : user.role) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  react.Button,
                  {
                    size: "sm",
                    color: "purple",
                    variant: "outlined",
                    className: "flex items-center gap-1 px-3 py-1",
                    onClick: verListasCompraAdmin,
                    title: "Ver Listas de Compra",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon, { className: "h-4 w-4" }),
                      "Listas de Compra"
                    ]
                  }
                )
              ] })
            ) }) })
          ] }, proyecto._id);
        }) })
      ] }) }) })
    ] }),
    showAsignarModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Asignar Contratista" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mb-4", children: [
        "Proyecto: ",
        (proyectoSeleccionado == null ? void 0 : proyectoSeleccionado.propiedad) ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : "N/A"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Select,
        {
          label: "Seleccionar Contratista",
          value: contratistaSeleccionado,
          onChange: (value) => setContratistaSeleccionado(value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "", children: "Sin contratista" }),
            contratistas.map((contratista) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: contratista._id, children: `${contratista.prim_nom || ""} ${contratista.apell_pa || ""}`.trim() || contratista.email }, contratista._id))
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            variant: "text",
            color: "gray",
            onClick: cerrarModalAsignar,
            disabled: loading,
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            color: "blue",
            onClick: asignarContratista,
            disabled: loading,
            children: loading ? "Asignando..." : "Asignar"
          }
        )
      ] })
    ] }) }),
    showSolicitudMaterialModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-lg mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "🏗️ Solicitar Material" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mb-4", children: [
        "Proyecto: ",
        (proyectoSeleccionado == null ? void 0 : proyectoSeleccionado.propiedad) ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : "N/A"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            label: "Nombre del Material",
            value: solicitudMaterial.material,
            onChange: (e) => setSolicitudMaterial((prev) => ({ ...prev, material: e.target.value })),
            placeholder: "Ej: Cemento, Ladrillo, Pintura..."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            label: "Cantidad",
            type: "number",
            value: solicitudMaterial.cantidad,
            onChange: (e) => setSolicitudMaterial((prev) => ({ ...prev, cantidad: e.target.value })),
            placeholder: "Cantidad necesaria"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Urgencia",
            value: solicitudMaterial.urgencia,
            onChange: (value) => setSolicitudMaterial((prev) => ({ ...prev, urgencia: value })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Baja", children: "🟢 Baja" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Media", children: "🟡 Media" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Alta", children: "🟠 Alta" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Urgente", children: "🔴 Urgente" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "w-full border border-gray-300 rounded-lg p-3 resize-none",
            rows: "3",
            placeholder: "Descripción adicional o especificaciones...",
            value: solicitudMaterial.descripcion,
            onChange: (e) => setSolicitudMaterial((prev) => ({ ...prev, descripcion: e.target.value }))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-end mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            variant: "text",
            color: "gray",
            onClick: cerrarModalSolicitudMaterial,
            disabled: loading,
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            color: "orange",
            onClick: enviarSolicitudMaterial,
            disabled: loading || !solicitudMaterial.material.trim(),
            children: loading ? "Enviando..." : "Enviar Solicitud"
          }
        )
      ] })
    ] }) }),
    showRequerimientosModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: (user == null ? void 0 : user.role) === "supervisor" || (user == null ? void 0 : user.role) === "Supervisor" ? "💰 Gestión de Costos y Requerimientos" : "📋 Mis Requerimientos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mb-6", children: [
        "Proyecto: ",
        (proyectoSeleccionado == null ? void 0 : proyectoSeleccionado.propiedad) ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : "N/A"
      ] }),
      requerimientos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", children: "No hay listas de compra registradas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Los contratistas pueden crear listas de compra para este proyecto" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: requerimientos.map((lista2, index2) => {
        var _a2, _b2, _c2, _d2, _e;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "border-l-4 border-l-blue-500 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "font-bold", children: lista2.titulo || "Lista de Compra" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: [
                "Materiales: ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-gray-800", children: [
                  ((_a2 = lista2.materiales) == null ? void 0 : _a2.length) || 0,
                  " items"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: [
                "Creada: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-gray-800", children: new Date(lista2.fecha_creacion).toLocaleDateString("es-MX") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: lista2.estatus_general || "Borrador",
                color: lista2.estatus_general === "Completada" ? "green" : lista2.estatus_general === "Aprobada" ? "blue" : lista2.estatus_general === "En revisión" ? "orange" : lista2.estatus_general === "Enviada" ? "amber" : lista2.estatus_general === "Rechazada" ? "red" : lista2.estatus_general === "Borrador" ? "gray" : "gray",
                size: "lg",
                className: "font-medium"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            (user == null ? void 0 : user.role) === "supervisor" || (user == null ? void 0 : user.role) === "Supervisor" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-3 border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium mb-2", children: "💰 Gestión de Costo" }),
              lista2.total_estimado > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "green", className: "font-bold", children: [
                  "$",
                  ((_b2 = lista2.total_estimado) == null ? void 0 : _b2.toLocaleString("es-MX")) || "0"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    color: "blue",
                    variant: "outlined",
                    onClick: () => {
                      console.log("✏️ Habilitando edición de costo para:", lista2._id);
                    },
                    className: "ml-2 px-2 py-1",
                    children: "✏️ Editar"
                  }
                )
              ] }) : lista2.total_estimado > 0 && false ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Input,
                  {
                    type: "number",
                    size: "lg",
                    placeholder: "Modifica el costo...",
                    value: lista2.total_estimado || "",
                    onChange: (e) => {
                    },
                    className: "flex-1",
                    step: "0.01",
                    min: "0",
                    label: "Costo (MXN)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "lg",
                    color: "green",
                    onClick: () => {
                      console.log("💾 Actualizando costo existente - Material:", lista2._id, "Nuevo costo:", lista2.total_estimado);
                      abrirModalCostos(lista2);
                    },
                    disabled: guardandoCostos,
                    className: "px-4",
                    children: loading ? "Actualizando..." : "💾 Actualizar"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "lg",
                    color: "gray",
                    variant: "outlined",
                    onClick: () => {
                      console.log("❌ Cancelando edición de costo para:", lista2._id);
                    },
                    className: "px-3",
                    children: "Cancelar"
                  }
                )
              ] }) : (
                // Solo mostrar input si el supervisor habilitó el modo de agregar costo
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "text-center py-2", children: "Use los botones de abajo para gestionar este material" })
              )
            ] }) : (
              /* Vista para contratistas */
              lista2.total_estimado > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-3 border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium mb-2", children: "💰 Costo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "green", className: "font-bold", children: [
                  "$",
                  ((_c2 = lista2.total_estimado) == null ? void 0 : _c2.toLocaleString("es-MX")) || "0"
                ] })
              ] })
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "📝 Tipo de Gasto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Solicitado por Contratista" })
              ] }),
              lista2.contratista_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "👤 Solicitado por" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: [
                  ((_d2 = lista2.contratista_id) == null ? void 0 : _d2.prim_nom) || "Contratista",
                  " ",
                  ((_e = lista2.contratista_id) == null ? void 0 : _e.apell_pa) || ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "📅 Fecha de Solicitud" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: lista2.fecha_creacion ? new Date(lista2.fecha_creacion).toLocaleDateString() : "N/A" })
              ] })
            ] })
          ] }) }),
          lista2.descripcion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-lg p-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium mb-1", children: "📋 Notas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: lista2.descripcion })
          ] }),
          lista2.motivo_rechazo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 rounded-lg p-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "red", className: "font-medium mb-1", children: "❌ Motivo de Rechazo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "red", children: lista2.motivo_rechazo })
          ] }),
          ((user == null ? void 0 : user.role) === "supervisor" || (user == null ? void 0 : user.role) === "Supervisor") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t", children: [
            lista2.estatus_general === "Enviada" && lista2.total_estimado === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "lg",
                  color: "red",
                  variant: "outlined",
                  onClick: () => rechazarListaCompra(lista2._id),
                  disabled: loading,
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationCircleIcon, { className: "h-5 w-5" }),
                    "Rechazar Material"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "lg",
                  color: "blue",
                  variant: "outlined",
                  onClick: () => {
                    console.log("➕ Abriendo modal de costos para lista:", lista2._id);
                    abrirModalCostos(lista2);
                  },
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-5 w-5" }),
                    "Agregar Costo"
                  ]
                }
              )
            ] }),
            lista2.estatus_general === "En revisión" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "lg",
                  color: "blue",
                  variant: "outlined",
                  onClick: () => abrirModalCostos(lista2),
                  disabled: loading,
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-5 w-5" }),
                    "✏️ Editar Costos"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "lg",
                  color: "red",
                  variant: "outlined",
                  onClick: () => rechazarListaCompra(lista2._id),
                  disabled: loading,
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationCircleIcon, { className: "h-5 w-5" }),
                    "Rechazar"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "lg",
                  color: "green",
                  onClick: () => aprobarListaConCostos(lista2._id),
                  disabled: loading,
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-5 w-5" }),
                    "✅ Aprobar Lista"
                  ]
                }
              )
            ] }),
            lista2.estatus_general === "Aprobada" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue", className: "text-center", children: "✅ Material aprobado y enviado a administración" }) }) }),
            lista2.estatus_general === "Rechazada" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "red", className: "text-center", children: "❌ Material rechazado por supervisor" }) }) })
          ] })
        ] }) }, index2);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          color: "blue",
          onClick: cerrarModalRequerimientos,
          children: "Cerrar"
        }
      ) })
    ] }) }),
    showCostosModal && listaParaCostos && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: [
        "💰 ",
        listaParaCostos.estatus_general === "En revisión" ? "Editar" : "Ingresar",
        " Costos de Materiales"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mb-6", children: [
        "Lista: ",
        listaParaCostos.titulo,
        " - Proyecto: ",
        (proyectoSeleccionado == null ? void 0 : proyectoSeleccionado.propiedad) ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : "N/A"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: listaParaCostos.materiales.map((material, index2) => {
        var _a2, _b2, _c2, _d2, _e;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "border-l-4 border-l-green-500 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", className: "font-bold", children: material.tipo }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: [
                "Cantidad: ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-gray-800", children: [
                  material.cantidad,
                  " ",
                  material.tipo_unidad
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: material.urgencia,
                color: material.urgencia === "Urgente" ? "red" : material.urgencia === "Alta" ? "orange" : material.urgencia === "Media" ? "amber" : "green",
                size: "lg",
                className: "font-medium"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium mb-2", children: "Descripción" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: material.descripcion || "Sin descripción" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium mb-2", children: "Costo Estimado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue", className: "font-bold", children: [
                "$",
                ((_a2 = material.costo_estimado) == null ? void 0 : _a2.toLocaleString("es-MX")) || "0"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-4 border border-green-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium mb-3", children: "💰 Costo Final (MXN)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Input,
                {
                  type: "number",
                  size: "lg",
                  placeholder: "Ingrese el costo final...",
                  value: ((_b2 = costosMateriales[index2]) == null ? void 0 : _b2.costo_final) || "",
                  onChange: (e) => actualizarCostoMaterial(index2, "costo_final", e.target.value),
                  className: "flex-1",
                  step: "0.01",
                  min: "0",
                  label: "Costo Final"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Diferencia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  react.Typography,
                  {
                    variant: "h6",
                    color: ((_c2 = costosMateriales[index2]) == null ? void 0 : _c2.costo_final) > material.costo_estimado ? "red" : "green",
                    className: "font-bold",
                    children: [
                      "$",
                      ((((_d2 = costosMateriales[index2]) == null ? void 0 : _d2.costo_final) || 0) - (material.costo_estimado || 0)).toLocaleString("es-MX")
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Textarea,
              {
                size: "lg",
                placeholder: "Notas adicionales sobre el costo...",
                value: ((_e = costosMateriales[index2]) == null ? void 0 : _e.notas) || "",
                onChange: (e) => actualizarCostoMaterial(index2, "notas", e.target.value),
                label: "Notas del Supervisor",
                className: "min-h-[80px]"
              }
            ) })
          ] })
        ] }) }, index2);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mt-6 border-2 border-green-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "green", className: "mb-4 text-center", children: "📊 Resumen de Costos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Total Estimado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "blue", className: "font-bold", children: [
              "$",
              ((_a = listaParaCostos.total_estimado) == null ? void 0 : _a.toLocaleString("es-MX")) || "0"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Total Final" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "green", className: "font-bold", children: [
              "$",
              totalCalculado.toLocaleString("es-MX")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Diferencia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Typography,
              {
                variant: "h6",
                color: totalCalculado > (listaParaCostos.total_estimado || 0) ? "red" : "green",
                className: "font-bold",
                children: [
                  "$",
                  (totalCalculado - (listaParaCostos.total_estimado || 0)).toLocaleString("es-MX")
                ]
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            color: "gray",
            variant: "outlined",
            onClick: cerrarModalCostos,
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              color: "blue",
              onClick: guardarCostosYContinuar,
              disabled: loading,
              children: loading ? "Guardando..." : `💾 ${listaParaCostos.estatus_general === "En revisión" ? "Actualizar" : "Guardar"} Costos`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              color: "green",
              onClick: () => {
                guardarCostosYContinuar().then(() => {
                  if (!error) {
                    aprobarListaConCostos(listaParaCostos._id);
                  }
                });
              },
              disabled: loading,
              children: loading ? "Procesando..." : "✅ Guardar y Aprobar"
            }
          )
        ] })
      ] })
    ] }) }),
    showListasCompraModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "📋 Listas de Compra - Administración" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mb-6", children: "Listas de compra pendientes de aprobación administrativa y ya procesadas por administración" }),
      listasCompra.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", children: "No hay listas de compra disponibles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Las listas de compra aparecerán aquí cuando sean aprobadas por supervisores o procesadas por administración" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Lista de Compra" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Proyecto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Contratista" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Total" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Estatus" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Fecha" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Acciones" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: listasCompra.map((lista2) => {
          var _a2, _b2, _c2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: lista2.titulo || "Lista de Compra" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", children: [
                ((_a2 = lista2.materiales) == null ? void 0 : _a2.length) || 0,
                " materiales"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: formatearDireccion((_c2 = (_b2 = lista2.proyecto_id) == null ? void 0 : _b2.propiedad) == null ? void 0 : _c2.direccion) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4 text-gray-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: lista2.contratista_id ? `${lista2.contratista_id.prim_nom || ""} ${lista2.contratista_id.apell_pa || ""}`.trim() || lista2.contratista_id.email : "N/A" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: formatCurrency(lista2.total_final || lista2.total_estimado || 0) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: lista2.estatus_general,
                color: getListaCompraStatusColor(lista2.estatus_general),
                size: "sm"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: formatDate(lista2.fecha_creacion) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  size: "sm",
                  color: "blue",
                  variant: "text",
                  className: "p-2",
                  onClick: () => abrirModalDetallesLista(lista2),
                  title: "Ver detalles",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  size: "sm",
                  color: "purple",
                  variant: "outlined",
                  className: "flex items-center gap-1 px-3 py-1",
                  onClick: () => imprimirOrdenCompra(lista2),
                  title: "Imprimir orden de compra",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon, { className: "h-4 w-4" }),
                    "Imprimir"
                  ]
                }
              )
            ] }) })
          ] }, lista2._id);
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          color: "blue",
          onClick: cerrarModalListasCompra,
          children: "Cerrar"
        }
      ) })
    ] }) }),
    showDetallesListaModal && listaSeleccionada && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "📋 Detalles de Lista de Compra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mb-6", children: [
        "Lista: ",
        listaSeleccionada.titulo,
        " - Proyecto: ",
        formatearDireccion((_c = (_b = listaSeleccionada.proyecto_id) == null ? void 0 : _b.propiedad) == null ? void 0 : _c.direccion)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "📅 Fecha de Creación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: formatDate(listaSeleccionada.fecha_creacion) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "👤 Contratista" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: listaSeleccionada.contratista_id ? `${listaSeleccionada.contratista_id.prim_nom || ""} ${listaSeleccionada.contratista_id.apell_pa || ""}`.trim() || listaSeleccionada.contratista_id.email : "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "💰 Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-bold", children: formatCurrency(listaSeleccionada.total_final || listaSeleccionada.total_estimado || 0) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "📦 Materiales Solicitados" }),
        (_d = listaSeleccionada.materiales) == null ? void 0 : _d.map((material, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "border-l-4 border-l-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "font-bold", children: material.tipo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Cantidad" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: [
                material.cantidad,
                " ",
                material.tipo_unidad
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Urgencia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Chip,
                {
                  value: material.urgencia,
                  color: material.urgencia === "Urgente" ? "red" : material.urgencia === "Alta" ? "orange" : material.urgencia === "Media" ? "yellow" : "green",
                  size: "sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Costo Estimado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue", className: "font-medium", children: formatCurrency(material.costo_estimado || 0) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Costo Final" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: formatCurrency(material.costo_final || 0) })
            ] })
          ] }),
          material.descripcion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Descripción" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: material.descripcion })
          ] }),
          material.notas_supervisor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Notas del Supervisor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: material.notas_supervisor })
          ] })
        ] }) }) }) }, index2))
      ] }),
      listaSeleccionada.descripcion && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium mb-2", children: "📝 Descripción General" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: listaSeleccionada.descripcion })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 justify-end mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          size: "lg",
          color: "purple",
          variant: "outlined",
          onClick: () => imprimirOrdenCompra(listaSeleccionada),
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon, { className: "h-5 w-5" }),
            "🖨️ Imprimir Orden"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          color: "gray",
          variant: "outlined",
          onClick: cerrarModalDetallesLista,
          children: "Cerrar"
        }
      ) })
    ] }) })
  ] });
};
function Presupuesto({ proyectoId, userRole, proyecto, remodelacionData }) {
  var _a, _b, _c, _d, _e;
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [editando, setEditando] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    presupuesto_estimado: "",
    supervisor_asignado: "",
    contratista_asignado: "",
    fecha_inicio: "",
    fecha_fin: "",
    notas: ""
  });
  const calcularDatosPresupuesto = () => {
    var _a2, _b2, _c2, _d2, _e2;
    const presupuestoEstimado = (proyecto == null ? void 0 : proyecto.presupuesto_estimado) || ((_a2 = proyecto == null ? void 0 : proyecto.remodelacion) == null ? void 0 : _a2.presupuesto_estimado) || 0;
    const gastosAdministrativos = ((_b2 = remodelacionData == null ? void 0 : remodelacionData.gastos_administrativos) == null ? void 0 : _b2.reduce((total, gasto) => total + (gasto.monto || 0), 0)) || 0;
    const gastosMateriales = ((_c2 = remodelacionData == null ? void 0 : remodelacionData.materiales) == null ? void 0 : _c2.reduce((total, material) => total + (material.costo_total || 0), 0)) || 0;
    const gastosTotales = gastosAdministrativos + gastosMateriales;
    const presupuestoTotal = Math.max(presupuestoEstimado, gastosTotales);
    const diferencia = presupuestoEstimado - gastosTotales;
    return {
      presupuesto_estimado: presupuestoEstimado,
      presupuesto_total: presupuestoTotal,
      gastos_totales: gastosTotales,
      supervisor_asignado: ((_d2 = remodelacionData == null ? void 0 : remodelacionData.supervisor_asignado) == null ? void 0 : _d2.nombre) || null,
      contratista_asignado: ((_e2 = remodelacionData == null ? void 0 : remodelacionData.contratista_asignado) == null ? void 0 : _e2.nombre) || null,
      fecha_inicio: (remodelacionData == null ? void 0 : remodelacionData.fecha_inicio) || null,
      fecha_fin: (remodelacionData == null ? void 0 : remodelacionData.fecha_fin) || null,
      notas: (remodelacionData == null ? void 0 : remodelacionData.notas) || "",
      gastos_administrativos: gastosAdministrativos,
      gastos_materiales: gastosMateriales,
      diferencia,
      estado: (remodelacionData == null ? void 0 : remodelacionData.estado) || "ACTIVO"
    };
  };
  const presupuesto = calcularDatosPresupuesto();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleGuardar = async () => {
    try {
      setPresupuesto((prev) => ({
        ...prev,
        ...formData
      }));
      setEditando(false);
    } catch (err) {
      console.error("Error al guardar presupuesto:", err);
      setError("Error al guardar el presupuesto");
    }
  };
  const handleCancelar = () => {
    setFormData({
      presupuesto_estimado: (presupuesto == null ? void 0 : presupuesto.presupuesto_estimado) || "",
      supervisor_asignado: (presupuesto == null ? void 0 : presupuesto.supervisor_asignado) || "",
      fecha_inicio: (presupuesto == null ? void 0 : presupuesto.fecha_inicio) || "",
      fecha_fin: (presupuesto == null ? void 0 : presupuesto.fecha_fin) || "",
      notas: (presupuesto == null ? void 0 : presupuesto.notas) || ""
    });
    setEditando(false);
  };
  const puedeEditarPresupuesto = userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";
  const puedeAsignarContratista = userRole === "supervisor" || userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";
  const esSupervisor = userRole === "supervisor";
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-8 w-8 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Presupuesto del Proyecto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Gestión financiera y asignación de recursos" })
        ] })
      ] }),
      puedeAsignarContratista && /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          variant: editando ? "outlined" : "gradient",
          color: editando ? "red" : "blue",
          className: "flex items-center gap-2",
          onClick: () => editando ? handleCancelar() : setEditando(true),
          children: editando ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-4 w-4" }),
            "Cancelar"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" }),
            "Editar"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Resumen Financiero" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-blue-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "blue", className: "font-bold", children: [
              "$",
              ((_a = presupuesto == null ? void 0 : presupuesto.presupuesto_estimado) == null ? void 0 : _a.toLocaleString()) || "0"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Presupuesto Estimado" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "green", className: "font-bold", children: [
              "$",
              ((_b = presupuesto == null ? void 0 : presupuesto.presupuesto_total) == null ? void 0 : _b.toLocaleString()) || "0"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", children: "Presupuesto Total" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center p-4 rounded-lg ${(presupuesto == null ? void 0 : presupuesto.diferencia) >= 0 ? "bg-green-50" : "bg-red-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Typography,
              {
                variant: "h4",
                color: (presupuesto == null ? void 0 : presupuesto.diferencia) >= 0 ? "green" : "red",
                className: "font-bold",
                children: [
                  "$",
                  ((_c = presupuesto == null ? void 0 : presupuesto.diferencia) == null ? void 0 : _c.toLocaleString()) || "0"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Typography,
              {
                variant: "small",
                color: (presupuesto == null ? void 0 : presupuesto.diferencia) >= 0 ? "green" : "red",
                children: (presupuesto == null ? void 0 : presupuesto.diferencia) >= 0 ? "Disponible" : "Excedido"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-red-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "red", className: "mb-2", children: "Gastos Administrativos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "red", className: "font-bold", children: [
              "$",
              ((_d = presupuesto == null ? void 0 : presupuesto.gastos_administrativos) == null ? void 0 : _d.toLocaleString()) || "0"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "mb-2", children: "Gastos de Materiales" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "purple", className: "font-bold", children: [
              "$",
              ((_e = presupuesto == null ? void 0 : presupuesto.gastos_materiales) == null ? void 0 : _e.toLocaleString()) || "0"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue-gray", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Detalles del Proyecto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: editando ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          puedeEditarPresupuesto && /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Presupuesto Estimado ($)",
              type: "number",
              name: "presupuesto_estimado",
              value: formData.presupuesto_estimado,
              onChange: handleInputChange,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-4 w-4" }),
              disabled: esSupervisor
            }
          ),
          puedeAsignarSupervisor && /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Supervisor Asignado",
              name: "supervisor_asignado",
              value: formData.supervisor_asignado,
              onChange: handleInputChange,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4" }),
              disabled: esSupervisor
            }
          ),
          puedeAsignarContratista && /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Contratista Asignado",
              name: "contratista_asignado",
              value: formData.contratista_asignado,
              onChange: handleInputChange,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Fecha de Inicio",
              type: "date",
              name: "fecha_inicio",
              value: formData.fecha_inicio,
              onChange: handleInputChange,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Fecha de Finalización",
              type: "date",
              name: "fecha_fin",
              value: formData.fecha_fin,
              onChange: handleInputChange,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            label: "Notas Adicionales",
            name: "notas",
            value: formData.notas,
            onChange: handleInputChange,
            multiline: true,
            rows: 3
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              variant: "outlined",
              color: "red",
              onClick: handleCancelar,
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              variant: "gradient",
              color: "green",
              onClick: handleGuardar,
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" }),
                "Guardar"
              ]
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-5 w-5 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Supervisor Asignado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: (presupuesto == null ? void 0 : presupuesto.supervisor_asignado) || "No asignado" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-5 w-5 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Contratista Asignado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: (presupuesto == null ? void 0 : presupuesto.contratista_asignado) || "No asignado" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-5 w-5 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Fecha de Inicio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: (presupuesto == null ? void 0 : presupuesto.fecha_inicio) || "No definida" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-5 w-5 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Fecha de Finalización" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { children: (presupuesto == null ? void 0 : presupuesto.fecha_fin) || "No definida" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium mb-2", children: "Notas Adicionales" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "bg-blue-gray-50 p-3 rounded-lg", children: (presupuesto == null ? void 0 : presupuesto.notas) || "Sin notas adicionales" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Estado:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: (presupuesto == null ? void 0 : presupuesto.presupuesto_total) > 0 ? "Activo" : "Pendiente",
                color: (presupuesto == null ? void 0 : presupuesto.presupuesto_total) > 0 ? "green" : "amber",
                size: "sm"
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function MaterialForm({ proyectoId, userRole }) {
  const [materiales, setMateriales] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(null);
  const [editando, setEditando] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    tipo_material: "",
    cantidad: "",
    costo: "",
    numero_factura: "",
    notas: ""
  });
  reactExports.useEffect(() => {
    cargarMateriales();
  }, [proyectoId]);
  const cargarMateriales = async () => {
    try {
      setLoading(true);
      setMateriales([
        {
          _id: "1",
          tipo_material: "Cemento",
          cantidad: "10 sacos",
          costo: 2500,
          numero_factura: "F-001-2024",
          notas: "Cemento Portland tipo I",
          usuario_registro: "Admin User",
          fecha_registro: "2024-01-15T10:30:00Z",
          estatus: "Recibido"
        },
        {
          _id: "2",
          tipo_material: "Varilla",
          cantidad: "50 piezas",
          costo: 15e3,
          numero_factura: "F-002-2024",
          notas: "Varilla corrugada 3/8",
          usuario_registro: "Admin User",
          fecha_registro: "2024-01-16T14:20:00Z",
          estatus: "Pendiente"
        }
      ]);
    } catch (err) {
      console.error("Error al cargar materiales:", err);
      setError("Error al cargar los materiales");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tipo_material || !formData.cantidad || !formData.costo) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const nuevoMaterial = {
        _id: Date.now().toString(),
        ...formData,
        costo: parseFloat(formData.costo),
        usuario_registro: "Usuario Actual",
        // TODO: Obtener del contexto
        fecha_registro: (/* @__PURE__ */ new Date()).toISOString(),
        estatus: "Pendiente"
      };
      setMateriales((prev) => [nuevoMaterial, ...prev]);
      setFormData({
        tipo_material: "",
        cantidad: "",
        costo: "",
        numero_factura: "",
        notas: ""
      });
      setSuccess("Material registrado exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al registrar material:", err);
      setError("Error al registrar el material");
    } finally {
      setLoading(false);
    }
  };
  const handleEditar = (material) => {
    setEditando(material._id);
    setFormData({
      tipo_material: material.tipo_material,
      cantidad: material.cantidad,
      costo: material.costo.toString(),
      numero_factura: material.numero_factura,
      notas: material.notas
    });
  };
  const handleActualizar = async () => {
    try {
      setLoading(true);
      setError(null);
      setMateriales((prev) => prev.map(
        (m) => m._id === editando ? { ...m, ...formData, costo: parseFloat(formData.costo) } : m
      ));
      setEditando(null);
      setFormData({
        tipo_material: "",
        cantidad: "",
        costo: "",
        numero_factura: "",
        notas: ""
      });
      setSuccess("Material actualizado exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al actualizar material:", err);
      setError("Error al actualizar el material");
    } finally {
      setLoading(false);
    }
  };
  const handleCancelar = () => {
    setEditando(null);
    setFormData({
      tipo_material: "",
      cantidad: "",
      costo: "",
      numero_factura: "",
      notas: ""
    });
  };
  const handleEliminar = async (materialId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este material?")) {
      return;
    }
    try {
      setLoading(true);
      setMateriales((prev) => prev.filter((m) => m._id !== materialId));
      setSuccess("Material eliminado exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al eliminar material:", err);
      setError("Error al eliminar el material");
    } finally {
      setLoading(false);
    }
  };
  const cambiarEstatus = async (materialId, nuevoEstatus) => {
    try {
      setMateriales((prev) => prev.map(
        (m) => m._id === materialId ? { ...m, estatus: nuevoEstatus } : m
      ));
      setSuccess("Estatus actualizado exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al cambiar estatus:", err);
      setError("Error al cambiar el estatus");
    }
  };
  const puedeEditar = userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";
  const puedeCambiarEstatus = userRole === "supervisor" || userRole === "contratista";
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-MX");
  };
  const getEstatusColor = (estatus) => {
    const colors = {
      "Pendiente": "amber",
      "Recibido": "green",
      "En proceso": "blue",
      "Cancelado": "red"
    };
    return colors[estatus] || "gray";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentIcon, { className: "h-8 w-8 text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Gastos Administrativos de Materiales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Registro y gestión de materiales comprados por administración" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-5 w-5" }),
      error
    ] }),
    success && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "green", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-5 w-5" }),
      success
    ] }),
    puedeEditar && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: editando ? "Editar Material" : "Registrar Nuevo Material" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Tipo de Material *",
              name: "tipo_material",
              value: formData.tipo_material,
              onChange: handleInputChange,
              required: true,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentIcon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Cantidad *",
              name: "cantidad",
              value: formData.cantidad,
              onChange: handleInputChange,
              required: true,
              placeholder: "Ej: 10 sacos, 50 piezas"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Costo ($) *",
              type: "number",
              name: "costo",
              value: formData.costo,
              onChange: handleInputChange,
              required: true,
              step: "0.01",
              min: "0",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Número de Factura",
              name: "numero_factura",
              value: formData.numero_factura,
              onChange: handleInputChange,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentIcon, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Textarea,
          {
            label: "Notas Adicionales",
            name: "notas",
            value: formData.notas,
            onChange: handleInputChange,
            rows: 3
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          editando && /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: "button",
              variant: "outlined",
              color: "red",
              onClick: handleCancelar,
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: editando ? "button" : "submit",
              variant: "gradient",
              color: editando ? "blue" : "green",
              onClick: editando ? handleActualizar : void 0,
              disabled: loading,
              className: "flex items-center gap-2",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "sm" }) : editando ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" }),
                "Actualizar"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon$1, { className: "h-4 w-4" }),
                "Registrar"
              ] })
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue-gray", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "white", children: [
        "Materiales Registrados (",
        materiales.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) }) : materiales.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: "No hay materiales registrados" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Tipo de Material" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Cantidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Costo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "N° Factura" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Estatus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Registrado por" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Fecha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Acciones" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableBody, { children: materiales.map((material) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: material.tipo_material }),
            material.notas && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: material.notas })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: material.cantidad }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium", children: formatCurrency(material.costo) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: material.numero_factura || "N/A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Chip,
            {
              value: material.estatus,
              color: getEstatusColor(material.estatus),
              size: "sm"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: material.usuario_registro })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-4 w-4 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: formatDate(material.fecha_registro) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            puedeEditar && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  size: "sm",
                  variant: "text",
                  color: "blue",
                  onClick: () => handleEditar(material),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  size: "sm",
                  variant: "text",
                  color: "red",
                  onClick: () => handleEliminar(material._id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, { className: "h-4 w-4" })
                }
              )
            ] }),
            puedeCambiarEstatus && material.estatus === "Pendiente" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "green",
                onClick: () => cambiarEstatus(material._id, "Recibido"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, material._id)) })
      ] }) })
    ] })
  ] });
}
function SolicitudForm({ proyectoId, userRole }) {
  const [solicitudes, setSolicitudes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(null);
  const [editando, setEditando] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    tipo_material: "",
    cantidad: "",
    notas: ""
  });
  reactExports.useEffect(() => {
    cargarSolicitudes();
  }, [proyectoId]);
  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setSolicitudes([
        {
          _id: "1",
          tipo_material: "Pintura",
          cantidad: "20 litros",
          notas: "Pintura blanca para interiores",
          contratista: "Carlos López",
          fecha_solicitud: "2024-01-15T10:30:00Z",
          estatus: "Solicitando material",
          costo_estimado: null,
          supervisor_aprobacion: null,
          administrador_aprobacion: null,
          fecha_compra: null,
          numero_folio: null,
          foto_comprobante: null,
          fecha_entrega: null
        },
        {
          _id: "2",
          tipo_material: "Azulejos",
          cantidad: "100 piezas",
          notas: "Azulejos 30x30 cm para baño",
          contratista: "Carlos López",
          fecha_solicitud: "2024-01-14T14:20:00Z",
          estatus: "Aprobacion administrativa",
          costo_estimado: 8500,
          supervisor_aprobacion: "Juan Pérez",
          administrador_aprobacion: null,
          fecha_compra: null,
          numero_folio: null,
          foto_comprobante: null,
          fecha_entrega: null
        },
        {
          _id: "3",
          tipo_material: "Cemento",
          cantidad: "15 sacos",
          notas: "Cemento Portland tipo I",
          contratista: "Carlos López",
          fecha_solicitud: "2024-01-13T09:15:00Z",
          estatus: "Aprobado para su compra",
          costo_estimado: 3750,
          supervisor_aprobacion: "Juan Pérez",
          administrador_aprobacion: "Admin User",
          fecha_compra: null,
          numero_folio: null,
          foto_comprobante: null,
          fecha_entrega: null
        }
      ]);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
      setError("Error al cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tipo_material || !formData.cantidad) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const nuevaSolicitud = {
        _id: Date.now().toString(),
        ...formData,
        contratista: "Usuario Actual",
        // TODO: Obtener del contexto
        fecha_solicitud: (/* @__PURE__ */ new Date()).toISOString(),
        estatus: "Solicitando material",
        costo_estimado: null,
        supervisor_aprobacion: null,
        administrador_aprobacion: null,
        fecha_compra: null,
        numero_folio: null,
        foto_comprobante: null,
        fecha_entrega: null
      };
      setSolicitudes((prev) => [nuevaSolicitud, ...prev]);
      setFormData({
        tipo_material: "",
        cantidad: "",
        notas: ""
      });
      setSuccess("Solicitud creada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al crear solicitud:", err);
      setError("Error al crear la solicitud");
    } finally {
      setLoading(false);
    }
  };
  const handleEditar = (solicitud) => {
    setEditando(solicitud._id);
    setFormData({
      tipo_material: solicitud.tipo_material,
      cantidad: solicitud.cantidad,
      notas: solicitud.notas
    });
  };
  const handleActualizar = async () => {
    try {
      setLoading(true);
      setError(null);
      setSolicitudes((prev) => prev.map(
        (s) => s._id === editando ? { ...s, ...formData } : s
      ));
      setEditando(null);
      setFormData({
        tipo_material: "",
        cantidad: "",
        notas: ""
      });
      setSuccess("Solicitud actualizada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al actualizar solicitud:", err);
      setError("Error al actualizar la solicitud");
    } finally {
      setLoading(false);
    }
  };
  const handleCancelar = () => {
    setEditando(null);
    setFormData({
      tipo_material: "",
      cantidad: "",
      notas: ""
    });
  };
  const handleEliminar = async (solicitudId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta solicitud?")) {
      return;
    }
    try {
      setLoading(true);
      setSolicitudes((prev) => prev.filter((s) => s._id !== solicitudId));
      setSuccess("Solicitud eliminada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al eliminar solicitud:", err);
      setError("Error al eliminar la solicitud");
    } finally {
      setLoading(false);
    }
  };
  const agregarCosto2 = async (solicitudId, costo) => {
    try {
      setSolicitudes((prev) => prev.map(
        (s) => s._id === solicitudId ? {
          ...s,
          costo_estimado: parseFloat(costo),
          estatus: "Aprobacion administrativa",
          supervisor_aprobacion: "Usuario Actual"
          // TODO: Obtener del contexto
        } : s
      ));
      setSuccess("Costo agregado exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al agregar costo:", err);
      setError("Error al agregar el costo");
    }
  };
  const aprobarSolicitud2 = async (solicitudId) => {
    try {
      setSolicitudes((prev) => prev.map(
        (s) => s._id === solicitudId ? {
          ...s,
          estatus: "Aprobado para su compra",
          administrador_aprobacion: "Usuario Actual"
          // TODO: Obtener del contexto
        } : s
      ));
      setSuccess("Solicitud aprobada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al aprobar solicitud:", err);
      setError("Error al aprobar la solicitud");
    }
  };
  const puedeCrear = userRole === "contratista";
  const puedeEditar = userRole === "contratista";
  const puedeAgregarCosto = userRole === "supervisor";
  const puedeAprobar = userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";
  const getEstatusColor = (estatus) => {
    const colors = {
      "Solicitando material": "blue",
      "Aprobacion administrativa": "amber",
      "Aprobado para su compra": "green",
      "En proceso de entrega": "purple",
      "Entregado": "green",
      "Cancelado": "red"
    };
    return colors[estatus] || "gray";
  };
  const getEstatusIcon = (estatus) => {
    switch (estatus) {
      case "Solicitando material":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BellIcon$1, { className: "h-4 w-4" });
      case "Aprobacion administrativa":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentIcon, { className: "h-4 w-4" });
      case "Aprobado para su compra":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" });
      case "En proceso de entrega":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-4 w-4" });
      case "Entregado":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentIcon, { className: "h-4 w-4" });
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-MX");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BellIcon$1, { className: "h-8 w-8 text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Solicitudes de Materiales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Gestión de solicitudes de materiales por parte de contratistas" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-5 w-5" }),
      error
    ] }),
    success && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "green", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-5 w-5" }),
      success
    ] }),
    puedeCrear && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: editando ? "Editar Solicitud" : "Nueva Solicitud de Material" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Tipo de Material *",
              name: "tipo_material",
              value: formData.tipo_material,
              onChange: handleInputChange,
              required: true,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentIcon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Cantidad *",
              name: "cantidad",
              value: formData.cantidad,
              onChange: handleInputChange,
              required: true,
              placeholder: "Ej: 20 litros, 100 piezas"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Textarea,
          {
            label: "Notas Adicionales",
            name: "notas",
            value: formData.notas,
            onChange: handleInputChange,
            rows: 3,
            placeholder: "Describe el material, especificaciones, etc."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          editando && /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: "button",
              variant: "outlined",
              color: "red",
              onClick: handleCancelar,
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: editando ? "button" : "submit",
              variant: "gradient",
              color: editando ? "blue" : "green",
              onClick: editando ? handleActualizar : void 0,
              disabled: loading,
              className: "flex items-center gap-2",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "sm" }) : editando ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" }),
                "Actualizar"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon$1, { className: "h-4 w-4" }),
                "Crear Solicitud"
              ] })
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue-gray", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "white", children: [
        "Solicitudes (",
        solicitudes.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) }) : solicitudes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: "No hay solicitudes registradas" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Material" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Contratista" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Estatus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Costo Estimado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Fecha Solicitud" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Acciones" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableBody, { children: solicitudes.map((solicitud) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: solicitud.tipo_material }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: solicitud.cantidad }),
            solicitud.notas && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "italic", children: solicitud.notas })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: solicitud.contratista })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Chip,
            {
              value: solicitud.estatus,
              color: getEstatusColor(solicitud.estatus),
              size: "sm",
              icon: getEstatusIcon(solicitud.estatus)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: solicitud.costo_estimado ? /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", className: "font-medium text-green-600", children: [
            "$",
            solicitud.costo_estimado.toLocaleString()
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Pendiente" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-4 w-4 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: formatDate(solicitud.fecha_solicitud) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "blue",
                className: "p-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
              }
            ),
            puedeEditar && solicitud.estatus === "Solicitando material" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "blue",
                onClick: () => handleEditar(solicitud),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" })
              }
            ),
            puedeEditar && solicitud.estatus === "Solicitando material" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "red",
                onClick: () => handleEliminar(solicitud._id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, { className: "h-4 w-4" })
              }
            ),
            puedeAgregarCosto && solicitud.estatus === "Solicitando material" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "amber",
                onClick: () => {
                  const costo = prompt("Ingresa el costo estimado del material:");
                  if (costo && !isNaN(costo)) {
                    agregarCosto2(solicitud._id, costo);
                  }
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-4 w-4" })
              }
            ),
            puedeAprobar && solicitud.estatus === "Aprobacion administrativa" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "green",
                onClick: () => aprobarSolicitud2(solicitud._id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, solicitud._id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "bg-blue-50 border-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Flujo de Solicitudes de Materiales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-blue-100 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "font-bold", children: "1" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Solicitud" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Contratista solicita material" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-amber-100 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "font-bold", children: "2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", className: "font-medium", children: "Costo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", children: "Supervisor agrega costo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-green-100 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "font-bold", children: "3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: "Aprobación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", children: "Administración aprueba" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-purple-100 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "font-bold", children: "4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "purple", className: "font-medium", children: "Compra" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "purple", children: "Supervisor compra" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-green-100 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "font-bold", children: "5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: "Entrega" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", children: "Contratista recibe" })
        ] })
      ] })
    ] }) })
  ] });
}
function Notificaciones({ proyectoId, userRole }) {
  const [notificaciones, setNotificaciones] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [filtro, setFiltro] = reactExports.useState("todas");
  reactExports.useEffect(() => {
    cargarNotificaciones();
  }, [proyectoId]);
  const cargarNotificaciones = async () => {
    try {
      setLoading(true);
      setNotificaciones([
        {
          _id: "1",
          titulo: "Nueva solicitud de material",
          mensaje: "Se ha creado una nueva solicitud para el proyecto Casa Azul",
          tipo: "solicitud_material",
          prioridad: "media",
          leida: false,
          fecha_creacion: "2024-01-15T10:30:00Z",
          usuario_origen: "Carlos López",
          accion_requerida: "revisar_solicitud"
        },
        {
          _id: "2",
          titulo: "Costo agregado a solicitud",
          mensaje: "Se ha agregado un costo de $8,500 a la solicitud de azulejos",
          tipo: "costo_agregado",
          prioridad: "alta",
          leida: false,
          fecha_creacion: "2024-01-15T14:20:00Z",
          usuario_origen: "Juan Pérez",
          accion_requerida: "aprobar_solicitud"
        },
        {
          _id: "3",
          titulo: "Solicitud aprobada",
          mensaje: "La solicitud de cemento ha sido aprobada por administración",
          tipo: "solicitud_aprobada",
          prioridad: "baja",
          leida: true,
          fecha_creacion: "2024-01-15T16:45:00Z",
          usuario_origen: "Admin User",
          accion_requerida: "comprar_material"
        },
        {
          _id: "4",
          titulo: "Material comprado",
          mensaje: "El cemento ha sido comprado y está en proceso de entrega",
          tipo: "material_comprado",
          prioridad: "media",
          leida: true,
          fecha_creacion: "2024-01-16T09:15:00Z",
          usuario_origen: "Juan Pérez",
          accion_requerida: "entregar_material"
        },
        {
          _id: "5",
          titulo: "Material entregado",
          mensaje: "El cemento ha sido entregado al contratista",
          tipo: "material_entregado",
          prioridad: "baja",
          leida: false,
          fecha_creacion: "2024-01-16T11:30:00Z",
          usuario_origen: "Juan Pérez",
          accion_requerida: "firmar_carta"
        }
      ]);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      setError("Error al cargar las notificaciones");
    } finally {
      setLoading(false);
    }
  };
  const marcarComoLeida = async (notificacionId) => {
    try {
      setNotificaciones((prev) => prev.map(
        (n) => n._id === notificacionId ? { ...n, leida: true, fecha_lectura: (/* @__PURE__ */ new Date()).toISOString() } : n
      ));
    } catch (err) {
      console.error("Error al marcar notificación como leída:", err);
    }
  };
  const marcarTodasComoLeidas = async () => {
    try {
      setNotificaciones((prev) => prev.map((n) => ({
        ...n,
        leida: true,
        fecha_lectura: (/* @__PURE__ */ new Date()).toISOString()
      })));
    } catch (err) {
      console.error("Error al marcar todas las notificaciones como leídas:", err);
    }
  };
  const eliminarNotificacion = async (notificacionId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta notificación?")) {
      return;
    }
    try {
      setNotificaciones((prev) => prev.filter((n) => n._id !== notificacionId));
    } catch (err) {
      console.error("Error al eliminar notificación:", err);
    }
  };
  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case "solicitud_material":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardDocumentIcon, { className: "h-5 w-5" });
      case "costo_agregado":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-5 w-5" });
      case "solicitud_aprobada":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircleIcon$1, { className: "h-5 w-5" });
      case "material_comprado":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCartIcon$1, { className: "h-5 w-5" });
      case "material_entregado":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TruckIcon, { className: "h-5 w-5" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(InformationCircleIcon, { className: "h-5 w-5" });
    }
  };
  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "solicitud_material":
        return "blue";
      case "costo_agregado":
        return "amber";
      case "solicitud_aprobada":
        return "green";
      case "material_comprado":
        return "purple";
      case "material_entregado":
        return "green";
      default:
        return "gray";
    }
  };
  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "red";
      case "media":
        return "amber";
      case "baja":
        return "green";
      default:
        return "gray";
    }
  };
  const getAccionRequerida = (accion) => {
    switch (accion) {
      case "revisar_solicitud":
        return "Revisar solicitud";
      case "aprobar_solicitud":
        return "Aprobar solicitud";
      case "comprar_material":
        return "Comprar material";
      case "entregar_material":
        return "Entregar material";
      case "firmar_carta":
        return "Firmar carta de responsabilidad";
      default:
        return "Sin acción requerida";
    }
  };
  const formatDate = (dateString) => {
    const fecha = new Date(dateString);
    const ahora = /* @__PURE__ */ new Date();
    const diffMs = ahora - fecha;
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    const diffDays = Math.floor(diffMs / 864e5);
    if (diffMins < 1)
      return "Ahora mismo";
    if (diffMins < 60)
      return `Hace ${diffMins} min`;
    if (diffHours < 24)
      return `Hace ${diffHours} horas`;
    if (diffDays < 7)
      return `Hace ${diffDays} días`;
    return fecha.toLocaleDateString("es-MX");
  };
  const notificacionesFiltradas = notificaciones.filter((notif) => {
    if (filtro === "no_leidas")
      return !notif.leida;
    if (filtro === "leidas")
      return notif.leida;
    return true;
  });
  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BellIcon$1, { className: "h-8 w-8 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Notificaciones" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Sistema de notificaciones en tiempo real" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BellIcon$1, { className: "h-6 w-6 text-blue-gray-500" }),
          notificacionesNoLeidas > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Chip,
            {
              value: notificacionesNoLeidas,
              size: "sm",
              color: "red",
              className: "absolute -top-2 -right-2 min-w-[20px] h-5 text-xs"
            }
          )
        ] }),
        notificacionesNoLeidas > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            size: "sm",
            variant: "text",
            color: "blue",
            onClick: marcarTodasComoLeidas,
            children: "Marcar todas como leídas"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          variant: filtro === "todas" ? "gradient" : "outlined",
          color: "blue",
          size: "sm",
          onClick: () => setFiltro("todas"),
          children: [
            "Todas (",
            notificaciones.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          variant: filtro === "no_leidas" ? "gradient" : "outlined",
          color: "amber",
          size: "sm",
          onClick: () => setFiltro("no_leidas"),
          children: [
            "No leídas (",
            notificacionesNoLeidas,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          variant: filtro === "leidas" ? "gradient" : "outlined",
          color: "green",
          size: "sm",
          onClick: () => setFiltro("leidas"),
          children: [
            "Leídas (",
            notificaciones.filter((n) => n.leida).length,
            ")"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue-gray", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Notificaciones del Proyecto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: notificacionesFiltradas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BellIcon$1, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", className: "mb-2", children: "No hay notificaciones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: filtro === "todas" ? "No hay notificaciones para este proyecto" : `No hay notificaciones ${filtro === "no_leidas" ? "no leídas" : "leídas"}` })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-200", children: notificacionesFiltradas.map((notificacion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `p-4 hover:bg-gray-50 transition-colors ${!notificacion.leida ? "bg-blue-50" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-full bg-${getTipoColor(notificacion.tipo)}-100`, children: getTipoIcon(notificacion.tipo) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "font-medium", children: notificacion.titulo }),
                  !notificacion.leida && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Chip,
                    {
                      value: notificacion.prioridad,
                      color: getPrioridadColor(notificacion.prioridad),
                      size: "sm",
                      variant: "ghost"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", className: "mb-2", children: notificacion.mensaje }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: notificacion.usuario_origen })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ClockIcon$1, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(notificacion.fecha_creacion) })
                  ] })
                ] }),
                notificacion.accion_requerida && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Acción requerida:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: getAccionRequerida(notificacion.accion_requerida) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-4", children: [
                !notificacion.leida && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    variant: "text",
                    color: "blue",
                    onClick: () => marcarComoLeida(notificacion._id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Button,
                  {
                    size: "sm",
                    variant: "text",
                    color: "red",
                    onClick: () => eliminarNotificacion(notificacion._id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }) })
          ] })
        },
        notificacion._id
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "bg-blue-50 border-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Sistema de Notificaciones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Las notificaciones se generan automáticamente según las acciones realizadas en el sistema." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Las notificaciones no leídas se marcan con un punto azul y se destacan en azul claro." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Puedes marcar notificaciones como leídas individualmente o todas a la vez." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Las notificaciones se organizan por prioridad: Alta (roja), Media (ámbar), Baja (verde)." })
        ] })
      ] })
    ] }) })
  ] });
}
function CartaResponsabilidad({ proyectoId, userRole }) {
  const [cartas, setCartas] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(null);
  const [editando, setEditando] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    contratista: "",
    materiales_entregados: "",
    terminos_condiciones: "",
    notas: ""
  });
  reactExports.useEffect(() => {
    cargarCartas();
  }, [proyectoId]);
  const cargarCartas = async () => {
    try {
      setLoading(true);
      setCartas([
        {
          _id: "1",
          contratista: "Carlos López",
          fecha_firma: "2024-01-15T10:30:00Z",
          firma_url: "/uploads/firmas/firma_carlos.jpg",
          pdf_url: "/uploads/cartas/carta_carlos.pdf",
          estatus: "Firmada",
          materiales_entregados: "Cemento, Varilla, Pintura",
          terminos_condiciones: "Acepto la responsabilidad total de los materiales recibidos",
          notas: "Materiales entregados en perfecto estado",
          usuario_firma: "Carlos López"
        },
        {
          _id: "2",
          contratista: "María González",
          fecha_firma: null,
          firma_url: null,
          pdf_url: null,
          estatus: "Pendiente",
          materiales_entregados: "Azulejos, Cemento",
          terminos_condiciones: "",
          notas: "Esperando firma del contratista",
          usuario_firma: null
        }
      ]);
    } catch (err) {
      console.error("Error al cargar cartas:", err);
      setError("Error al cargar las cartas de responsabilidad");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contratista || !formData.materiales_entregados) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const nuevaCarta = {
        _id: Date.now().toString(),
        ...formData,
        fecha_firma: null,
        firma_url: null,
        pdf_url: null,
        estatus: "Pendiente",
        usuario_firma: null
      };
      setCartas((prev) => [nuevaCarta, ...prev]);
      setFormData({
        contratista: "",
        materiales_entregados: "",
        terminos_condiciones: "",
        notas: ""
      });
      setSuccess("Carta de responsabilidad creada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al crear carta:", err);
      setError("Error al crear la carta de responsabilidad");
    } finally {
      setLoading(false);
    }
  };
  const handleEditar = (carta) => {
    setEditando(carta._id);
    setFormData({
      contratista: carta.contratista,
      materiales_entregados: carta.materiales_entregados,
      terminos_condiciones: carta.terminos_condiciones,
      notas: carta.notas
    });
  };
  const handleActualizar = async () => {
    try {
      setLoading(true);
      setError(null);
      setCartas((prev) => prev.map(
        (c) => c._id === editando ? { ...c, ...formData } : c
      ));
      setEditando(null);
      setFormData({
        contratista: "",
        materiales_entregados: "",
        terminos_condiciones: "",
        notas: ""
      });
      setSuccess("Carta actualizada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al actualizar carta:", err);
      setError("Error al actualizar la carta");
    } finally {
      setLoading(false);
    }
  };
  const handleCancelar = () => {
    setEditando(null);
    setFormData({
      contratista: "",
      materiales_entregados: "",
      terminos_condiciones: "",
      notas: ""
    });
  };
  const handleEliminar = async (cartaId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta carta?")) {
      return;
    }
    try {
      setLoading(true);
      setCartas((prev) => prev.filter((c) => c._id !== cartaId));
      setSuccess("Carta eliminada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al eliminar carta:", err);
      setError("Error al eliminar la carta");
    } finally {
      setLoading(false);
    }
  };
  const firmarCarta = async (cartaId) => {
    try {
      setCartas((prev) => prev.map(
        (c) => c._id === cartaId ? {
          ...c,
          estatus: "Firmada",
          fecha_firma: (/* @__PURE__ */ new Date()).toISOString(),
          usuario_firma: "Usuario Actual"
          // TODO: Obtener del contexto
        } : c
      ));
      setSuccess("Carta firmada exitosamente");
      setTimeout(() => setSuccess(null), 3e3);
    } catch (err) {
      console.error("Error al firmar carta:", err);
      setError("Error al firmar la carta");
    }
  };
  const puedeCrear = userRole === "supervisor";
  const puedeEditar = userRole === "supervisor";
  const puedeFirmar = userRole === "contratista";
  const getEstatusColor = (estatus) => {
    const colors = {
      "Pendiente": "amber",
      "Firmada": "green",
      "Cancelada": "red"
    };
    return colors[estatus] || "gray";
  };
  const formatDate = (dateString) => {
    if (!dateString)
      return "Pendiente";
    return new Date(dateString).toLocaleDateString("es-MX");
  };
  const descargarPDF = (pdfUrl) => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "carta_responsabilidad.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const verFirma = (firmaUrl) => {
    if (firmaUrl) {
      window.open(firmaUrl, "_blank");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTextIcon, { className: "h-8 w-8 text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Carta de Responsabilidad" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Gestión de responsabilidades por materiales entregados" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-5 w-5" }),
      error
    ] }),
    success && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "green", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-5 w-5" }),
      success
    ] }),
    puedeCrear && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: editando ? "Editar Carta" : "Nueva Carta de Responsabilidad" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Contratista *",
              name: "contratista",
              value: formData.contratista,
              onChange: handleInputChange,
              required: true,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Input,
            {
              label: "Materiales Entregados *",
              name: "materiales_entregados",
              value: formData.materiales_entregados,
              onChange: handleInputChange,
              required: true,
              placeholder: "Ej: Cemento, Varilla, Pintura"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Textarea,
          {
            label: "Términos y Condiciones",
            name: "terminos_condiciones",
            value: formData.terminos_condiciones,
            onChange: handleInputChange,
            rows: 4,
            placeholder: "Términos legales de responsabilidad..."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Textarea,
          {
            label: "Notas Adicionales",
            name: "notas",
            value: formData.notas,
            onChange: handleInputChange,
            rows: 3,
            placeholder: "Observaciones sobre la entrega..."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          editando && /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: "button",
              variant: "outlined",
              color: "red",
              onClick: handleCancelar,
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: editando ? "button" : "submit",
              variant: "gradient",
              color: editando ? "blue" : "green",
              onClick: editando ? handleActualizar : void 0,
              disabled: loading,
              className: "flex items-center gap-2",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "sm" }) : editando ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" }),
                "Actualizar"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTextIcon, { className: "h-4 w-4" }),
                "Crear Carta"
              ] })
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue-gray", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "white", children: [
        "Cartas de Responsabilidad (",
        cartas.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: cartas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTextIcon, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: "No hay cartas de responsabilidad" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Contratista" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Materiales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Estatus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Fecha Firma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Documentos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Acciones" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableBody, { children: cartas.map((carta) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Avatar,
              {
                src: carta.firma_url,
                alt: carta.contratista,
                size: "sm",
                className: "border-2 border-gray-200"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: carta.contratista }),
              carta.notas && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "italic", children: carta.notas })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: carta.materiales_entregados }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Chip,
            {
              value: carta.estatus,
              color: getEstatusColor(carta.estatus),
              size: "sm"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-4 w-4 text-blue-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", children: formatDate(carta.fecha_firma) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            carta.pdf_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "blue",
                onClick: () => descargarPDF(carta.pdf_url),
                className: "p-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownTrayIcon$2, { className: "h-4 w-4" })
              }
            ),
            carta.firma_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "green",
                onClick: () => verFirma(carta.firma_url),
                className: "p-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "blue",
                className: "p-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
              }
            ),
            puedeEditar && carta.estatus === "Pendiente" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "blue",
                onClick: () => handleEditar(carta),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-4 w-4" })
              }
            ),
            puedeEditar && carta.estatus === "Pendiente" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "red",
                onClick: () => handleEliminar(carta._id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-4 w-4" })
              }
            ),
            puedeFirmar && carta.estatus === "Pendiente" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Button,
              {
                size: "sm",
                variant: "text",
                color: "green",
                onClick: () => firmarCarta(carta._id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, carta._id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "bg-amber-50 border-amber-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h6", color: "amber", className: "mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationTriangleIcon$1, { className: "h-6 w-6" }),
        "Información Legal Importante"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-amber-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", children: "La carta de responsabilidad es un documento legal que establece la responsabilidad del contratista sobre los materiales recibidos." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-amber-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", children: "Al firmar, el contratista acepta ser responsable del uso, cuidado y custodia de los materiales entregados." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-amber-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", children: "En caso de daño, pérdida o mal uso, el contratista será responsable de los costos de reposición." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-amber-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", children: "La firma debe realizarse únicamente por el contratista asignado al proyecto." })
        ] })
      ] })
    ] }) })
  ] });
}
function Reportes({ proyectoId, userRole }) {
  const [reportes, setReportes] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [filtroPeriodo, setFiltroPeriodo] = reactExports.useState("mes");
  const [filtroTipo, setFiltroTipo] = reactExports.useState("todos");
  reactExports.useEffect(() => {
    cargarReportes();
  }, [proyectoId, filtroPeriodo, filtroTipo]);
  const cargarReportes = async () => {
    try {
      setLoading(true);
      setReportes({
        resumen_financiero: {
          presupuesto_estimado: 15e4,
          presupuesto_total: 125e3,
          gastos_administrativos: 25e3,
          gastos_materiales: 1e5,
          diferencia: 25e3,
          porcentaje_utilizado: 83.33
        },
        metricas_tiempo: {
          tiempo_promedio_aprobacion: 2.5,
          // días
          tiempo_promedio_compra: 1.8,
          // días
          tiempo_promedio_entrega: 0.5,
          // días
          eficiencia_aprobaciones: 85.5
          // porcentaje
        },
        gastos_por_tipo: [
          { tipo: "Cemento", cantidad: 15, costo_total: 3750, porcentaje: 3.75 },
          { tipo: "Varilla", cantidad: 50, costo_total: 15e3, porcentaje: 15 },
          { tipo: "Pintura", cantidad: 20, costo_total: 8e3, porcentaje: 8 },
          { tipo: "Azulejos", cantidad: 100, costo_total: 8500, porcentaje: 8.5 },
          { tipo: "Herramientas", cantidad: 10, costo_total: 5e3, porcentaje: 5 }
        ],
        solicitudes_estado: [
          { estatus: "Solicitando material", cantidad: 3, porcentaje: 20 },
          { estatus: "Aprobacion administrativa", cantidad: 2, porcentaje: 13.3 },
          { estatus: "Aprobado para su compra", cantidad: 4, porcentaje: 26.7 },
          { estatus: "En proceso de entrega", cantidad: 3, porcentaje: 20 },
          { estatus: "Entregado", cantidad: 3, porcentaje: 20 }
        ],
        tendencias_mensuales: [
          { mes: "Enero", gastos: 45e3, solicitudes: 8, aprobaciones: 6 },
          { mes: "Febrero", gastos: 38e3, solicitudes: 5, aprobaciones: 4 },
          { mes: "Marzo", gastos: 42e3, solicitudes: 7, aprobaciones: 5 }
        ],
        alertas: [
          { tipo: "presupuesto", mensaje: "El proyecto ha utilizado el 83.33% del presupuesto", prioridad: "media" },
          { tipo: "tiempo", mensaje: "Tiempo promedio de aprobación: 2.5 días", prioridad: "baja" },
          { tipo: "materiales", mensaje: "3 solicitudes pendientes de aprobación", prioridad: "alta" }
        ]
      });
    } catch (err) {
      console.error("Error al cargar reportes:", err);
      setError("Error al cargar los reportes");
    } finally {
      setLoading(false);
    }
  };
  const exportarReporte = (formato) => {
    console.log(`Exportando reporte en formato ${formato}`);
    alert(`Reporte exportado en formato ${formato}`);
  };
  const getPrioridadColor = (prioridad) => {
    const colors = {
      "alta": "red",
      "media": "amber",
      "baja": "green"
    };
    return colors[prioridad] || "gray";
  };
  const getTendenciaIcon = (valor, tipo) => {
    if (tipo === "gastos") {
      return valor > 4e4 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowTrendingUpIcon, { className: "h-4 w-4 text-red-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowTrendingDownIcon, { className: "h-4 w-4 text-green-500" });
    }
    return null;
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "mb-4", children: error });
  }
  if (!reportes) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: "No hay datos de reportes disponibles" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartBarIcon$1, { className: "h-8 w-8 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Reportes y Métricas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Análisis financiero y métricas de rendimiento del proyecto" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Período",
            value: filtroPeriodo,
            onChange: (value) => setFiltroPeriodo(value),
            className: "w-32",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "semana", children: "Semana" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "mes", children: "Mes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "trimestre", children: "Trimestre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "año", children: "Año" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Tipo",
            value: filtroTipo,
            onChange: (value) => setFiltroTipo(value),
            className: "w-40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "todos", children: "Todos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "financiero", children: "Financiero" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "operativo", children: "Operativo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "materiales", children: "Materiales" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            variant: "outlined",
            color: "blue",
            onClick: () => exportarReporte("PDF"),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownTrayIcon$2, { className: "h-4 w-4" }),
              "Exportar"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Resumen Financiero" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-blue-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "blue", className: "font-bold", children: formatCurrency(reportes.resumen_financiero.presupuesto_estimado) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Presupuesto Estimado" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "green", className: "font-bold", children: formatCurrency(reportes.resumen_financiero.presupuesto_total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", children: "Presupuesto Total" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-amber-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "amber", className: "font-bold", children: formatCurrency(reportes.resumen_financiero.diferencia) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", children: "Diferencia" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "purple", className: "font-bold", children: [
              reportes.resumen_financiero.porcentaje_utilizado,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "purple", children: "Presupuesto Utilizado" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-red-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "red", className: "mb-2", children: "Gastos Administrativos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "red", className: "font-bold", children: formatCurrency(reportes.resumen_financiero.gastos_administrativos) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "mb-2", children: "Gastos de Materiales" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "purple", className: "font-bold", children: formatCurrency(reportes.resumen_financiero.gastos_materiales) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "green", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Métricas de Tiempo y Eficiencia" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClockIcon$1, { className: "h-8 w-8 text-blue-500 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "blue", className: "font-bold", children: [
            reportes.metricas_tiempo.tiempo_promedio_aprobacion,
            " días"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Tiempo Promedio de Aprobación" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-8 w-8 text-green-500 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "green", className: "font-bold", children: [
            reportes.metricas_tiempo.tiempo_promedio_compra,
            " días"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", children: "Tiempo Promedio de Compra" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-8 w-8 text-purple-500 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "purple", className: "font-bold", children: [
            reportes.metricas_tiempo.tiempo_promedio_entrega,
            " días"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "purple", children: "Tiempo Promedio de Entrega" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-amber-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircleIcon$1, { className: "h-8 w-8 text-amber-500 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h4", color: "amber", className: "font-bold", children: [
            reportes.metricas_tiempo.eficiencia_aprobaciones,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "amber", children: "Eficiencia en Aprobaciones" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "purple", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Gastos por Tipo de Material" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Tipo de Material" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Cantidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Costo Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Porcentaje" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableBody, { children: reportes.gastos_por_tipo.map((material, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: material.tipo }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: material.cantidad }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium text-green-600", children: formatCurrency(material.costo_total) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Chip,
            {
              value: `${material.porcentaje}%`,
              color: "purple",
              size: "sm",
              variant: "ghost"
            }
          ) })
        ] }, index2)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "amber", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Estado de Solicitudes de Materiales" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Estatus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Cantidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Porcentaje" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Indicador" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableBody, { children: reportes.solicitudes_estado.map((estado, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: estado.estatus }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: estado.cantidad }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", children: [
            estado.porcentaje,
            "%"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-amber-500 h-2 rounded-full",
              style: { width: `${estado.porcentaje}%` }
            }
          ) }) })
        ] }, index2)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue-gray", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Tendencias Mensuales" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Mes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Gastos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Solicitudes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Aprobaciones" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableHeaderCell, { children: "Tendencia" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableBody, { children: reportes.tendencias_mensuales.map((tendencia, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: tendencia.mes }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "font-medium", children: formatCurrency(tendencia.gastos) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: tendencia.solicitudes }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: tendencia.aprobaciones }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.TableCell, { children: getTendenciaIcon(tendencia.gastos, "gastos") })
        ] }, index2)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "red", variant: "gradient", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "white", children: "Alertas y Recomendaciones" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: reportes.alertas.map((alerta, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `p-4 rounded-lg border-l-4 ${alerta.prioridad === "alta" ? "bg-red-50 border-red-500" : alerta.prioridad === "media" ? "bg-amber-50 border-amber-500" : "bg-green-50 border-green-500"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationTriangleIcon$1, { className: `h-5 w-5 mt-0.5 ${alerta.prioridad === "alta" ? "text-red-500" : alerta.prioridad === "media" ? "text-amber-500" : "text-green-500"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium mb-1", children: alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: alerta.mensaje })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: alerta.prioridad,
                color: getPrioridadColor(alerta.prioridad),
                size: "sm"
              }
            )
          ] })
        },
        index2
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "bg-blue-50 border-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Sistema de Reportes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Los reportes se actualizan en tiempo real según las acciones realizadas en el sistema." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Puedes filtrar por período y tipo de reporte para obtener información más específica." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Los reportes se pueden exportar en diferentes formatos para análisis externo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: "Las alertas se generan automáticamente cuando se detectan situaciones que requieren atención." })
        ] })
      ] })
    ] }) })
  ] });
}
const API_BASE_URL = "https://lead-inmobiliaria.com";
class RemodelacionService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/captaciones`;
  }
  /**
   * Obtener token de autenticación
   */
  getAuthToken() {
    return localStorage.getItem("token");
  }
  /**
   * Configurar headers de la petición
   */
  getHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getAuthToken()}`
    };
  }
  /**
   * Realizar petición HTTP
   */
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        // Para enviar cookies automáticamente
        ...options
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error en petición HTTP:", error);
      throw error;
    }
  }
  /**
   * Obtener información completa de remodelación
   */
  async getRemodelacionData(proyectoId) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion`);
  }
  /**
   * Establecer presupuesto estimado
   */
  async establecerPresupuesto(proyectoId, presupuestoEstimado) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/presupuesto`, {
      method: "POST",
      body: JSON.stringify({ presupuesto_estimado: presupuestoEstimado })
    });
  }
  /**
   * Registrar gasto administrativo
   */
  async registrarGastoAdministrativo(proyectoId, gastoData) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/gasto-administrativo`, {
      method: "POST",
      body: JSON.stringify(gastoData)
    });
  }
  /**
   * Solicitar material
   */
  async solicitarMaterial(proyectoId, solicitudData) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/solicitar-material`, {
      method: "POST",
      body: JSON.stringify(solicitudData)
    });
  }
  /**
   * Agregar costo a solicitud
   */
  async agregarCosto(proyectoId, materialId, costo) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/agregar-costo`, {
      method: "PUT",
      body: JSON.stringify({ costo })
    });
  }
  /**
   * Aprobar solicitud de material
   */
  async aprobarSolicitud(proyectoId, materialId) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/aprobar`, {
      method: "PUT"
    });
  }
  /**
   * Registrar compra de material
   */
  async registrarCompra(proyectoId, materialId, compraData) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/registrar-compra`, {
      method: "PUT",
      body: JSON.stringify(compraData)
    });
  }
  /**
   * Entregar material
   */
  async entregarMaterial(proyectoId, materialId, entregaData) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/entregar`, {
      method: "PUT",
      body: JSON.stringify(entregaData)
    });
  }
  /**
   * Firmar carta de responsabilidad
   */
  async firmarCartaResponsabilidad(proyectoId, firmaData) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/firmar-carta`, {
      method: "POST",
      body: JSON.stringify(firmaData)
    });
  }
  /**
   * Obtener reportes
   */
  async obtenerReportes(proyectoId, filtros = {}) {
    const queryParams = new URLSearchParams(filtros).toString();
    const url = queryParams ? `${this.baseURL}/${proyectoId}/remodelacion/reportes?${queryParams}` : `${this.baseURL}/${proyectoId}/remodelacion/reportes`;
    return this.makeRequest(url);
  }
  /**
   * Obtener materiales del proyecto
   */
  async obtenerMateriales(proyectoId, filtros = {}) {
    const queryParams = new URLSearchParams(filtros).toString();
    const url = queryParams ? `${this.baseURL}/${proyectoId}/remodelacion/materiales?${queryParams}` : `${this.baseURL}/${proyectoId}/remodelacion/materiales`;
    return this.makeRequest(url);
  }
  /**
   * Obtener notificaciones del proyecto
   */
  async obtenerNotificaciones(proyectoId, filtros = {}) {
    const queryParams = new URLSearchParams(filtros).toString();
    const url = queryParams ? `${this.baseURL}/${proyectoId}/remodelacion/notificaciones?${queryParams}` : `${this.baseURL}/${proyectoId}/remodelacion/notificaciones`;
    return this.makeRequest(url);
  }
  /**
   * Marcar notificación como leída
   */
  async marcarNotificacionLeida(proyectoId, notificacionId) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/notificacion/${notificacionId}/marcar-leida`, {
      method: "PUT"
    });
  }
  /**
   * Subir archivo (firma o comprobante)
   */
  async subirArchivo(archivo, tipo = "general") {
    try {
      const formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("tipo", tipo);
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        },
        body: formData
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al subir archivo:", error);
      throw error;
    }
  }
  /**
   * Generar PDF de carta de responsabilidad
   */
  async generarPDFCarta(proyectoId, datosCarta) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/generar-carta-pdf`, {
      method: "POST",
      body: JSON.stringify(datosCarta)
    });
  }
  /**
   * Obtener estadísticas del proyecto
   */
  async obtenerEstadisticas(proyectoId, filtros = {}) {
    const queryParams = new URLSearchParams(filtros).toString();
    const url = queryParams ? `${this.baseURL}/${proyectoId}/remodelacion/estadisticas?${queryParams}` : `${this.baseURL}/${proyectoId}/remodelacion/estadisticas`;
    return this.makeRequest(url);
  }
  /**
   * Exportar reporte a Excel
   */
  async exportarReporteExcel(proyectoId, filtros = {}) {
    try {
      const queryParams = new URLSearchParams(filtros).toString();
      const url = queryParams ? `${this.baseURL}/${proyectoId}/remodelacion/exportar-excel?${queryParams}` : `${this.baseURL}/${proyectoId}/remodelacion/exportar-excel`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `reporte-remodelacion-${proyectoId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
      return { success: true, message: "Reporte exportado exitosamente" };
    } catch (error) {
      console.error("Error al exportar reporte:", error);
      throw error;
    }
  }
  /**
   * Obtener historial de cambios de estatus
   */
  async obtenerHistorialEstatus(proyectoId) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/historial-estatus`);
  }
  /**
   * Actualizar supervisor de remodelación
   */
  async actualizarSupervisor(proyectoId, supervisorId) {
    return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/supervisor`, {
      method: "PUT",
      body: JSON.stringify({ supervisor_id: supervisorId })
    });
  }
  /**
   * Obtener usuarios por rol
   */
  async obtenerUsuariosPorRol(rol) {
    return this.makeRequest(`${API_BASE_URL}/users?role=${rol}`);
  }
  /**
   * Validar permisos del usuario
   */
  async validarPermisos(accion) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate-permissions`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ accion })
      });
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error al validar permisos:", error);
      return false;
    }
  }
}
const remodelacionService = new RemodelacionService();
const {
  getRemodelacionData,
  establecerPresupuesto,
  registrarGastoAdministrativo,
  solicitarMaterial,
  agregarCosto,
  aprobarSolicitud,
  registrarCompra,
  entregarMaterial,
  firmarCartaResponsabilidad,
  obtenerReportes,
  obtenerMateriales,
  obtenerNotificaciones,
  marcarNotificacionLeida,
  subirArchivo,
  generarPDFCarta,
  obtenerEstadisticas,
  exportarReporteExcel,
  obtenerHistorialEstatus,
  actualizarSupervisor,
  obtenerUsuariosPorRol,
  validarPermisos
} = remodelacionService;
const TABS = [
  {
    label: "Presupuesto",
    value: "presupuesto",
    icon: CurrencyDollarIcon$1
  },
  {
    label: "Gastos Administrativos",
    value: "gastos-admin",
    icon: ClipboardDocumentListIcon
  },
  {
    label: "Solicitudes de Material",
    value: "solicitudes",
    icon: TruckIcon
  },
  {
    label: "Carta de Responsabilidad",
    value: "carta",
    icon: DocumentTextIcon
  },
  {
    label: "Reportes",
    value: "reportes",
    icon: ChartBarIcon$1
  },
  {
    label: "Notificaciones",
    value: "notificaciones",
    icon: BellIcon$1
  }
];
const DetalleRemodelacion = () => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("presupuesto");
  const [proyecto, setProyecto] = reactExports.useState(null);
  const [remodelacionData, setRemodelacionData] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [notificacionesNoLeidas, setNotificacionesNoLeidas] = reactExports.useState(0);
  const formatearDireccion = (direccion) => {
    if (!direccion || typeof direccion !== "object")
      return "N/A";
    const { calle, numero, colonia, ciudad } = direccion;
    return `${calle || ""} ${numero || ""}, ${colonia || ""}, ${ciudad || ""}`.replace(/,\s*,/g, ",").replace(/^,\s*|,\s*$/g, "") || "N/A";
  };
  reactExports.useEffect(() => {
    const inicializar = async () => {
      try {
        const response = await axios.get("/api/auth/check");
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        }
      } catch (error2) {
        console.warn("Error al verificar autenticación:", error2);
      }
      await cargarDatosProyecto();
    };
    inicializar();
  }, [id]);
  const cargarDatosProyecto = async () => {
    var _a2;
    try {
      setLoading(true);
      setError(null);
      const proyectoResponse = await captacionesAPI.getById(id);
      if (proyectoResponse) {
        setProyecto(proyectoResponse);
        if (proyectoResponse.estatus_actual !== "Remodelacion") {
          setError("Este proyecto no está en estatus de remodelación");
          return;
        }
        try {
          const remodelacionResponse = await remodelacionService.getRemodelacionData(id);
          if (remodelacionResponse.success) {
            setRemodelacionData(remodelacionResponse.data);
            setNotificacionesNoLeidas(((_a2 = remodelacionResponse.data.notificaciones) == null ? void 0 : _a2.length) || 0);
          }
        } catch (remodelacionError) {
          console.warn("No se pudieron cargar datos específicos de remodelación:", remodelacionError);
        }
      } else {
        setError("Proyecto no encontrado");
      }
    } catch (error2) {
      console.error("Error al cargar datos del proyecto:", error2);
      setError("Error al cargar los datos del proyecto");
    } finally {
      setLoading(false);
    }
  };
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  const formatCurrency = (amount) => {
    if (!amount || amount === 0)
      return "$0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg", className: "mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", children: "Cargando proyecto de remodelación..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 mb-8 mx-3 lg:mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", className: "flex items-center gap-2", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          color: "blue",
          onClick: () => navigate("/dashboard/remodelacion"),
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-4 w-4" }),
            "Volver a Remodelación"
          ]
        }
      ) })
    ] });
  }
  if (!proyecto) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", children: "Proyecto no encontrado" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 mb-8 flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-8 w-8 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "white", children: "Proyecto en Remodelación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "white", className: "mt-1", children: [
            ((_a = proyecto.propiedad) == null ? void 0 : _a.tipo) || "Propiedad",
            " - ",
            formatearDireccion((_b = proyecto.propiedad) == null ? void 0 : _b.direccion)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            variant: "outlined",
            color: "white",
            className: "flex items-center gap-2",
            onClick: () => navigate(`/dashboard/remodelacion/${id}/editar`),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon$1, { className: "h-5 w-5" }),
              "Editar"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            variant: "outlined",
            color: "white",
            className: "flex gap-2",
            onClick: () => navigate("/dashboard/remodelacion"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-4 w-4" }),
              "Volver"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información del Proyecto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Propietario:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_c = proyecto.propietario) == null ? void 0 : _c.nombre) || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Tipo de Propiedad:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_d = proyecto.propiedad) == null ? void 0 : _d.tipo) || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Dirección:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatearDireccion((_e = proyecto.propiedad) == null ? void 0 : _e.direccion) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Estatus:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Chip,
            {
              value: proyecto.estatus_actual,
              color: "blue",
              size: "sm",
              className: "mt-1"
            }
          )
        ] })
      ] }),
      remodelacionData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información de Remodelación" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Presupuesto Estimado:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "font-bold mt-1", children: remodelacionData.presupuesto_estimado ? formatCurrency(remodelacionData.presupuesto_estimado) : "Sin presupuesto" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Gastos Totales:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "purple", className: "font-bold mt-1", children: formatCurrency(
              ((_f = remodelacionData.gastos) == null ? void 0 : _f.reduce((sum, gasto) => sum + (gasto.costo || 0), 0)) || 0
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Supervisor:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_g = remodelacionData.supervisor) == null ? void 0 : _g.nombre) || "Sin asignar" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Tabs, { value: activeTab, className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.TabsHeader, { className: "mb-6 flex flex-wrap md:flex-nowrap h-auto md:h-12 py-2 gap-1 bg-blue-gray-50 overflow-x-auto md:overflow-x-auto hide-scrollbar", children: TABS.map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Tab,
        {
          value,
          onClick: () => handleTabChange(value),
          className: `py-2 px-3 whitespace-nowrap rounded-md transition-all flex items-center gap-2 ${activeTab === value ? "bg-white shadow-sm font-medium" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
            label,
            value === "notificaciones" && notificacionesNoLeidas > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: notificacionesNoLeidas,
                color: "red",
                size: "sm",
                className: "ml-1"
              }
            )
          ]
        },
        value
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
        activeTab === "presupuesto" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Presupuesto,
          {
            proyectoId: id,
            userRole: (user == null ? void 0 : user.role) || "guest",
            proyecto,
            remodelacionData
          }
        ),
        activeTab === "gastos-admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          MaterialForm,
          {
            proyectoId: id,
            userRole: "administrator"
          }
        ),
        activeTab === "solicitudes" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SolicitudForm,
          {
            proyectoId: id,
            userRole: "administrator"
          }
        ),
        activeTab === "carta" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartaResponsabilidad,
          {
            proyectoId: id,
            userRole: "administrator"
          }
        ),
        activeTab === "reportes" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Reportes,
          {
            proyectoId: id,
            userRole: "administrator"
          }
        ),
        activeTab === "notificaciones" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Notificaciones,
          {
            proyectoId: id,
            userRole: "administrator"
          }
        )
      ] })
    ] }) }) })
  ] });
};
const EditarRemodelacion = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState("");
  const formatearDireccion = (direccion) => {
    if (!direccion || typeof direccion !== "object")
      return "N/A";
    const { calle, numero, colonia, ciudad } = direccion;
    return `${calle || ""} ${numero || ""}, ${colonia || ""}, ${ciudad || ""}`.replace(/,\s*,/g, ",").replace(/^,\s*|,\s*$/g, "") || "N/A";
  };
  const [formData, setFormData] = reactExports.useState({
    presupuesto_estimado: "",
    supervisor_id: "",
    fecha_inicio: "",
    fecha_fin: "",
    notas: ""
  });
  const [supervisores, setSupervisores] = reactExports.useState([]);
  reactExports.useEffect(() => {
    cargarDatosProyecto();
    cargarSupervisores();
  }, [id]);
  const cargarDatosProyecto = async () => {
    var _a2, _b2, _c2;
    try {
      setLoading(true);
      setError(null);
      axios.defaults.baseURL = "http://localhost:4000";
      axios.defaults.withCredentials = true;
      const response = await axios.get(`/api/captaciones/${id}`);
      const proyectoData = response.data;
      if (proyectoData) {
        setProyecto(proyectoData);
        if (proyectoData.estatus_actual !== "Remodelacion") {
          setError("Este proyecto no está en estatus de remodelación");
          return;
        }
        setFormData({
          presupuesto_estimado: proyectoData.presupuesto_estimado || "",
          supervisor_id: proyectoData.supervisor_id || "",
          fecha_inicio: ((_a2 = proyectoData.remodelacion) == null ? void 0 : _a2.fecha_inicio) ? new Date(proyectoData.remodelacion.fecha_inicio).toISOString().split("T")[0] : "",
          fecha_fin: ((_b2 = proyectoData.remodelacion) == null ? void 0 : _b2.fecha_fin) ? new Date(proyectoData.remodelacion.fecha_fin).toISOString().split("T")[0] : "",
          notas: ((_c2 = proyectoData.remodelacion) == null ? void 0 : _c2.notas) || ""
        });
      } else {
        setError("Proyecto no encontrado");
      }
    } catch (error2) {
      console.error("Error al cargar datos del proyecto:", error2);
      setError("Error al cargar los datos del proyecto");
    } finally {
      setLoading(false);
    }
  };
  const cargarSupervisores = async () => {
    try {
      setSupervisores([
        { _id: "1", nombre: "Supervisor 1", email: "supervisor1@example.com" },
        { _id: "2", nombre: "Supervisor 2", email: "supervisor2@example.com" }
      ]);
    } catch (error2) {
      console.error("Error al cargar supervisores:", error2);
    }
  };
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const validarFormulario = () => {
    if (!formData.presupuesto_estimado || parseFloat(formData.presupuesto_estimado) <= 0) {
      setError("El presupuesto estimado es requerido y debe ser mayor a 0");
      return false;
    }
    if (formData.fecha_inicio && formData.fecha_fin) {
      const fechaInicio = new Date(formData.fecha_inicio);
      const fechaFin = new Date(formData.fecha_fin);
      if (fechaInicio >= fechaFin) {
        setError("La fecha de fin debe ser posterior a la fecha de inicio");
        return false;
      }
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      if (formData.presupuesto_estimado) {
        const presupuestoResponse = await establecerPresupuesto(id, parseFloat(formData.presupuesto_estimado));
        if (!presupuestoResponse.success) {
          throw new Error(presupuestoResponse.message || "Error al establecer presupuesto");
        }
      }
      if (formData.supervisor_id) {
        const supervisorResponse = await actualizarSupervisor(id, formData.supervisor_id);
        if (!supervisorResponse.success) {
          throw new Error(supervisorResponse.message || "Error al actualizar supervisor");
        }
      }
      setSuccess("Proyecto de remodelación actualizado exitosamente");
      setTimeout(() => {
        cargarDatosProyecto();
      }, 1e3);
    } catch (error2) {
      console.error("Error al guardar:", error2);
      setError(error2.message || "Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };
  const formatCurrency = (amount) => {
    if (!amount || amount === 0)
      return "$0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg", className: "mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", children: "Cargando proyecto de remodelación..." })
    ] }) });
  }
  if (error && !proyecto) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 mb-8 mx-3 lg:mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationTriangleIcon, { className: "h-5 w-5" }),
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          color: "blue",
          onClick: () => navigate("/dashboard/remodelacion"),
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-4 w-4" }),
            "Volver a Remodelación"
          ]
        }
      ) })
    ] });
  }
  if (!proyecto) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 mb-8 mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Alert, { color: "red", children: "Proyecto no encontrado" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 mb-8 flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-8 w-8 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "white", children: "Editar Proyecto de Remodelación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "white", className: "mt-1", children: [
            ((_a = proyecto.propiedad) == null ? void 0 : _a.tipo) || "Propiedad",
            " - ",
            formatearDireccion((_b = proyecto.propiedad) == null ? void 0 : _b.direccion)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-4 md:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        react.Button,
        {
          variant: "outlined",
          color: "white",
          className: "flex items-center gap-2",
          onClick: () => navigate(`/dashboard/remodelacion/${id}`),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeftIcon, { className: "h-4 w-4" }),
            "Volver al Detalle"
          ]
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "Información del Proyecto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Propietario:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_c = proyecto.propietario) == null ? void 0 : _c.nombre) || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Tipo de Propiedad:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_d = proyecto.propiedad) == null ? void 0 : _d.tipo) || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Dirección:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: formatearDireccion((_e = proyecto.propiedad) == null ? void 0 : _e.direccion) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-gray-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Estatus:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Chip,
            {
              value: proyecto.estatus_actual,
              color: "blue",
              size: "sm",
              className: "mt-1"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "mx-3 lg:mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "green", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "white", children: "Configuración de Remodelación" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Presupuesto Estimado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Input,
                {
                  type: "number",
                  label: "Presupuesto Estimado (MXN)",
                  value: formData.presupuesto_estimado,
                  onChange: (e) => handleInputChange("presupuesto_estimado", e.target.value),
                  placeholder: "0.00",
                  step: "0.01",
                  min: "0",
                  required: true,
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDollarIcon$1, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: "Presupuesto total estimado para la remodelación" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Presupuesto Actual:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "green", className: "font-bold mt-1", children: ((_f = proyecto.remodelacion) == null ? void 0 : _f.presupuesto_estimado) ? formatCurrency(proyecto.remodelacion.presupuesto_estimado) : "Sin presupuesto" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Supervisor Asignado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Select,
                {
                  label: "Seleccionar Supervisor",
                  value: formData.supervisor_id,
                  onChange: (value) => handleInputChange("supervisor_id", value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "", children: "Sin supervisor" }),
                    supervisores.map((supervisor) => /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Option, { value: supervisor._id, children: [
                      supervisor.nombre,
                      " - ",
                      supervisor.email
                    ] }, supervisor._id))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: "Supervisor responsable de la obra" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: "Supervisor Actual:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "mt-1", children: ((_h = (_g = proyecto.remodelacion) == null ? void 0 : _g.supervisor) == null ? void 0 : _h.nombre) || "Sin asignar" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Fechas de Remodelación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Input,
                {
                  type: "date",
                  label: "Fecha de Inicio",
                  value: formData.fecha_inicio,
                  onChange: (e) => handleInputChange("fecha_inicio", e.target.value),
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: "Fecha estimada de inicio de la remodelación" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Input,
                {
                  type: "date",
                  label: "Fecha de Finalización",
                  value: formData.fecha_fin,
                  onChange: (e) => handleInputChange("fecha_fin", e.target.value),
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: "Fecha estimada de finalización" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-3", children: "Notas y Observaciones" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Textarea,
            {
              label: "Notas sobre la remodelación",
              value: formData.notas,
              onChange: (e) => handleInputChange("notas", e.target.value),
              placeholder: "Agregar notas, observaciones o instrucciones especiales para la remodelación...",
              rows: 4
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "mt-1", children: "Información adicional relevante para el proyecto" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationTriangleIcon, { className: "h-5 w-5" }),
          error
        ] }),
        success && /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "green", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-5 w-5" }),
          success
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              type: "submit",
              color: "green",
              size: "lg",
              disabled: saving,
              className: "flex items-center gap-2",
              children: [
                saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-5 w-5" }),
                saving ? "Guardando..." : "Guardar Cambios"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Button,
            {
              type: "button",
              color: "gray",
              size: "lg",
              variant: "outlined",
              onClick: () => navigate(`/dashboard/remodelacion/${id}`),
              disabled: saving,
              children: "Cancelar"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
};
axios.defaults.baseURL = "https://lead-inmobiliaria.com";
axios.defaults.withCredentials = true;
const ListasCompraAdminPage = () => {
  var _a, _b, _c;
  const navigate = useNavigate();
  const [listasCompra, setListasCompra] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [filtros, setFiltros] = reactExports.useState({
    busqueda: "",
    estatus: "todos",
    proyecto: "todos"
  });
  const [proyectos, setProyectos] = reactExports.useState([]);
  const [showDetallesModal, setShowDetallesModal] = reactExports.useState(false);
  const [listaSeleccionada, setListaSeleccionada] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          navigate("/auth/sign-in");
        }
      } catch (error2) {
        console.error("Error al verificar autenticación:", error2);
        navigate("/auth/sign-in");
      }
    };
    checkAuth();
  }, [navigate]);
  reactExports.useEffect(() => {
    if (user) {
      cargarListasCompra();
      cargarProyectos();
    }
  }, [user]);
  const cargarListasCompra = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📋 Cargando listas de compra para administración...");
      const response = await axios.get("/api/lista-compra/admin/pendientes");
      console.log("📡 Respuesta del servidor:", response.data);
      if (response.data.success) {
        setListasCompra(response.data.data || []);
        console.log("✅ Listas de compra cargadas:", response.data.data.length);
      } else {
        throw new Error("Error al cargar listas de compra");
      }
    } catch (error2) {
      console.error("❌ Error al cargar listas de compra:", error2);
      setError(`Error al cargar las listas de compra: ${error2.message}`);
    } finally {
      setLoading(false);
    }
  };
  const cargarProyectos = async () => {
    try {
      const response = await axios.get("/api/captaciones", {
        params: { estatus: "Remodelacion" }
      });
      if (response.data && Array.isArray(response.data)) {
        setProyectos(response.data);
      }
    } catch (error2) {
      console.error("Error al cargar proyectos:", error2);
    }
  };
  const handleFiltroChange = (name, value) => {
    setFiltros((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      estatus: "todos",
      proyecto: "todos"
    });
  };
  const aprobarListaCompra = async (listaId) => {
    var _a2, _b2;
    try {
      setLoading(true);
      setError(null);
      console.log("✅ Aprobando lista de compra:", listaId);
      const response = await axios.post(`/api/lista-compra/${listaId}/admin/aprobar`, {
        comentarios: "Lista de compra aprobada por administración"
      });
      if (response.data.success) {
        console.log("✅ Lista de compra aprobada exitosamente");
        await cargarListasCompra();
      } else {
        throw new Error(response.data.message || "Error al aprobar lista de compra");
      }
    } catch (error2) {
      console.error("❌ Error al aprobar lista de compra:", error2);
      setError(((_b2 = (_a2 = error2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || error2.message || "Error al aprobar lista de compra");
    } finally {
      setLoading(false);
    }
  };
  const rechazarListaCompra = async (listaId) => {
    var _a2, _b2;
    try {
      setLoading(true);
      setError(null);
      const motivo = prompt("¿Motivo del rechazo?");
      if (!motivo) {
        setLoading(false);
        return;
      }
      console.log("❌ Rechazando lista de compra:", listaId, "Motivo:", motivo);
      const response = await axios.post(`/api/lista-compra/${listaId}/admin/rechazar`, {
        motivo_rechazo: motivo,
        comentarios: `Lista de compra rechazada por administración - Motivo: ${motivo}`
      });
      if (response.data.success) {
        console.log("✅ Lista de compra rechazada exitosamente");
        await cargarListasCompra();
      } else {
        throw new Error(response.data.message || "Error al rechazar lista de compra");
      }
    } catch (error2) {
      console.error("❌ Error al rechazar lista de compra:", error2);
      setError(((_b2 = (_a2 = error2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || error2.message || "Error al rechazar lista de compra");
    } finally {
      setLoading(false);
    }
  };
  const abrirModalDetalles = (lista) => {
    setListaSeleccionada(lista);
    setShowDetallesModal(true);
  };
  const cerrarModalDetalles = () => {
    setShowDetallesModal(false);
    setListaSeleccionada(null);
  };
  const imprimirOrdenCompra = (lista) => {
    console.log("🖨️ Imprimiendo orden de compra para:", lista._id);
    alert("Funcionalidad de impresión será implementada próximamente");
  };
  const formatearDireccion = (direccion) => {
    if (!direccion || typeof direccion !== "object")
      return "N/A";
    const { calle, numero, colonia, ciudad } = direccion;
    return `${calle || ""} ${numero || ""}, ${colonia || ""}, ${ciudad || ""}`.replace(/,\s*,/g, ",").replace(/^,\s*|,\s*$/g, "") || "N/A";
  };
  const formatCurrency = (amount) => {
    if (!amount || amount === 0)
      return "$0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  };
  const formatDate = (dateString) => {
    if (!dateString)
      return "N/A";
    return new Date(dateString).toLocaleDateString("es-MX");
  };
  const getStatusColor = (status) => {
    const colors = {
      "Aprobada": "green",
      "Rechazada": "red",
      "En revisión": "blue",
      "Enviada": "orange",
      "Borrador": "gray",
      "Completada": "purple"
    };
    return colors[status] || "gray";
  };
  const getListasFiltradas = () => {
    let filtradas = [...listasCompra];
    if (filtros.busqueda) {
      filtradas = filtradas.filter(
        (lista) => {
          var _a2, _b2, _c2, _d, _e, _f;
          return ((_a2 = lista.titulo) == null ? void 0 : _a2.toLowerCase().includes(filtros.busqueda.toLowerCase())) || ((_b2 = lista.descripcion) == null ? void 0 : _b2.toLowerCase().includes(filtros.busqueda.toLowerCase())) || ((_d = (_c2 = lista.contratista_id) == null ? void 0 : _c2.prim_nom) == null ? void 0 : _d.toLowerCase().includes(filtros.busqueda.toLowerCase())) || ((_f = (_e = lista.contratista_id) == null ? void 0 : _e.apell_pa) == null ? void 0 : _f.toLowerCase().includes(filtros.busqueda.toLowerCase()));
        }
      );
    }
    if (filtros.estatus !== "todos") {
      filtradas = filtradas.filter((lista) => lista.estatus_general === filtros.estatus);
    }
    if (filtros.proyecto !== "todos") {
      filtradas = filtradas.filter((lista) => lista.proyecto_id === filtros.proyecto);
    }
    return filtradas;
  };
  const listasFiltradas = getListasFiltradas();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 mb-8 flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "blue", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-8 w-8 text-white" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h4", color: "white", children: "Administración de Listas de Compra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "white", className: "mt-1", children: "Revisión y aprobación de listas de compra aprobadas por supervisores" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Filtros de Búsqueda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Button,
          {
            color: "gray",
            size: "sm",
            variant: "outlined",
            onClick: limpiarFiltros,
            children: "Limpiar"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.Input,
          {
            type: "text",
            label: "Buscar por título, descripción o contratista",
            value: filtros.busqueda,
            onChange: (e) => handleFiltroChange("busqueda", e.target.value),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Estatus",
            value: filtros.estatus,
            onChange: (value) => handleFiltroChange("estatus", value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "todos", children: "Todos los estatus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Aprobada", children: "Aprobada por Supervisor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "En revisión", children: "En revisión" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "Enviada", children: "Enviada" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Select,
          {
            label: "Proyecto",
            value: filtros.proyecto,
            onChange: (value) => handleFiltroChange("proyecto", value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: "todos", children: "Todos los proyectos" }),
              proyectos.map((proyecto) => {
                var _a2;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(react.Option, { value: proyecto._id, children: formatearDireccion((_a2 = proyecto.propiedad) == null ? void 0 : _a2.direccion) }, proyecto._id);
              })
            ]
          }
        )
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-3 lg:mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Alert, { color: "red", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationCircleIcon, { className: "h-5 w-5" }),
      error
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Card, { className: "mx-3 lg:mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardHeader, { color: "green", variant: "gradient", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "h5", color: "white", children: [
          "Listas de Compra Pendientes (",
          listasFiltradas.length,
          ")"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { size: "lg" }) }) : listasFiltradas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOfficeIcon$1, { className: "h-16 w-16 text-gray-300 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "gray", className: "mb-2", children: "No hay listas de compra pendientes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { color: "gray", children: filtros.busqueda || filtros.estatus !== "todos" || filtros.proyecto !== "todos" ? "Ajusta los filtros para ver más resultados" : "Las listas de compra aparecerán aquí cuando sean aprobadas por supervisores" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Lista de Compra" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Proyecto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Contratista" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Total" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Estatus" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Fecha" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-blue-gray-50 py-3 px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", className: "text-[11px] font-bold uppercase text-blue-gray-400", children: "Acciones" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: listasFiltradas.map((lista) => {
          var _a2, _b2, _c2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: lista.titulo || "Lista de Compra" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", children: [
                ((_a2 = lista.materiales) == null ? void 0 : _a2.length) || 0,
                " materiales"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: formatearDireccion((_c2 = (_b2 = lista.proyecto_id) == null ? void 0 : _b2.propiedad) == null ? void 0 : _c2.direccion) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "h-4 w-4 text-gray-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: lista.contratista_id ? `${lista.contratista_id.prim_nom || ""} ${lista.contratista_id.apell_pa || ""}`.trim() || lista.contratista_id.email : "N/A" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: formatCurrency(lista.total_final || lista.total_estimado || 0) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              react.Chip,
              {
                value: lista.estatus_general,
                color: getStatusColor(lista.estatus_general),
                size: "sm"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: formatDate(lista.fecha_creacion) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 border-b border-blue-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  size: "sm",
                  color: "blue",
                  variant: "text",
                  className: "p-2",
                  onClick: () => abrirModalDetalles(lista),
                  title: "Ver detalles",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeIcon, { className: "h-4 w-4" })
                }
              ),
              lista.estatus_general === "Aprobada" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  react.Button,
                  {
                    size: "sm",
                    color: "green",
                    variant: "outlined",
                    className: "flex items-center gap-1 px-3 py-1",
                    onClick: () => aprobarListaCompra(lista._id),
                    disabled: loading,
                    title: "Aprobar compra",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" }),
                      "Aprobar"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  react.Button,
                  {
                    size: "sm",
                    color: "red",
                    variant: "outlined",
                    className: "flex items-center gap-1 px-3 py-1",
                    onClick: () => rechazarListaCompra(lista._id),
                    disabled: loading,
                    title: "Rechazar compra",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-4 w-4" }),
                      "Rechazar"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  react.Button,
                  {
                    size: "sm",
                    color: "purple",
                    variant: "outlined",
                    className: "flex items-center gap-1 px-3 py-1",
                    onClick: () => imprimirOrdenCompra(lista),
                    title: "Imprimir orden de compra",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon, { className: "h-4 w-4" }),
                      "Imprimir"
                    ]
                  }
                )
              ] })
            ] }) })
          ] }, lista._id);
        }) })
      ] }) }) })
    ] }),
    showDetallesModal && listaSeleccionada && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "📋 Detalles de Lista de Compra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "gray", className: "mb-6", children: [
        "Lista: ",
        listaSeleccionada.titulo,
        " - Proyecto: ",
        formatearDireccion((_b = (_a = listaSeleccionada.proyecto_id) == null ? void 0 : _a.propiedad) == null ? void 0 : _b.direccion)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "📅 Fecha de Creación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: formatDate(listaSeleccionada.fecha_creacion) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "👤 Contratista" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: listaSeleccionada.contratista_id ? `${listaSeleccionada.contratista_id.prim_nom || ""} ${listaSeleccionada.contratista_id.apell_pa || ""}`.trim() || listaSeleccionada.contratista_id.email : "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium", children: "💰 Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-bold", children: formatCurrency(listaSeleccionada.total_final || listaSeleccionada.total_estimado || 0) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "mb-4", children: "📦 Materiales Solicitados" }),
        (_c = listaSeleccionada.materiales) == null ? void 0 : _c.map((material, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "border-l-4 border-l-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.CardBody, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", className: "font-bold", children: material.tipo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Cantidad" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", color: "blue-gray", className: "font-medium", children: [
                material.cantidad,
                " ",
                material.tipo_unidad
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Urgencia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Chip,
                {
                  value: material.urgencia,
                  color: material.urgencia === "Urgente" ? "red" : material.urgencia === "Alta" ? "orange" : material.urgencia === "Media" ? "yellow" : "green",
                  size: "sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Costo Estimado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue", className: "font-medium", children: formatCurrency(material.costo_estimado || 0) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Costo Final" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "green", className: "font-medium", children: formatCurrency(material.costo_final || 0) })
            ] })
          ] }),
          material.descripcion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Descripción" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: material.descripcion })
          ] }),
          material.notas_supervisor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Notas del Supervisor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: material.notas_supervisor })
          ] })
        ] }) }) }) }, index2))
      ] }),
      listaSeleccionada.descripcion && /* @__PURE__ */ jsxRuntimeExports.jsx(react.Card, { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(react.CardBody, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", className: "font-medium mb-2", children: "📝 Descripción General" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "blue-gray", children: listaSeleccionada.descripcion })
      ] }) }),
      listaSeleccionada.estatus_general === "Aprobada" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "lg",
            color: "green",
            onClick: () => {
              aprobarListaCompra(listaSeleccionada._id);
              cerrarModalDetalles();
            },
            disabled: loading,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-5 w-5" }),
              "✅ Aprobar Compra"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "lg",
            color: "red",
            variant: "outlined",
            onClick: () => {
              rechazarListaCompra(listaSeleccionada._id);
              cerrarModalDetalles();
            },
            disabled: loading,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { className: "h-5 w-5" }),
              "❌ Rechazar Compra"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          react.Button,
          {
            size: "lg",
            color: "purple",
            variant: "outlined",
            onClick: () => imprimirOrdenCompra(listaSeleccionada),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PrinterIcon, { className: "h-5 w-5" }),
              "🖨️ Imprimir Orden"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.Button,
        {
          color: "gray",
          variant: "outlined",
          onClick: cerrarModalDetalles,
          children: "Cerrar"
        }
      ) })
    ] }) })
  ] });
};
const icon = {
  className: "w-5 h-5 text-inherit"
};
const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HomeIcon, { ...icon }),
        name: "dashboard",
        path: "/home",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}),
        shouldRedirectToProfile: true,
        roleAccess: ["administrator", "administrador", "ayudante de administrador"]
        // Solo administradores - otros van a profile
      },
      {
        path: "/",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}),
        shouldRedirectToProfile: true
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { ...icon }),
        name: "profile",
        path: "/profile",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(Profile, {}),
        firstForNonAdmin: true
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCellsIcon, { ...icon }),
        name: "Usuarios",
        path: "/users",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTable, {}),
        roleAccess: ["administrator", "administrador", "ayudante de administrador"]
        // Solo administradores
      },
      {
        path: "/users/crear",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(SignUp, { dashboard: true }),
        showInSidebar: false
      },
      {
        path: "/users/edit/:userId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(EditarUser, { dashboard: true }),
        showInSidebar: false
      },
      {
        path: "/profile/:userId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(Profile, {})
      },
      {
        path: "/test-upload",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(TestUpload, {}),
        showInSidebar: false
      },
      {
        path: "/test-images",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(TestImageDisplay, {}),
        showInSidebar: false
      },
      {
        path: "/test-cors",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(TestCORS$1, {}),
        showInSidebar: false
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserGroupIcon$1, { ...icon }),
        name: "Empleados",
        path: "/empleados",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(EmpleadosTable, {}),
        roleAccess: ["administrator", "administrador", "ayudante de administrador"]
        // Solo administradores
      },
      {
        path: "/empleado-profile/:empleadoId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileEmpleados, {})
      },
      /* {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      }, */
      {
        path: "/empleado-documents/:empleadoId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentosEmpleado, {})
      },
      {
        path: "/nomina/update/:nominaId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(EditarNomina, {})
      },
      {
        name: "crear empleado",
        path: "/empleados/crear",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(CrearEmpleado, {})
      },
      {
        name: "editar empleado",
        path: "/empleados/editar/:empleadoId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(EditarEmpleado, {})
      },
      {
        path: "/nomina/crear/:empleadoId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(CrearNomina, {})
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTextIcon$1, { ...icon }),
        name: "Mi Nómina",
        path: "/nominas/mi-nomina",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(MiNominaPage, {}),
        alwaysShow: true
      },
      {
        path: "/user-profile/:userId",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileUsers, {})
      },
      // Nuevas rutas para captaciones inmobiliarias
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingOffice2Icon, { ...icon }),
        name: "Proyectos",
        path: "/captaciones",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(MisProyectos, {}),
        roleAccess: ["user", "administrator", "administrador", "ayudante de administrador"]
        // Supervisor y contratista no tienen acceso
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusIcon, { ...icon }),
        name: "Nueva Captación",
        path: "/captaciones/nueva",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(CrearCaptacion, {}),
        roleAccess: ["user", "administrator", "administrador", "ayudante de administrador"]
        // Supervisor y contratista no tienen acceso
      },
      // Rutas adicionales para captaciones (sin mostrar en sidebar)
      {
        path: "/captaciones/:id",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(MisProyectos, {}),
        // Reemplazar por un componente de Detalle cuando exista
        showInSidebar: false
      },
      {
        path: "/captaciones/editar/:id",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(EditarCaptacion, {}),
        // Reutilizar el componente de creación para edición
        showInSidebar: false
      },
      {
        path: "/captaciones/:id/detalle",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(DetalleCaptacion, {}),
        // Nueva vista de detalle
        showInSidebar: false
      },
      // Rutas para Marketing Inmobiliario
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoIcon$1, { ...icon }),
        name: "Marketing",
        path: "/marketing",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProyectosMarketing, {}),
        roleAccess: ["user", "administrator", "administrador", "ayudante de administrador"]
        // Supervisor y contratista no tienen acceso
      },
      {
        path: "/marketing/:id/editar",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(EditarMarketing, {}),
        showInSidebar: false
      },
      {
        path: "/marketing/:id/detalle",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(DetalleMarketing, {}),
        showInSidebar: false
      },
      // Rutas para Remodelación
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WrenchScrewdriverIcon, { ...icon }),
        name: "Remodelación",
        path: "/remodelacion",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(RemodelacionPage, {}),
        roleAccess: ["administrator", "administrador", "supervisor", "contratista", "ayudante de administrador"]
        // Contratistas tienen acceso pero con vistas limitadas
      },
      {
        path: "/remodelacion/:id",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(DetalleRemodelacion, {}),
        showInSidebar: false
        // Contratistas pueden acceder a proyectos individuales, pero el backend validará si están asignados
      },
      {
        path: "/remodelacion/:id/editar",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(EditarRemodelacion, {}),
        showInSidebar: false
      },
      // Rutas para Administración de Listas de Compra
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTextIcon$1, { ...icon }),
        name: "Listas de Compra",
        path: "/administracion/listas-compra",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(ListasCompraAdminPage, {}),
        roleAccess: ["administrator", "administrador", "ayudante de administrador"]
        // Solo administradores
      }
    ]
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ServerStackIcon, { ...icon }),
        name: "sign in",
        path: "/sign-in",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(SignIn, {})
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RectangleStackIcon, { ...icon }),
        name: "sign up",
        path: "/sign-up",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(SignUp, {}),
        showInSidebar: false
      }
    ]
  }
];
function Sidenav({ brandImg, brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const location = useLocation();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [userData, setUserData] = reactExports.useState(null);
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent"
  };
  reactExports.useEffect(() => {
    if (!location.pathname.includes("/auth/")) {
      const checkAdminStatus = async () => {
        try {
          const response = await fetch(`${"https://lead-inmobiliaria.com"}/api/check-auth`, {
            credentials: "include"
          });
          const data = await response.json();
          console.log("Respuesta de verificación en sidenav:", data);
          if (data.success) {
            const user = data.user;
            setUserData(user);
            const userRole = (user == null ? void 0 : user.role) || "";
            const admin = userRole.toLowerCase().includes("administrator") || userRole === "Superadministrator";
            setIsAdmin(admin);
            if (!admin && location.pathname === "/dashboard/home") {
              window.location.href = "/dashboard/profile";
            }
          }
        } catch (error) {
          console.error("Error al verificar estado de admin:", error);
        }
      };
      checkAdminStatus();
    }
  }, [location.pathname]);
  const dashboardLayout = routes.find((route) => route.layout === "dashboard");
  const authLayout = routes.find((route) => route.layout === "auth");
  const isAuthPage = location.pathname.includes("/auth/");
  const activeLayout = isAuthPage ? authLayout : dashboardLayout;
  let activePages = (activeLayout == null ? void 0 : activeLayout.pages) || [];
  if (!isAuthPage) {
    activePages = activePages.filter((page) => {
      if (page.requiresEmpleadoId) {
        try {
          const userFromStorage = JSON.parse(localStorage.getItem("user"));
          return userFromStorage && userFromStorage.empleado_id;
        } catch (e) {
          return false;
        }
      }
      if (!page.name) {
        return !page.hideInSidebar;
      }
      if (page.roleAccess && userData && userData.role) {
        const hasRoleAccess = page.roleAccess.includes(userData.role);
        if (!hasRoleAccess) {
          return false;
        }
      }
      return !page.hideInSidebar && page.name !== "crear empleado" && page.name !== "editar empleado" && page.name !== "Editar Empleado" && page.name !== "Crear Empleado" && (isAdmin || !page.name.includes("Usuarios") && !page.name.includes("Empleados") && !page.name.includes("dashboard") && !page.adminOnly);
    });
  }
  if (!isAuthPage && !isAdmin && activePages.length > 0) {
    const profilePage = activePages.find((page) => page.name === "profile");
    const otherPages = activePages.filter((page) => page.name !== "profile");
    if (profilePage) {
      activePages = [profilePage, ...otherPages];
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      className: `${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"} fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-4 py-6 px-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Avatar, { src: brandImg, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Typography,
                {
                  variant: "h6",
                  color: sidenavType === "dark" ? "white" : "blue-gray",
                  children: brandName
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          react.IconButton,
          {
            variant: "text",
            color: "gray",
            size: "sm",
            ripple: true,
            className: "absolute right-0 top-0 z-50 rounded-none rounded-tr-xl xl:hidden",
            onClick: () => setOpenSidenav(dispatch, false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { strokeWidth: 2, className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-4", children: [
          (activeLayout == null ? void 0 : activeLayout.title) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-3.5 mt-4 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.Typography,
            {
              variant: "small",
              color: sidenavType === "dark" ? "white" : "blue-gray",
              className: "font-black uppercase opacity-75",
              children: activeLayout.title
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mb-4 flex flex-col gap-1", children: activePages.map((page, key) => {
            if (!page.name)
              return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: `/dashboard${page.path}`, children: ({ isActive }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              react.Button,
              {
                variant: isActive ? "gradient" : "text",
                color: isActive ? sidenavColor : sidenavType === "dark" ? "white" : "blue-gray",
                className: "flex items-center gap-4 px-4 capitalize",
                fullWidth: true,
                children: [
                  page.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Typography,
                    {
                      color: "inherit",
                      className: "font-medium capitalize",
                      children: page.name
                    }
                  )
                ]
              }
            ) }) }, key);
          }) })
        ] })
      ]
    }
  );
}
Sidenav.defaultProps = {
  brandImg: "/img/logo-lead.png",
  brandName: "LEAD Inmobiliaria"
};
Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string
};
Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";
function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout", { withCredentials: true });
      await logout();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    react.Navbar,
    {
      color: fixedNavbar ? "white" : "transparent",
      className: `rounded-xl transition-all ${fixedNavbar ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" : "px-0 py-1"}`,
      fullWidth: true,
      blurred: fixedNavbar,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "capitalize", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Breadcrumbs,
            {
              className: `bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/${layout}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100",
                    children: layout
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal",
                    children: page
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: page })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-auto md:mr-4 md:w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Input, { label: "Search" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.IconButton,
            {
              variant: "text",
              color: "blue-gray",
              className: "grid xl:hidden",
              onClick: () => setOpenSidenav(dispatch, !openSidenav),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bars3Icon, { strokeWidth: 3, className: "h-6 w-6 text-blue-gray-500" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            react.Button,
            {
              variant: "text",
              color: "blue-gray",
              className: "hidden items-center gap-1 px-4 xl:flex normal-case",
              onClick: handleLogout,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { className: "h-5 w-5 text-blue-gray-500" }),
                "Logout"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.IconButton,
            {
              variant: "text",
              color: "blue-gray",
              className: "grid xl:hidden",
              onClick: handleLogout,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircleIcon, { className: "h-5 w-5 text-blue-gray-500" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Menu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.MenuHandler, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.IconButton, { variant: "text", color: "blue-gray", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BellIcon, { className: "h-5 w-5 text-blue-gray-500" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(react.MenuList, { className: "w-max border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.MenuItem, { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Avatar,
                  {
                    src: "https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg",
                    alt: "item-1",
                    size: "sm",
                    variant: "circular"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    react.Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "mb-1 font-normal",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "New message" }),
                        " from Laur"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    react.Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "flex items-center gap-1 text-xs font-normal opacity-60",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ClockIcon, { className: "h-3.5 w-3.5" }),
                        " 13 minutes ago"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.MenuItem, { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  react.Avatar,
                  {
                    src: "https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg",
                    alt: "item-1",
                    size: "sm",
                    variant: "circular"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    react.Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "mb-1 font-normal",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "New album" }),
                        " by Travis Scott"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    react.Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "flex items-center gap-1 text-xs font-normal opacity-60",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ClockIcon, { className: "h-3.5 w-3.5" }),
                        " 1 day ago"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(react.MenuItem, { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCardIcon, { className: "h-4 w-4 text-white" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "mb-1 font-normal",
                      children: "Payment successfully completed"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    react.Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "flex items-center gap-1 text-xs font-normal opacity-60",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ClockIcon, { className: "h-3.5 w-3.5" }),
                        " 2 days ago"
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.IconButton,
            {
              variant: "text",
              color: "blue-gray",
              onClick: () => setOpenConfigurator(dispatch, true),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cog6ToothIcon, { className: "h-5 w-5 text-blue-gray-500" })
            }
          )
        ] })
      ] })
    }
  );
}
DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";
function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);
  const abbrev = ["K", "M", "B", "T"];
  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round(number * decPlaces / size) / decPlaces;
      if (number == 1e3 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      number += abbrev[i];
      break;
    }
  }
  return number;
}
function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } = controller;
  const [stars, setStars] = React.useState(0);
  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600"
  };
  React.useEffect(() => {
    fetch(
      "https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react"
    ).then((response) => response.json()).then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      className: `fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openConfigurator ? "translate-x-0" : "translate-x-96"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between px-6 pt-8 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h5", color: "blue-gray", children: "Dashboard Configurator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { className: "font-normal text-blue-gray-600", children: "See our dashboard options." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            react.IconButton,
            {
              variant: "text",
              color: "blue-gray",
              onClick: () => setOpenConfigurator(dispatch, false),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(XMarkIcon, { strokeWidth: 2.5, className: "h-5 w-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4 px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Sidenav Colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center gap-2", children: Object.keys(sidenavColors).map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${sidenavColors[color]} ${sidenavColor === color ? "border-black" : "border-transparent"}`,
                onClick: () => setSidenavColor(dispatch, color)
              },
              color
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Sidenav Types" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "small", color: "gray", children: "Choose between 3 different sidenav types." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  variant: sidenavType === "dark" ? "gradient" : "outlined",
                  onClick: () => setSidenavType(dispatch, "dark"),
                  children: "Dark"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  variant: sidenavType === "transparent" ? "gradient" : "outlined",
                  onClick: () => setSidenavType(dispatch, "transparent"),
                  children: "Transparent"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Button,
                {
                  variant: sidenavType === "white" ? "gradient" : "outlined",
                  onClick: () => setSidenavType(dispatch, "white"),
                  children: "White"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Navbar Fixed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                react.Switch,
                {
                  id: "navbar-fixed",
                  value: fixedNavbar,
                  onChange: () => setFixedNavbar(dispatch, !fixedNavbar)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-8 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://www.creative-tim.com/product/material-tailwind-dashboard-react?rel=mtdr",
                  target: "_black",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "gradient", fullWidth: true, children: "Free Download" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://www.material-tailwind.com/docs/react/installation?rel=mtdr",
                  target: "_black",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "outlined", color: "blue-gray", fullWidth: true, children: "View Documentation" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://www.material-tailwind.com/blocks/react?rel=mtdr",
                  target: "_black",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.Button, { variant: "outlined", color: "blue-gray", fullWidth: true, children: "Material Tailwind PRO" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                className: "mx-auto flex items-center justify-center gap-2",
                href: "https://github.com/creativetimofficial/material-tailwind-dashboard-react",
                target: "_blank",
                rel: "noreferrer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    react.Chip,
                    {
                      value: `${stars} - Stars`,
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          className: "mt-px ml-1.5 h-4 w-4",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              fillRule: "evenodd",
                              d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z",
                              clipRule: "evenodd"
                            }
                          )
                        }
                      ),
                      className: "bg-blue-gray-900 px-4"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "24",
                      height: "24",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" })
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(react.Typography, { variant: "h6", color: "blue-gray", children: "Thank you for sharing ❤️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  variant: "gradient",
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa-brands fa-twitter text-white" }),
                    "Tweet"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                react.Button,
                {
                  variant: "gradient",
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa-brands fa-facebook text-white" }),
                    "Share"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
Configurator.displayName = "/src/widgets/layout/configurator.jsx";
function Footer({ brandName, brandLink, routes: routes2 }) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(react.Typography, { variant: "small", className: "font-normal text-inherit", children: [
      "© ",
      year,
      " LEAD Inmobiliaria. Todos los derechos reservados."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex items-center gap-4", children: routes2.map(({ name, path }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      react.Typography,
      {
        as: "a",
        href: path,
        target: "_blank",
        variant: "small",
        className: "py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500",
        children: name
      }
    ) }, name)) })
  ] }) });
}
Footer.defaultProps = {
  brandName: "Facebook",
  brandLink: "https://www.facebook.com/profile.php?id=100076105934147",
  routes: [
    { name: "Facebook", path: "https://www.facebook.com/profile.php?id=100076105934147" }
  ]
};
Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
};
Footer.displayName = "/src/widgets/layout/footer.jsx";
({
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node
});
function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-blue-gray-50/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sidenav,
      {
        routes,
        brandImg: sidenavType === "dark" ? "/img/leadimagen.jpeg" : "/img/leadimagen.jpeg"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 xl:ml-80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardNavbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Configurator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        react.IconButton,
        {
          size: "lg",
          color: "white",
          className: "fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10",
          ripple: false,
          onClick: () => setOpenConfigurator(dispatch, true),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cog6ToothIcon, { className: "h-12 w-12" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
        routes.filter((route) => route.layout === "dashboard").map(
          ({ pages }) => pages.map(({ path, element }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { exact: true, path, element }, path))
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/nominas/mi-nomina", element: /* @__PURE__ */ jsxRuntimeExports.jsx(MiNominaPage, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-blue-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}) })
    ] })
  ] });
}
Dashboard.displayName = "/src/layout/dashboard.jsx";
function Auth() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-screen w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Routes, { children: routes.map(
    ({ layout, pages }) => layout === "auth" && pages.map(({ path, element }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { exact: true, path, element }))
  ) }) });
}
Auth.displayName = "/src/layout/Auth.jsx";
axios.defaults.baseURL = "https://lead-inmobiliaria.com";
axios.defaults.withCredentials = true;
const ProtectedRoute = ({ redirectTo = "/auth/sign-in", children }) => {
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      var _a;
      try {
        console.log("Checking authentication...");
        const response = await axios.get("/api/check-auth", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        });
        console.log("Auth response:", response.data);
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error("Auth error:", ((_a = error.response) == null ? void 0 : _a.data) || error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Verificando autenticación..." });
  }
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting...");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: redirectTo, replace: true });
  }
  return children ? children : /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
};
function TestCORS() {
  const [loading, setLoading] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const testCORS = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      console.log("🧪 Probando CORS...");
      console.log("VITE_API_URL:", "https://lead-inmobiliaria.com");
      console.log("📡 Probando /api/test-cors...");
      const corsResponse = await fetch(`${"https://lead-inmobiliaria.com"}/api/test-cors`, {
        method: "GET",
        credentials: "include"
      });
      console.log("✅ CORS test status:", corsResponse.status);
      const corsData = await corsResponse.json();
      console.log("✅ CORS test data:", corsData);
      console.log("📡 Probando /api/test-image-access...");
      const imageAccessResponse = await fetch(`${"https://lead-inmobiliaria.com"}/api/test-image-access`, {
        method: "GET",
        credentials: "include"
      });
      console.log("🖼️ Image access test status:", imageAccessResponse.status);
      const imageAccessData = await imageAccessResponse.json();
      console.log("🖼️ Image access test data:", imageAccessData);
      const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log("🖼️ Probando fetch de imagen:", imageUrl);
      const fetchResponse = await fetch(imageUrl, {
        method: "GET",
        credentials: "include"
      });
      console.log("📡 Fetch response status:", fetchResponse.status);
      console.log("📡 Fetch response headers:", Object.fromEntries(fetchResponse.headers.entries()));
      let imageTest = { success: false, error: "No se pudo verificar" };
      if (fetchResponse.ok) {
        const contentType = fetchResponse.headers.get("content-type");
        if (contentType && contentType.startsWith("image/")) {
          imageTest = {
            success: true,
            width: "N/A (solo verificación de headers)",
            height: "N/A (solo verificación de headers)",
            contentType
          };
        } else {
          imageTest = {
            success: false,
            error: `Content-Type no válido: ${contentType}`
          };
        }
      } else {
        imageTest = {
          success: false,
          error: `HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`
        };
      }
      setResults({
        cors: corsData,
        imageAccess: imageAccessData,
        image: imageTest,
        fetch: {
          status: fetchResponse.status,
          headers: Object.fromEntries(fetchResponse.headers.entries())
        }
      });
    } catch (error2) {
      console.error("❌ Error en prueba de CORS:", error2);
      setError(error2.message);
    } finally {
      setLoading(false);
    }
  };
  const testImageInNewTab = () => {
    const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
    console.log("🔗 Abriendo imagen en nueva pestaña:", imageUrl);
    window.open(imageUrl, "_blank");
  };
  const testImageFetch = async () => {
    try {
      const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log("📡 Probando fetch directo a imagen:", imageUrl);
      const response = await fetch(imageUrl, {
        method: "GET",
        credentials: "include"
      });
      console.log("📡 Status:", response.status);
      console.log("📡 Headers:", Object.fromEntries(response.headers.entries()));
      if (response.ok) {
        const blob = await response.blob();
        console.log("✅ Imagen descargada como blob:", blob.size, "bytes");
        alert(`✅ Imagen descargada exitosamente: ${blob.size} bytes`);
      } else {
        console.error("❌ Error en fetch:", response.status, response.statusText);
        alert(`❌ Error en fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error2) {
      console.error("❌ Error en fetch:", error2);
      alert(`❌ Error en fetch: ${error2.message}`);
    }
  };
  const testImageLoad = async () => {
    try {
      const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log("🖼️ Probando carga de imagen en elemento img:", imageUrl);
      const timestampedUrl = `${imageUrl}?t=${Date.now()}`;
      console.log("🖼️ URL con timestamp:", timestampedUrl);
      try {
        const img2 = new Image();
        const imageTest2 = await new Promise((resolve, reject) => {
          img2.onload = () => {
            console.log("✅ Imagen cargada exitosamente en elemento img (directo)");
            console.log("Dimensiones:", img2.width, "x", img2.height);
            resolve({ success: true, width: img2.width, height: img2.height, method: "directo" });
          };
          img2.onerror = (e) => {
            console.error("❌ Error al cargar imagen directamente:", e);
            reject(new Error("No se pudo cargar la imagen directamente"));
          };
          img2.src = timestampedUrl;
          setTimeout(() => {
            reject(new Error("Timeout al cargar imagen directamente"));
          }, 5e3);
        });
        alert(`✅ Imagen cargada exitosamente (directo): ${imageTest2.width} x ${imageTest2.height}`);
        return;
      } catch (directError) {
        console.log("⚠️ Carga directa falló, intentando con base64...");
      }
      console.log("🔄 Intentando carga con base64...");
      const response = await fetch(imageUrl, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const blob = await response.blob();
      console.log("✅ Blob creado:", blob.size, "bytes, tipo:", blob.type);
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base642 = reader.result;
          console.log("✅ Base64 generado, longitud:", base642.length);
          resolve(base642);
        };
        reader.onerror = () => reject(new Error("Error al convertir a base64"));
      });
      reader.readAsDataURL(blob);
      const base64 = await base64Promise;
      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log("✅ Imagen cargada exitosamente desde base64 (fallback)");
          console.log("Dimensiones:", img.width, "x", img.height);
          resolve({ success: true, width: img.width, height: img.height, method: "base64-fallback" });
        };
        img.onerror = (e) => {
          console.error("❌ Error al cargar imagen desde base64:", e);
          reject(new Error("No se pudo cargar la imagen desde base64"));
        };
        img.src = base64;
        setTimeout(() => {
          reject(new Error("Timeout al cargar imagen desde base64"));
        }, 5e3);
      });
      alert(`✅ Imagen cargada exitosamente (base64 fallback): ${imageTest.width} x ${imageTest.height}`);
    } catch (error2) {
      console.error("❌ Error en carga de imagen:", error2);
      alert(`❌ Error en carga de imagen: ${error2.message}`);
    }
  };
  const testImageLoadAlternative = async () => {
    try {
      const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log("🖼️ Probando carga alternativa de imagen:", imageUrl);
      const response = await fetch(imageUrl, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const blob = await response.blob();
      console.log("✅ Blob creado:", blob.size, "bytes, tipo:", blob.type);
      const blobUrl = URL.createObjectURL(blob);
      console.log("✅ Blob URL creada:", blobUrl);
      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log("✅ Imagen cargada desde blob exitosamente");
          console.log("Dimensiones:", img.width, "x", img.height);
          URL.revokeObjectURL(blobUrl);
          resolve({ success: true, width: img.width, height: img.height, method: "blob" });
        };
        img.onerror = (e) => {
          console.error("❌ Error al cargar imagen desde blob:", e);
          URL.revokeObjectURL(blobUrl);
          reject(new Error("No se pudo cargar la imagen desde blob"));
        };
        img.src = blobUrl;
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          reject(new Error("Timeout al cargar imagen desde blob"));
        }, 1e4);
      });
      alert(`✅ Imagen cargada desde blob exitosamente: ${imageTest.width} x ${imageTest.height}`);
    } catch (error2) {
      console.error("❌ Error en carga alternativa de imagen:", error2);
      alert(`❌ Error en carga alternativa: ${error2.message}`);
    }
  };
  const testImageLoadBase64 = async () => {
    try {
      const imageUrl = `${"https://lead-inmobiliaria.com"}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log("🖼️ Probando carga con base64:", imageUrl);
      const response = await fetch(imageUrl, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const blob = await response.blob();
      console.log("✅ Blob creado:", blob.size, "bytes, tipo:", blob.type);
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base642 = reader.result;
          console.log("✅ Base64 generado, longitud:", base642.length);
          resolve(base642);
        };
        reader.onerror = () => reject(new Error("Error al convertir a base64"));
      });
      reader.readAsDataURL(blob);
      const base64 = await base64Promise;
      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log("✅ Imagen cargada desde base64 exitosamente");
          console.log("Dimensiones:", img.width, "x", img.height);
          resolve({ success: true, width: img.width, height: img.height, method: "base64" });
        };
        img.onerror = (e) => {
          console.error("❌ Error al cargar imagen desde base64:", e);
          reject(new Error("No se pudo cargar la imagen desde base64"));
        };
        img.src = base64;
        setTimeout(() => {
          reject(new Error("Timeout al cargar imagen desde base64"));
        }, 1e4);
      });
      alert(`✅ Imagen cargada desde base64 exitosamente: ${imageTest.width} x ${imageTest.height}`);
    } catch (error2) {
      console.error("❌ Error en carga con base64:", error2);
      alert(`❌ Error en carga con base64: ${error2.message}`);
    }
  };
  const testEndpointDirectly = async (endpoint) => {
    try {
      console.log(`🧪 Probando endpoint directamente: ${endpoint}`);
      const response = await fetch(`${"https://lead-inmobiliaria.com"}${endpoint}`, {
        method: "GET",
        credentials: "include"
      });
      console.log(`📡 ${endpoint} - Status:`, response.status);
      console.log(`📡 ${endpoint} - Headers:`, Object.fromEntries(response.headers.entries()));
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${endpoint} - Data:`, data);
        alert(`✅ ${endpoint} funcionando: ${data.message}`);
      } else {
        console.error(`❌ ${endpoint} - Error:`, response.status, response.statusText);
        alert(`❌ ${endpoint} error: ${response.status} ${response.statusText}`);
      }
    } catch (error2) {
      console.error(`❌ ${endpoint} - Error:`, error2);
      alert(`❌ ${endpoint} error: ${error2.message}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-6", children: "🧪 Prueba de Configuración CORS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-blue-800 mb-2", children: "💡 Información de configuración:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "VITE_API_URL:" }),
            " ",
            "https://lead-inmobiliaria.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Navegador:" }),
            " ",
            navigator.userAgent
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cookies:" }),
            " ",
            document.cookie ? "Disponibles" : "No disponibles"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: testCORS,
            disabled: loading,
            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50",
            children: loading ? "Probando..." : "🚀 Probar CORS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: testImageInNewTab,
            className: "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600",
            children: "🔗 Abrir Imagen"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: testImageFetch,
            className: "px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600",
            children: "📡 Fetch Imagen"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => testEndpointDirectly("/api/test-cors"),
            className: "px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600",
            children: "🧪 Test CORS Directo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => testEndpointDirectly("/api/test-image-access"),
            className: "px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600",
            children: "🧪 Test Image Access Directo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => testEndpointDirectly("/api/"),
            className: "px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600",
            children: "🧪 Test API Root"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: testImageLoad,
            className: "px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600",
            children: "🖼️ Test Carga Imagen"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: testImageLoadAlternative,
            className: "px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600",
            children: "🖼️ Test Carga Alternativa"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: testImageLoadBase64,
            className: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",
            children: "🖼️ Test Carga Base64"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-red-800 font-semibold", children: "❌ Error:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700", children: error })
      ] }),
      results && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "📊 Resultados de las Pruebas:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-green-200 bg-green-50 rounded-md p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-green-800 mb-2", children: "✅ Prueba CORS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-green-700 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Origin:" }),
                " ",
                results.cors.origin
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Message:" }),
                " ",
                results.cors.message
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-blue-200 bg-blue-50 rounded-md p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-blue-800 mb-2", children: "🖼️ Acceso a Imagen" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-blue-700 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Origin:" }),
                " ",
                results.imageAccess.origin
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Message:" }),
                " ",
                results.imageAccess.message
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border rounded-md p-4 ${results.image.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold mb-2", children: [
              results.image.success ? "✅" : "❌",
              " Prueba Imagen"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm space-y-1", children: results.image.success ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Dimensiones:" }),
                " ",
                results.image.width,
                " x ",
                results.image.height
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-600", children: "Imagen cargada correctamente" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600", children: "Error al cargar imagen" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-purple-200 bg-purple-50 rounded-md p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-purple-800 mb-2", children: "📡 Prueba Fetch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-purple-700 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Status:" }),
                " ",
                results.fetch.status
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Content-Type:" }),
                " ",
                results.fetch.headers["content-type"]
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "CORS:" }),
                " ",
                results.fetch.headers["access-control-allow-origin"]
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-md p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "📋 Detalles Completos:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs text-gray-700 bg-white p-2 rounded border overflow-x-auto", children: JSON.stringify(results, null, 2) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-md p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-2", children: "🔍 Instrucciones de debugging:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '1. Ejecuta "Probar CORS" para verificar la configuración completa' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '2. Usa "Abrir Imagen" para ver si se puede acceder directamente' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '3. Usa "Fetch Imagen" para probar descarga programática' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "4. Usa los botones individuales para probar cada endpoint por separado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '5. Usa "Test Carga Imagen" para probar carga directa en elemento img' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '6. Usa "Test Carga Alternativa" para probar carga desde blob' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '7. Usa "Test Carga Base64" para probar carga con base64 (evita CORS)' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "8. Revisa la consola para logs detallados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "9. Si CORS funciona pero la imagen no se muestra, es un problema de headers" })
        ] })
      ] })
    ] })
  ] });
}
const AuthLoader = ({ children }) => {
  const { loading, authChecked } = useAuth();
  if (loading && !authChecked) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(react.Spinner, { className: "h-12 w-12 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Cargando aplicación..." })
    ] }) });
  }
  return children;
};
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthLoader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/test-cors", element: /* @__PURE__ */ jsxRuntimeExports.jsx(TestCORS, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Route,
      {
        path: "/dashboard/*",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/auth/*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Auth, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard/home", replace: true }) })
  ] }) }) });
}
const tailwind = "";
const index = "";
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MaterialTailwindControllerProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) }) }) })
);
