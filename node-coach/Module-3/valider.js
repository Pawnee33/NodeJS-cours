const valider = (schema, source = 'body') => (requete, response, suite) => {
    const resultat = schema.safeParse(requete[source]);

    if (!resultat.success) {
        return response.status(400).json({
            erreurs: resultat.error.issues.map((probleme) =>({
                champ: probleme.path.join('.'),
                message: probleme.message
            }))
        });
    }

    requete[source] = resultat.data;
    suite();
};

export default valider;
