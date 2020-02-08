$(document).ready(function() {
    const $app = $("#app");

    const errorTemplate         = Handlebars.compile($("#error").html());
    const homeTemplate          = Handlebars.compile($("#home").html());
    const todoTemplate          = Handlebars.compile($("#todos").html());
    const userTemplate          = Handlebars.compile($("#users").html());
    const unauthorizedTemplate  = Handlebars.compile($("#unauthorized").html());

    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'yellor',
                title: 'Error 404 - Page Not Found!',
                message: `The path '/${path}' does not exist on this site`
            });
            $app.html(html)
        }
    });

    router.add('/', () => {
        let html = homeTemplate();
        $app.html(html);
    });

    router.add('/todos', () => {
        let html = todoTemplate();
        $app.html(html);
    });

    router.add('/users', () => {
        let html = userTemplate();
        $app.html(html);
    });

    router.add('/unauthorized', () => {
        let html = unauthorizedTemplate();
        $app.html(html)
    });
    router.navigateTo(window.location.pathname);

    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', (e) => {
        e.preventDefault();

        const target = $(e.target);
        $('.item').removeClass('active');
        target.addClass('active');

        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    });
});