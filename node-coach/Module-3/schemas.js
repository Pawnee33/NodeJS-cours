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
  .string({message: "La date est obligatoire."})
  .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ.")
});

const schemaParamId = z.object({
  id: z
  .coerce.number({message: "L'identifiant doit être un nombre."})
  .int({message: "L'identifiant doit être entier."})
  .positive({message: "L'identifiant doit être positif."})
});

const schemaParamDate = z.object({
  date: z.string({message: "La date est obligatoire."})
  .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ.")
});

const schemaQueryCalendrier = z.object({
  utilisateurId: z
  .coerce.number({message: "L'identifiant doit être un nombre."})
  .int({message: "L'identifiant doit être un entier."})
  .positive({message: "L'identifiant doit être positif."}),
  debutDate: z
  .string({message: "La date de début est obligatoire."})
  .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ."),
  finDate: z
  .string({message: "La date de fin est obligatoire."})
  .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ.")
});

const schemaReporterTache = z.object({
  utilisateurId: z
  .number({message: "L'identifiant doit être un nombre."})
  .int({message: "L'identifiant doit être un entier."})
  .positive({message: "L'identifiant doit être positif."}),
  de: z
  .string({message: "La date de départ est obligatoire."})
  .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ."),
  vers: z
  .string({message: "La date d'arrivée est obligatoire."})
  .regex(FORMAT_DATE, "Format attendu : AAAA-MM-JJ.")
});

const schemaQueryTaches = z.object({
  faite: z
    .enum(['true', 'false'], { message: "faite doit valoir true ou false." })
    .optional()
});

export { schemaNouvelleTache, schemaParamId, schemaParamDate, schemaQueryCalendrier, schemaReporterTache, schemaQueryTaches };
