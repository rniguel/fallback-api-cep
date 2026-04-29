import { api } from "./api";

export async function fetchAddress(cep: string): Promise<AddressData | null> {
  try {
    const response = await api.get(`/cep/${cep}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP no backend:", error);
    return null;
  }
}

export interface AddressData {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
}
