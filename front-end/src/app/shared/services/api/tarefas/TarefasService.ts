import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface ITarefa {
    id: number;
    title: string;
    isCompleted: boolean;
}

const getAll = async (): Promise<ITarefa[] | ApiException> => {
    try {
        const { data } = await Api().get("./tarefas");
        return data;
    } catch (error: any) {
        return new ApiException(
            error.message || "Erro ao buscar registros a API."
        );
    }
};
const getById = async (id: number): Promise<ITarefa | ApiException> => {
    try {
        const { data } = await Api().get(`./tarefas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(
            error.message || "Erro ao consultar o registro."
        );
    }
};
const create = async (
    dataToCreate: Omit<ITarefa, "id">
): Promise<ITarefa | ApiException> => {
    try {
        const { data } = await Api().post("./tarefas", dataToCreate); //TODO: se aparecer algum passar "tipar" o post com <any>
        return data;
    } catch (error: any) {
        return new ApiException(error.message || "Erro ao criar o registro.");
    }
};

const updateById = async (
    id: number,
    dataToUpdate: ITarefa //TODO: se ocorrer algum erro retornar para lista => ITarefa[]
): Promise<ITarefa | ApiException> => {
    try {
        const { data } = await Api().put(`./tarefas/${id}`, dataToUpdate);
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
        await Api().delete(`./tarefas/${id}`);
        return undefined;
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
