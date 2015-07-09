if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

    });
}

if (Meteor.isClient) {
    // external links
    var Router = Backbone.Router.extend({

        // quelles routes ont quel function:

        routes: {
            '': 'staticPage', // --> variable page est undefined
            ':page': 'staticPage', // --> /about --> variable page est 'about'
        },

        // le function defini pour montrer le contenu:

        staticPage: function (page) {
            // if page a un valeur (ex: 'about'), templateName devient ce valeur, si non
            // templateName devient "main"
            var templateName = page ? page : "main";

            // on ajoute un variable reutilisable (mais pas utilisée pour l'instant)
            Session.set('currentPage', page);

            // on demande Meteor de faire un rendu du template correspondent
            // (dans le fichier html: <template name="about">)
            var frag = Meteor.render(function () {
                var i = Template[templateName] ? Template[templateName]() : "";
                return i;
            });

        },
    });

    var isExternal = function (href) {
        if (href.indexOf("http") === -1 || href.indexOf(document.location.host) !== -1 || href.indexOf("localhost") !== -1 || href.indexOf("127.0.0.1") !== -1) {
            return false;
        }
        return true;
    };


    // initialise le router
    var app = new Router;
    Meteor.startup(function () {
        // démarre le router; rendant possible l’utilisation des boutons Back et Forward dans le browser
        Backbone.history.start({
            pushState: true
        });

        // une fois que toute la structure de la page est là: action
        $(document).ready(function () {


            // action: si c'est externe, on attribue à "ça" une target pour le lien qui est un nouvel onglet
            $("a[href]").each(

            function () {
                if (isExternal($(this).attr('href'))) {
                    $(this).attr('target', '_blank')
                }
            });

            $('a').smoothScroll();

        });
    });
}