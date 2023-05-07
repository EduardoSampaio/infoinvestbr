import { ResponseModel } from "@/models/response.model";
import useAuth from "./useAuth";
import Cookies from "js-cookie";


export default function useFetchApi() {
    const { headers, route } = useAuth()

    async function find(url: string): Promise<ResponseModel> {
        try {
            const response = await fetch(url, { headers: headers });
            const data = await response.json()
            console.log(data)
            if(response.status === 401){
                Cookies.remove("infoinvest-auth");
                route?.push("/acessoNegado")
            }
            else if (!response.ok) {
                throw Error(data.message)
            }
            const responseModel: ResponseModel = {
                result: data.result,
            };

            return Promise.resolve(responseModel);

        } catch (error) {
            const responseModel: ResponseModel = {
                error: error?.toString(),
            };
            return Promise.reject(responseModel);
        }
    }

    async function remove(url: string): Promise<ResponseModel> {
        try {
            const response = await fetch(url, { headers: headers, method: 'DELETE' });
            const data = await response.json()

            if(response.status === 401){
                Cookies.remove("infoinvest-auth");
                route?.push("/acessoNegado")
            }
            else if (!response.ok) {
                throw Error(data.message)
            }
            const responseModel: ResponseModel = {
                message: data.message,
            };

            return Promise.resolve(responseModel);

        } catch (error) {
            const responseModel: ResponseModel = {
                error: error?.toString(),
            };
            return Promise.reject(responseModel);
        }
    }

    async function save(url: string, value: any): Promise<ResponseModel> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(value)
            });
            const data = await response.json()
            if(response.status === 401){
                Cookies.remove("infoinvest-auth");
                route?.push("/acessoNegado")
            }
            else if (!response.ok) {
                throw Error(data.message)
            }

            const responseModel: ResponseModel = {
                message: data.message,
            };

            return Promise.resolve(responseModel);

        } catch (error) {
            const responseModel: ResponseModel = {
                error: error?.toString(),
            };
            return Promise.reject(responseModel);
        }
    }

    async function update(url: string, value: any): Promise<ResponseModel> {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(value)
            });
            const data = await response.json()
            
            if(response.status === 401){
                Cookies.remove("infoinvest-auth");
                route?.push("/acessoNegado")
            }
            else if (!response.ok) {
                throw Error(data.message)
            }

            const responseModel: ResponseModel = {
                message: data.message,
            };

            return Promise.resolve(responseModel);

        } catch (error) {
            const responseModel: ResponseModel = {
                error: error?.toString(),
            };
            return Promise.reject(responseModel);
        }
    }

    return {
        find,
        save,
        update,
        remove
    }
}