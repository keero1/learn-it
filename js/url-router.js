const urlPageTitle = "Learn IT";

document.addEventListener("click", (e) => {
    const {target} = e;
    if(!target.matches("li a")) {
        return;
    }

    e.preventDefault();
    urlRoute();
});

const urlRoutes = {
    404: {
        template: "./templates-admin/404.html",
        title: "404 | "+ urlPageTitle,
        description: ""
    },
    "/": {
        template: "./templates-admin/index.html",
        title: "Dashboard | "+ urlPageTitle,
        description: "This is the Dashboard"
    },
    "/total-books": {
        template: "./templates-admin/total-books.html",
        title: "Total Books | "+ urlPageTitle,
        description: "This is the total books"
    },
    "/add-books": {
        template: "./templates-admin/add-books.html",
        title: "Add Books | "+ urlPageTitle,
        description: "This is the add books"
    },
    "/issued-books": {
        template: "./templates-admin/issued-books.html",
        title: "Issued Books | "+ urlPageTitle,
        description: "This is the issued books",
    },
};

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
};

const urlLocationHandler = async () => {
    const location = window.location.pathname;

    if(location.length == 0) {
        location = "/";
    }
    
    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());

    document.getElementById("content").innerHTML = html;
    document.title = route.title;

    document.querySelector('meta[name="description"]').setAttribute("content", route.description);

};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();