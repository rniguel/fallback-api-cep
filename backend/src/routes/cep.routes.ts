import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { validateCep } from "../middlewares/validateCep";
import { fetchFromAwesomeCep } from "../services/awesomeCep.service";
import { fetchFromViaCep } from "../services/viaCep.service";

const router = Router();

const cepRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: { error: "Muitas requisições. Tente novamente em um minuto." },
});

router.get("/:cep", cepRateLimit, validateCep, async (req, res) => {
  const { cep } = req.params;

  // Try AwesomeCEP first
  let address = await fetchFromAwesomeCep(cep);

  if (address) {
    console.log(`[AwesomeCEP] Sucesso para o CEP: ${cep}`);
    return res.json(address);
  }

  // Fallback to ViaCEP
  console.log(`[ViaCEP - fallback] Tentando fallback para o CEP: ${cep}`);
  address = await fetchFromViaCep(cep);

  if (address) {
    console.log(`[ViaCEP - fallback] Sucesso para o CEP: ${cep}`);
    return res.json(address);
  }

  // Both failed
  console.error(`[Erro] Ambas as APIs falharam para o CEP: ${cep}`);
  return res.status(502).json({ error: "Erro ao buscar endereço nas APIs de CEP." });
});

export { router as cepRoutes };
