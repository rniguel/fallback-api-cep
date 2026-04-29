import axios from "axios";
import { AddressData } from "./awesomeCep.service";

export async function fetchFromViaCep(cep: string): Promise<AddressData | null> {
  const url = `${process.env.FALLBACK_API_URL}/${cep}/json`;

  try {
    const response = await axios.get(url);

    if (response.status === 200 && !response.data.erro) {
      const { logradouro, bairro, localidade, uf } = response.data;
      return {
        logradouro,
        bairro,
        cidade: localidade,
        estado: uf,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}
