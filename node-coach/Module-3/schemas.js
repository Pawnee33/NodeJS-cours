import { z } from 'zod';


const FORMAT_DATE = /^\d{4}-\d{2}-\d{2}$/;

const schemaNouvelleTache = z.object({
    titre: z
    .string({ message: "Le titre doit être une chaîne de caractères."})
    .trim()
    .min(1, "Le titre est obligatoire.")
    .max(200, "200 caractères maximum."),
    utilisateurId: z
    .number({ message: "L'identifiant doit être un nombre."})
    .int()
    .positive(),
    datePrevue: z
    .string()
    .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ.")
});

export { schemaNouvelleTache };
