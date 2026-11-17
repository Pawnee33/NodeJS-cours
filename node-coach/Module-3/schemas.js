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
  .int({message: "L'identifiant doit être entier."})
  .positive({message: "L'identifiant doit être positif."}),
  datePrevue: z
  .string()
  .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ.")
});

const schemaParamId = z.object({
  id: z
  .coerce.number({message: "L'identifiant doit être un nombre."})
  .int({message: "L'identifiant doit être entier."})
  .positive({message: "L'identifiant doit être positif."})
});

export { schemaNouvelleTache, schemaParamId };
