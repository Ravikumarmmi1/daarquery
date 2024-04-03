export const environment = {
    production: false,
    domain:'https://development.mapmyindia.com/data-pipeline',
    outpost:'https://outpost.mappls.com/api/security/v4.0.0/oauth/authorize?',
    client_id:'U549QW-s8awaFDuY5zoAtgMeWDnFFYoZlZhqPxWISBCdqFP6QiP41PTfLwb-kE0W_l37kvr0qJnGzO_EKvXyLg==',
    baseurl:'http://localhost:4200', 
    // baseurl:'https://development.mapmyindia.com/daarquery',
    // baseurl:'https://maps-preprod.mapmyindia.in/daarquery',
    queryOnLms:'https://route.mapmyindia.in/LivySparkLatest/apis/queryOnLms?callback=',
    apiResponseTimeout: 300000,

    featurespath: [
        {
            name: "Dashboard",
            path: "/dashboard",
            img: "assets/img/dashboard.svg",
            no: 1
        },
        {
            name: "Entity Connection",
            path: "/entity-connection",
            img: "assets/img/source.svg",
            no: 2
        },
        {
            name: "Entity Contract",
            path: "/entity-contract",
            img: "assets/img/source.svg",
            no: 3
        },
        {
            name: "Data Catlog",
            path: "/data-catlog",
            img: "assets/img/find_in_page.svg",
            no: 4
        },
        {
            name: "Query Builder",
            path: "/query-builder",
            img: "assets/img/source.svg",
            no: 5
        }
    ]
};