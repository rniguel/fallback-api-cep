import axios from "axios";

export interface AddressData {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export async function fetchFromAwesomeCep(cep: string): Promise<AddressData | null> {
  const url = `${process.env.AWESOME_API_URL}/${cep}`;
  const token = process.env.AWESOME_API_TOKEN;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const { address, district, city, state } = response.data;
      return {
        logradouro: address,
        bairro: district,
        cidade: city,
        estado: state,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}
