import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface ITarefa {
    id: number;
    title: string;
    isCompleted: boolean;
}

const getAll = async (): Promise<ITarefa[] | ApiException> => {
    try {
        const { data } = await Api().get("./taferas");
        return data;
    } catch (error: any) {
        return new ApiException(
            error.message || "Erro ao buscar registros a API."
        );
    }
};
const getById = async (id: number): Promise<ITarefa | ApiException> => {
    try {
        const { data } = await Api().get(`./taferas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(
            error.message || "Erro ao consultar o registro."
        );
    }
};
const create = async (
    dataToCreate: Omit<ITarefa, "id">
): Promise<ITarefa[] | ApiException> => {
    try {
        const { data } = await Api().post("./taferas", dataToCreate); //TODO: se aparecer algum passar tipar o post com <any>
        return data;
    } catch (error: any) {
        return new ApiException(error.message || "Erro ao criar o registro.");
    }
};

const updateById = async (
    id: number,
    dataToUpdate: ITarefa
): Promise<ITarefa[] | ApiException> => {
    try {
        const { data } = await Api().put(`./taferas/${id},`, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(
            error.message || "Erro ao atualizar o registro."
        );
    }
};
const deleteById = async (
    id: number
): Promise<ITarefa | undefined | ApiException> => {
    try {
        const { data } = await Api().delete(`./taferas/${id}`); //TODO: verificar se funciona, se não apagar e rever o final da aula 25
        await Api().delete(`./taferas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || "Erro ao apagar o registro.");
    }
};

export const TarefasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
