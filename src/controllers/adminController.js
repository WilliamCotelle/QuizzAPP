const { User } = require("../models/index");

const adminController = {
    // Affiche la page de connexion
    loginPage: async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            res.render('500');      
        }
    },

    // Gère la soumission du formulaire de connexion
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            // Vérifie si l'utilisateur existe et si le mot de passe est correct
            if (user && user.password === password) {
                // Stocke l'ID de l'utilisateur dans la session
                req.session.user = {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                };
                                res.redirect('/');
            } else {
                // Rend la page de connexion avec un message d'erreur
                res.status(401).render('login', { error: 'Email ou mot de passe incorrect' });
            }
        } catch (error) {
            console.log(error);
            res.render('500');
        }
    },

    // Affiche la page d'inscription
    signupPage: async (req, res) => {
        try {
            res.render('signup');
        } catch (error) {
            res.render('500');   
        }
    },

    // Gère la soumission du formulaire d'inscription
    signupPageAdd: async (req, res) => {
        try {
            const { firstname, lastname, email, password, confirmation } = req.body;

            // Vérifier si les mots de passe correspondent
            if (password !== confirmation) {
                return res.status(400).render('signup', { error: 'Les mots de passe ne correspondent pas.' });
            }

            // Crée un nouvel utilisateur
            const newUser = await User.create({
                firstName: firstname,
                lastName: lastname,
                email,
                password,
            });

           

            // Redirige vers la page d'accueil
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.render('500');      
        }
    },
};

module.exports = adminController;

