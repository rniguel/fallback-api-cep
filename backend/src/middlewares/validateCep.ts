import { Request, Response, NextFunction } from "express";

export function validateCep(req: Request, res: Response, next: NextFunction) {
  const { cep } = req.params;

  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    return res.status(400).json({ error: "CEP inválido. Deve conter 8 dígitos numéricos." });
  }

  req.params.cep = cleanCep;
  next();
}
