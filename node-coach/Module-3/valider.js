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

    Object.defineProperty(requete, source, {
    value: resultat.data,
    writable: true,
    configurable: true
    });
    suite();
};

export default valider;
